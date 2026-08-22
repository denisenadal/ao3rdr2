/**
 * Sync `fics.read` from junk/canonical_data.json into Supabase.
 *
 * Rules:
 *   read > 0  → true
 *   read <= 0 → false
 *   missing / non-numeric → skipped
 *
 * Usage:
 *   node --env-file=.env junk/fix_read_status.mjs          # apply updates
 *   node --env-file=.env junk/fix_read_status.mjs --dry-run # preview only
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DRY_RUN = process.argv.includes("--dry-run");
const BATCH_SIZE = 100;

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const userId = process.env.VITE_TEST_USER_ID;

if (!url || !key || !userId) {
  console.error(
    "Missing env: need VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VITE_TEST_USER_ID"
  );
  process.exit(1);
}

function toReadBool(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  return n > 0;
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const raw = JSON.parse(
  readFileSync(join(__dirname, "canonical_data.json"), "utf8")
);

const trueIds = [];
const falseIds = [];
let skipped = 0;

for (const fic of raw) {
  const readBool = toReadBool(fic.read);
  if (readBool === null) {
    skipped += 1;
    continue;
  }
  const ao3id = Number(fic.ao3id);
  if (Number.isNaN(ao3id)) {
    skipped += 1;
    continue;
  }
  if (readBool) trueIds.push(ao3id);
  else falseIds.push(ao3id);
}

console.log(
  `Parsed ${raw.length} fics → read=true: ${trueIds.length}, read=false: ${falseIds.length}, skipped: ${skipped}`
);
if (DRY_RUN) {
  console.log("Dry run — no updates applied.");
  console.log("Sample true ao3ids:", trueIds.slice(0, 10));
  process.exit(0);
}

const supabase = createClient(url, key);

async function updateBatch(ao3ids, read) {
  let updated = 0;
  for (const batch of chunk(ao3ids, BATCH_SIZE)) {
    const { data, error } = await supabase
      .from("fics")
      .update({ read })
      .eq("user_id", userId)
      .in("ao3id", batch)
      .select("ao3id");

    if (error) {
      throw new Error(
        `Failed updating read=${read} for ${batch.length} ids: ${error.message}`
      );
    }
    updated += data?.length ?? 0;
  }
  return updated;
}

const trueUpdated = await updateBatch(trueIds, true);
const falseUpdated = await updateBatch(falseIds, false);

console.log(
  `Done. Rows set read=true: ${trueUpdated}, read=false: ${falseUpdated}`
);
