#!/usr/bin/env python3
import json
from pathlib import Path
from collections import defaultdict
from html import escape
from datetime import datetime

# File paths
base_dir = Path("junk")
main_file = base_dir / "fic2.json"
backup_files = {
    "backup-2025-06-18": base_dir / "AO3rdr-backup-2025-06-18.json",
}

# Load JSON files
print("Loading JSON files...")
main_data = {}
with open(main_file) as f:
    for item in json.load(f):
        ao3id = str(item.get("ao3id"))
        main_data[ao3id] = item

backup_data = {}
all_backup_data = {}
for name, path in backup_files.items():
    print(f"  Loading {name}...")
    backup_data[name] = {}
    with open(path) as f:
        for item in json.load(f):
            ao3id = str(item.get("ao3id"))
            backup_data[name][ao3id] = item

# Also load other backups just to check for exclusive IDs
other_backup_files = {
    "backup-2019-12-25": base_dir / "AO3rdr-backup-2019-12-25.json",
    "backup-2017": base_dir / "AO3rdr-backup-2017.json",
}
for name, path in other_backup_files.items():
    print(f"  Loading {name}...")
    all_backup_data[name] = {}
    with open(path) as f:
        for item in json.load(f):
            ao3id = str(item.get("ao3id"))
            all_backup_data[name][ao3id] = item

print(f"fic2.json: {len(main_data)} items")
for name, data in backup_data.items():
    print(f"{name}: {len(data)} items")
for name, data in all_backup_data.items():
    print(f"{name}: {len(data)} items")

# Find all unique IDs and calculate exclusive sets
all_ids = set(main_data.keys())
for data in backup_data.values():
    all_ids.update(data.keys())
for data in all_backup_data.values():
    all_ids.update(data.keys())
all_ids = {id for id in all_ids if id.strip()}

fic2_ids = set(main_data.keys())
backup_2025_ids = set(backup_data.get("backup-2025-06-18", {}).keys())
backup_2019_ids = set(all_backup_data.get("backup-2019-12-25", {}).keys())
backup_2017_ids = set(all_backup_data.get("backup-2017", {}).keys())

# Calculate exclusive IDs
exclusive_2019 = backup_2019_ids - fic2_ids - backup_2025_ids
exclusive_2017 = backup_2017_ids - fic2_ids - backup_2025_ids

print(f"\nTotal unique IDs: {len(all_ids)}")
print(f"IDs only in 2019 backup: {len(exclusive_2019)}")
print(f"IDs only in 2017 backup: {len(exclusive_2017)}")

def format_value(key, value):
    """Format a value, converting timestamps to datetime if needed."""
    if key.endswith("__ts") and value:
        try:
            ts = float(value)
            dt = datetime.fromtimestamp(ts)
            return dt.strftime("%Y-%m-%d %H:%M:%S")
        except (ValueError, OSError, TypeError):
            return str(value)

    if isinstance(value, dict):
        return json.dumps(value, indent=2)
    return str(value) if value is not None else ""

# Compare data
differences = defaultdict(list)
coverage = {"all_files": 0, "fic2_only": 0, "backups_only": 0}

for ao3id in sorted(all_ids, key=lambda x: int(x) if x.isdigit() else 0):
    files_with_id = []
    rows = {}

    if ao3id in main_data:
        rows["fic2"] = main_data[ao3id]
        files_with_id.append("fic2")

    for name, data in backup_data.items():
        if ao3id in data:
            rows[name] = data[ao3id]
            files_with_id.append(name)

    if len(files_with_id) == 0:
        continue

    # Track coverage
    in_both_files = "fic2" in files_with_id and "backup-2025-06-18" in files_with_id

    if in_both_files:
        coverage["all_files"] += 1
    elif "fic2" in files_with_id:
        coverage["fic2_only"] += 1
    else:
        coverage["backups_only"] += 1

    # For entries in both files, only show visit__ts field
    # For entries in only one file, show all fields
    if in_both_files:
        keys_to_check = ["visit__ts"]
    else:
        # Get all keys for single-file entries
        all_keys = set()
        for row in rows.values():
            all_keys.update(row.keys())
        keys_to_check = sorted(all_keys)

    # Compare keys and values
    for key in keys_to_check:
        values = {}
        for name in ["fic2", "backup-2025-06-18"]:
            if name in rows:
                values[name] = rows[name].get(key, "MISSING")
            else:
                values[name] = "NOT IN FILE"

        # Check if all values are the same
        unique_values = set(str(v) for v in values.values())
        if len(unique_values) > 1:
            differences[ao3id].append({
                "key": key,
                "fic2": values["fic2"],
                "backup-2025-06-18": values["backup-2025-06-18"],
            })

# Embed data for export
files_for_export = {
    "fic2": main_data,
    "backup-2025-06-18": backup_data.get("backup-2025-06-18", {}),
}

json_data = json.dumps(files_for_export)

# Generate HTML report
html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>JSON Comparison Report</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }}
        h1 {{ color: #333; }}
        .summary {{ background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        .summary h2 {{ margin-top: 0; }}
        .summary div {{ margin: 8px 0; font-size: 16px; }}
        .stat {{ font-weight: bold; color: #0066cc; }}
        .differences {{ margin-top: 20px; }}
        .fic {{ background: white; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }}
        .fic-header {{ margin-bottom: 15px; }}
        .fic-id {{ font-size: 16px; font-weight: bold; color: #0066cc; line-height: 1.4; }}
        .fic-id em {{ font-style: italic; color: #666; font-size: 14px; }}
        .diff-count {{ background: #fff3cd; padding: 5px 10px; border-radius: 4px; display: inline-block; font-size: 12px; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 10px; }}
        th {{ background: #f0f0f0; padding: 10px; text-align: left; border: 1px solid #ddd; font-weight: bold; }}
        td {{ padding: 10px; border: 1px solid #ddd; }}
        tr:nth-child(even) {{ background: #f9f9f9; }}
        .col-name {{ font-weight: bold; width: 20%; }}
        .match {{ background: #e8f5e9; color: #2e7d32; }}
        .diff {{ background: #ffebee; color: #c62828; }}
        .missing {{ background: #f3e5f5; color: #7b1fa2; font-style: italic; }}
        .truncate {{ max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }}
        .truncate:hover {{ white-space: normal; overflow: visible; }}
        .selectable-header {{ cursor: pointer; user-select: none; padding: 10px 15px !important; transition: all 0.2s; border-radius: 4px; font-weight: 600; }}
        .selectable-header:hover {{ background: #e3f2fd; transform: scale(1.05); }}
        .selectable-header.selected {{ background: #4CAF50 !important; color: white !important; }}
        .fic.selected {{ background: #c8e6c9 !important; }}
        #saveStatus {{ margin-left: 15px; font-size: 14px; }}
        button {{ padding: 12px 24px; font-size: 16px; border: none; border-radius: 4px; cursor: pointer; color: white; }}
        #saveJsonBtn {{ background: #4CAF50; margin-right: 10px; }}
        #saveCsvBtn {{ background: #2196F3; }}
        button:hover {{ opacity: 0.9; }}
    </style>
</head>
<body>
    <h1>📊 JSON Comparison Report</h1>
    <div style="margin-bottom: 20px;">
        <button id="saveJsonBtn" onclick="saveSelectionsJSON()" style="padding: 12px 24px; font-size: 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">💾 Save as JSON</button>
        <button id="saveCsvBtn" onclick="saveSelectionsCSV()" style="padding: 12px 24px; font-size: 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Save as CSV</button>
        <span id="saveStatus" style="margin-left: 15px; font-size: 14px;"></span>
    </div>

    <script>
        const jsonData = {json_data};
    </script>

    <div class="summary">
        <h2>Coverage Summary</h2>
        <div>Total unique IDs: <span class="stat">{len(all_ids)}</span></div>
        <div>IDs in fic2 & 2025 backup: <span class="stat">{coverage['all_files']}</span></div>
        <div>IDs only in fic2: <span class="stat">{coverage['fic2_only']}</span></div>
        <div>IDs only in 2025 backup: <span class="stat">{coverage['backups_only']}</span></div>
        <hr>
        <div style="background: #fff3cd; padding: 15px; border-radius: 4px; margin: 15px 0;">
            <strong>⚠️ Data in other backups (not in fic2 or 2025 backup):</strong>
            <div>IDs only in 2019-12-25 backup: <span class="stat">{len(exclusive_2019)}</span></div>
            <div>IDs only in 2017 backup: <span class="stat">{len(exclusive_2017)}</span></div>
        </div>
        <hr>
        <div><strong>Total discrepancies found:</strong> <span class="stat">{len(differences)}</span> IDs with differences</div>
    </div>

    <div class="differences">
"""

for ao3id in sorted(differences.keys(), key=lambda x: int(x) if x.isdigit() else 0):
    diffs = differences[ao3id]

    # Get title and author from any available source
    title = "Unknown"
    author = "Unknown"
    for name in ["fic2", "backup-2025-06-18"]:
        if ao3id in files_for_export.get(name, {}):
            row = files_for_export[name][ao3id]
            if row.get("title") and str(row["title"]) != "...":
                title = str(row["title"])
            if row.get("author") and str(row["author"]) != "...":
                author = str(row["author"])
            if title != "Unknown" and author != "Unknown":
                break

    html += f'    <div class="fic" data-ao3id="{escape(ao3id)}">\n'
    html += f'        <div class="fic-header">\n'
    html += f'            <div class="fic-id">AO3 ID: {escape(ao3id)} — {escape(title)} <em>by {escape(author)}</em></div>\n'
    html += f'        </div>\n'
    html += f'        <input type="hidden" name="source_{escape(ao3id)}" class="fic-selection" value="">\n'
    html += '        <table>\n'
    html += '            <tr><th class="col-name">Field</th>'
    html += '<th class="selectable-header" onclick="selectSource(this, \'' + escape(ao3id) + '\', \'fic2\')">fic2</th>'
    html += '<th class="selectable-header" onclick="selectSource(this, \'' + escape(ao3id) + '\', \'backup-2025-06-18\')">backup-2025-06-18</th></tr>\n'

    for diff in diffs:
        key = diff["key"]
        v1 = diff["fic2"]
        v2 = diff["backup-2025-06-18"]

        # Format values
        v1_fmt = format_value(key, v1) if v1 != "NOT IN FILE" else "NOT IN FILE"
        v2_fmt = format_value(key, v2) if v2 != "NOT IN FILE" else "NOT IN FILE"

        # Determine classes
        v1_class = "missing" if v1 in ["MISSING", "NOT IN FILE"] else ("match" if str(v1) == str(v2) else "diff")
        v2_class = "missing" if v2 in ["MISSING", "NOT IN FILE"] else ("match" if str(v1) == str(v2) else "diff")

        html += f'            <tr>\n'
        html += f'                <td class="col-name">{escape(key)}</td>\n'
        html += f'                <td class="{v1_class} truncate" title="{escape(v1_fmt)}">{escape(v1_fmt)}</td>\n'
        html += f'                <td class="{v2_class} truncate" title="{escape(v2_fmt)}">{escape(v2_fmt)}</td>\n'
        html += '            </tr>\n'

    html += '        </table>\n'
    html += '    </div>\n'

html += '''    </div>

    <script>
        function selectSource(headerElement, ao3id, source) {
            const ficDiv = headerElement.closest('.fic');

            // Update hidden input
            ficDiv.querySelector('.fic-selection').value = source;

            // Update header styling
            const headers = ficDiv.querySelectorAll('.selectable-header');
            headers.forEach(h => h.classList.remove('selected'));
            headerElement.classList.add('selected');

            // Highlight the entry
            ficDiv.classList.add('selected');
        }

        function saveSelectionsJSON() {
            const selections = [];
            const ficDivs = document.querySelectorAll('.fic');

            ficDivs.forEach(ficDiv => {
                const ao3id = ficDiv.dataset.ao3id;
                const sourceInput = ficDiv.querySelector('.fic-selection');
                const sourceFile = sourceInput.value;

                if (sourceFile) {
                    const rowData = jsonData[sourceFile][ao3id];
                    selections.push(rowData);
                }
            });

            if (selections.length === 0) {
                document.getElementById('saveStatus').textContent = '⚠️ No selections made yet';
                return;
            }

            const json = JSON.stringify(selections, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'canonical_data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            document.getElementById('saveStatus').textContent = `✅ Downloaded ${selections.length} entries as JSON`;
        }

        function saveSelectionsCSV() {
            const selections = [];
            const ficDivs = document.querySelectorAll('.fic');

            ficDivs.forEach(ficDiv => {
                const ao3id = ficDiv.dataset.ao3id;
                const sourceInput = ficDiv.querySelector('.fic-selection');
                const sourceFile = sourceInput.value;

                if (sourceFile) {
                    const rowData = jsonData[sourceFile][ao3id];
                    selections.push(rowData);
                }
            });

            if (selections.length === 0) {
                document.getElementById('saveStatus').textContent = '⚠️ No selections made yet';
                return;
            }

            // Flatten nested objects for CSV
            const flattened = selections.map(row => {
                const flat = {};
                for (const key in row) {
                    const val = row[key];
                    if (typeof val === 'object' && val !== null) {
                        flat[key] = JSON.stringify(val);
                    } else {
                        flat[key] = val;
                    }
                }
                return flat;
            });

            // Get column headers from first row
            const headers = Object.keys(flattened[0]);
            let csv = headers.map(h => `"${h}"`).join(',') + '\\n';

            flattened.forEach(row => {
                const values = headers.map(h => {
                    const val = (row[h] || '').toString().replace(/"/g, '""');
                    return `"${val}"`;
                });
                csv += values.join(',') + '\\n';
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'canonical_data.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            document.getElementById('saveStatus').textContent = `✅ Downloaded ${selections.length} entries as CSV`;
        }
    </script>
</body>
</html>'''

# Write report
output_path = Path("json_comparison_report.html")
output_path.write_text(html)
print(f"\n✅ Report generated: {output_path}")
