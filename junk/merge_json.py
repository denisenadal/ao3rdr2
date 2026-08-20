#!/usr/bin/env python3
import json
import csv
from pathlib import Path

base_dir = Path("junk")

# Load the files
print("Loading JSON files...")
fic2_data = {}
with open(base_dir / "fic2.json") as f:
    for item in json.load(f):
        ao3id = str(item.get("ao3id"))
        fic2_data[ao3id] = item

backup_2025_data = {}
with open(base_dir / "AO3rdr-backup-2025-06-18.json") as f:
    for item in json.load(f):
        ao3id = str(item.get("ao3id"))
        backup_2025_data[ao3id] = item

print(f"fic2.json: {len(fic2_data)} items")
print(f"backup-2025-06-18: {len(backup_2025_data)} items")

# Create canonical dataset
# Priority: 2025 backup > fic2 (for entries in both)
# Include: all entries from 2025 + entries only in fic2
canonical = {}
stats = {"from_2025": 0, "from_fic2_only": 0}

# Add all entries from 2025 backup
for ao3id, entry in backup_2025_data.items():
    canonical[ao3id] = entry
    stats["from_2025"] += 1

# Add entries that are only in fic2
for ao3id, entry in fic2_data.items():
    if ao3id not in canonical:
        canonical[ao3id] = entry
        stats["from_fic2_only"] += 1

print(f"\nCanonical dataset:")
print(f"  - {stats['from_2025']} entries from 2025 backup")
print(f"  - {stats['from_fic2_only']} entries only in fic2")
print(f"  - Total: {len(canonical)} entries")

# Save as JSON
json_output = base_dir / "canonical_data.json"
with open(json_output, "w") as f:
    json.dump(list(canonical.values()), f, indent=2)
print(f"\n✅ Saved JSON: {json_output}")

# Save as CSV
csv_output = base_dir / "canonical_data.csv"
if canonical:
    # Get all columns from first entry
    sample = list(canonical.values())[0]
    columns = list(sample.keys())

    with open(csv_output, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        for entry in canonical.values():
            # Handle nested objects
            row = {}
            for col in columns:
                val = entry.get(col)
                if isinstance(val, dict):
                    row[col] = json.dumps(val)
                else:
                    row[col] = val
            writer.writerow(row)

print(f"✅ Saved CSV: {csv_output}")
print(f"\nFiles ready in {base_dir}")
