#!/usr/bin/env python3
"""Normalize canonical_data.json and upsert into public.fics via PostgREST."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CANONICAL_PATH = ROOT / "junk" / "canonical_data.json"
DEFAULT_USER_ID = "080b7013-14b2-4fd8-be8b-f567db3cdb39"
BATCH_SIZE = 200
PLACEHOLDER = "..."


def load_env_file(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def as_bool(value, *, true_values=(True, 1, "1", "true", "True")) -> bool:
    return value in true_values or (
        isinstance(value, str) and value.strip().lower() in {"true", "1"}
    )


def as_int(value, default=None):
    if value is None or value is False:
        return default
    if isinstance(value, bool):
        return int(value)
    if isinstance(value, int):
        return value
    if isinstance(value, float):
        return int(value)
    if isinstance(value, str):
        s = value.strip()
        if s == "":
            return default
        try:
            return int(s)
        except ValueError:
            try:
                return int(float(s))
            except ValueError:
                return default
    return default


def to_text_list(value) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        items = value
    elif isinstance(value, str):
        items = [part.strip() for part in value.split(",")] if "," in value else [value]
    else:
        items = [str(value)]

    out: list[str] = []
    seen: set[str] = set()
    for item in items:
        if item is None:
            continue
        text = str(item).strip()
        if not text or text == PLACEHOLDER:
            continue
        if text not in seen:
            seen.add(text)
            out.append(text)
    return out


def normalize_category(value) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text or text == PLACEHOLDER:
        return None
    return text


def parse_timestamptz(value) -> str | None:
    if not value:
        return None
    if isinstance(value, (int, float)):
        dt = datetime.fromtimestamp(value, tz=timezone.utc)
        return dt.isoformat()
    text = str(value).strip()
    if not text:
        return None
    if text.endswith("Z"):
        text = text[:-1] + "+00:00"
    try:
        datetime.fromisoformat(text)
        return text
    except ValueError:
        return None


def normalize_chapters(raw: dict) -> tuple[int, int | None, bool]:
    chapters = raw.get("chapters") or {}
    published = as_int(chapters.get("published"), 1) or 1
    total = as_int(chapters.get("total"))
    if total is None:
        complete = False
    else:
        complete = as_bool(chapters.get("complete"))
    return published, total, complete


def normalize_read(value) -> bool:
    return value in (1, "1", True) or (
        isinstance(value, str) and value.strip() == "1"
    )


def normalize_record(raw: dict, user_id: str, stats: Counter) -> dict | None:
    ao3id = as_int(raw.get("ao3id"))
    if ao3id is None:
        stats["skipped_no_ao3id"] += 1
        return None

    title = raw.get("title")
    if title is None or str(title).strip() == "":
        stats["skipped_no_title"] += 1
        return None

    author = to_text_list(raw.get("author"))
    fandom = to_text_list(raw.get("fandom"))
    relationship = to_text_list(raw.get("relationship"))
    category = normalize_category(raw.get("category"))
    published, total, complete = normalize_chapters(raw)

    if isinstance(raw.get("rating"), str):
        stats["string_rating"] += 1
    rating = as_int(raw.get("rating"), 0)
    if rating is None:
        rating = 0

    if raw.get("word_count") in (None, ""):
        stats["missing_word_count"] += 1
    word_count = as_int(raw.get("word_count"))

    if total is None:
        stats["unknown_chapter_total"] += 1

    visit = parse_timestamptz(raw.get("visit"))
    if visit is None:
        visit = datetime.now(timezone.utc).isoformat()
        stats["missing_visit"] += 1

    recrawl = len(author) == 0 or len(fandom) == 0 or len(relationship) == 0
    if recrawl:
        stats["recrawl_true"] += 1

    notes = raw.get("notes")
    if notes is not None:
        notes = str(notes)

    chapter_id = raw.get("chapter_id")
    if chapter_id is not None and str(chapter_id).strip() != "":
        chapter_id = str(chapter_id).strip()
    else:
        chapter_id = None

    return {
        "user_id": user_id,
        "ao3id": ao3id,
        "title": str(title),
        "author": author,
        "fandom": fandom,
        "category": category,
        "relationship": relationship,
        "summary": raw.get("summary") if raw.get("summary") not in (None, PLACEHOLDER) else None,
        "word_count": word_count,
        "chapters_published": published,
        "chapters_total": total,
        "complete": complete,
        "rating": rating,
        "read": normalize_read(raw.get("read")),
        "visit": visit,
        "crawled_at": parse_timestamptz(raw.get("crawled")),
        "ao3_updated_at": parse_timestamptz(raw.get("updated")),
        "deleted": as_bool(raw.get("deleted")),
        "hasupdate": as_bool(raw.get("hasupdate")),
        "recrawl": recrawl,
        "chapter_id": chapter_id,
        "notes": notes,
        "personal_tags": to_text_list(raw.get("personal_tags") or raw.get("userTags") or []),
    }


COLUMNS = [
    "user_id",
    "ao3id",
    "title",
    "author",
    "fandom",
    "category",
    "relationship",
    "summary",
    "word_count",
    "chapters_published",
    "chapters_total",
    "complete",
    "rating",
    "read",
    "visit",
    "crawled_at",
    "ao3_updated_at",
    "deleted",
    "hasupdate",
    "recrawl",
    "chapter_id",
    "notes",
    "personal_tags",
]


def sql_literal(value) -> str:
    if value is None:
        return "NULL"
    if isinstance(value, bool):
        return "true" if value else "false"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, list):
        if not value:
            return "ARRAY[]::text[]"
        return "ARRAY[" + ", ".join(sql_literal(item) for item in value) + "]::text[]"
    text = str(value)
    tag = "f"
    while f"${tag}$" in text:
        tag += "x"
    return f"${tag}${text}${tag}$"


def sql_row(row: dict) -> str:
    return "(" + ", ".join(sql_literal(row[col]) for col in COLUMNS) + ")"


def write_sql_dump(rows: list[dict], out_dir: Path) -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    col_list = ", ".join(COLUMNS)
    update_set = ",\n  ".join(
        f"{col} = excluded.{col}" for col in COLUMNS if col not in ("user_id", "ao3id")
    )
    written: list[Path] = []
    parts = list(range(0, len(rows), BATCH_SIZE)) or [0]
    total_parts = max(1, (len(rows) + BATCH_SIZE - 1) // BATCH_SIZE)

    for part, start in enumerate(parts, start=1):
        batch = rows[start : start + BATCH_SIZE]
        if not batch:
            continue
        path = out_dir / f"fics_part_{part:02d}.sql"
        values = ",\n".join(sql_row(row) for row in batch)
        path.write_text(
            "\n".join(
                [
                    f"-- Normalized fics dump, part {part}/{total_parts} ({len(batch)} rows)",
                    "-- Paste into Supabase SQL Editor and run.",
                    "-- id is omitted; Postgres generates a uuid per row (default gen_random_uuid()).",
                    "-- user_id + ao3id are data columns, not the row id.",
                    "-- ON CONFLICT requires unique (user_id, ao3id) so re-runs update instead of duplicate.",
                    "-- If that fails, run supabase/migrations/20260819_fics_use_uuid_pk.sql first.",
                    "",
                    f"insert into public.fics ({col_list})",
                    "values",
                    values,
                    f"on conflict (user_id, ao3id) do update set\n  {update_set};",
                    "",
                ]
            )
        )
        written.append(path)
    return written


def postgrest_upsert(url: str, key: str, rows: list[dict]) -> None:
    body = json.dumps(rows).encode("utf-8")
    req = urllib.request.Request(
        endpoint,
        data=body,
        method="POST",
        headers={
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates,return=minimal",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            resp.read()
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise SystemExit(f"Upsert failed ({exc.code}): {detail}") from exc


def main() -> None:
    load_env_file(ROOT / ".env")
    load_env_file(ROOT / ".env.local")

    dry_run = "--dry-run" in sys.argv
    sql_dump = "--sql-dump" in sys.argv
    supabase_url = os.environ.get("VITE_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
    service_key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    user_id = os.environ.get("IMPORT_USER_ID", DEFAULT_USER_ID)

    if not dry_run and not sql_dump and (not supabase_url or not service_key):
        raise SystemExit(
            "Missing VITE_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY. "
            "Add the service role key to .env (never prefix it with VITE_)."
        )

    data = json.loads(CANONICAL_PATH.read_text())
    stats: Counter = Counter()
    rows = []
    for item in data:
        row = normalize_record(item, user_id, stats)
        if row:
            rows.append(row)

    stats["source"] = len(data)
    stats["normalized"] = len(rows)

    if sql_dump:
        out_dir = ROOT / "supabase" / "seed"
        written = write_sql_dump(rows, out_dir)
        print(f"Wrote {len(written)} SQL files to {out_dir}")
        for path in written:
            print(f"  {path.name} ({path.stat().st_size} bytes)")
    elif dry_run:
        print("Dry run — skipping upsert")
    else:
        for i in range(0, len(rows), BATCH_SIZE):
            batch = rows[i : i + BATCH_SIZE]
            postgrest_upsert(supabase_url, service_key, batch)
            print(f"Upserted {min(i + BATCH_SIZE, len(rows))}/{len(rows)}")

    print("\nImport summary")
    print(f"  source rows:             {stats['source']}")
    print(f"  upserted:                {stats['normalized']}")
    print(f"  skipped (no ao3id):      {stats['skipped_no_ao3id']}")
    print(f"  skipped (no title):      {stats['skipped_no_title']}")
    print(f"  string ratings coerced:  {stats['string_rating']}")
    print(f"  unknown chapter totals:  {stats['unknown_chapter_total']}")
    print(f"  missing word counts:     {stats['missing_word_count']}")
    print(f"  recrawl = true:          {stats['recrawl_true']}")
    print(f"  user_id:                 {user_id}")


if __name__ == "__main__":
    main()
