#!/usr/bin/env python3
import csv
from pathlib import Path
from collections import defaultdict
from html import escape
from datetime import datetime

# File paths
base_dir = Path("junk")
files = {
    "fics1": base_dir / "fics1.csv",
    "fics2": base_dir / "fics2.csv",
    "fics3": base_dir / "fics3.csv",
}

# Read CSVs
data = {}
for name, path in files.items():
    rows = []
    with open(path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    data[name] = rows
    print(f"Loaded {name}: {len(rows)} rows")

# Index by ao3id
indexed = {}
for name, rows in data.items():
    indexed[name] = {row["ao3id"]: row for row in rows}

# Get the key column (ao3id)
key_col = "ao3id"

# Find all unique IDs across all files
all_ids = set()
for idx in indexed.values():
    all_ids.update(k for k in idx.keys() if k.strip())

print(f"\nTotal unique IDs: {len(all_ids)}")

# Compare data
differences = defaultdict(list)
coverage = {"all_three": 0, "fics1_fics2": 0, "fics1_fics3": 0, "fics2_fics3": 0, "fics1_only": 0, "fics2_only": 0, "fics3_only": 0}

# Get columns from fics1
columns = list(indexed["fics1"].values())[0].keys() if indexed["fics1"] else []

def format_value(col, value):
    """Format a value, converting timestamps to datetime if needed."""
    if col.endswith("__ts") and value and value != "MISSING":
        try:
            ts = float(value)
            dt = datetime.fromtimestamp(ts)
            return dt.strftime("%Y-%m-%d %H:%M:%S")
        except (ValueError, OSError):
            return value
    return value

for ao3id in sorted(all_ids, key=int):
    # Get rows for this ID from each file
    rows = {}
    files_with_id = []
    for name in ["fics1", "fics2", "fics3"]:
        if ao3id in indexed[name]:
            rows[name] = indexed[name][ao3id]
            files_with_id.append(name)

    # Track coverage
    if len(files_with_id) == 3:
        coverage["all_three"] += 1
    elif set(files_with_id) == {"fics1", "fics2"}:
        coverage["fics1_fics2"] += 1
    elif set(files_with_id) == {"fics1", "fics3"}:
        coverage["fics1_fics3"] += 1
    elif set(files_with_id) == {"fics2", "fics3"}:
        coverage["fics2_fics3"] += 1
    elif len(files_with_id) == 1:
        if files_with_id[0] == "fics1":
            coverage["fics1_only"] += 1
        elif files_with_id[0] == "fics2":
            coverage["fics2_only"] += 1
        else:
            coverage["fics3_only"] += 1

    # Skip if only in one file
    if len(files_with_id) < 2:
        continue

    # Compare columns
    for col in columns:
        values = {name: rows[name][col] if name in rows else "MISSING" for name in ["fics1", "fics2", "fics3"]}

        # Check if all values are the same
        unique_values = set(values.values())
        if len(unique_values) > 1:
            differences[ao3id].append({
                "column": col,
                "fics1": values["fics1"],
                "fics2": values["fics2"],
                "fics3": values["fics3"],
            })

# Generate HTML report
html = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CSV Comparison Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        h1 { color: #333; }
        .summary { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .summary h2 { margin-top: 0; }
        .summary div { margin: 8px 0; font-size: 16px; }
        .stat { font-weight: bold; color: #0066cc; }
        .differences { margin-top: 20px; }
        .fic { background: white; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .fic-header { margin-bottom: 15px; }
        .fic-id { font-size: 16px; font-weight: bold; color: #0066cc; line-height: 1.4; }
        .fic-id em { font-style: italic; color: #666; font-size: 14px; }
        .selectable-header { cursor: pointer; user-select: none; padding: 10px 15px !important; transition: all 0.2s; border-radius: 4px; font-weight: 600; }
        .selectable-header:hover { background: #e3f2fd; transform: scale(1.05); }
        .selectable-header.selected { background: #4CAF50 !important; color: white !important; }
        .fic.selected { background: #c8e6c9 !important; }
        .diff-count { background: #fff3cd; padding: 5px 10px; border-radius: 4px; display: inline-block; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #f0f0f0; padding: 10px; text-align: left; border: 1px solid #ddd; font-weight: bold; }
        td { padding: 10px; border: 1px solid #ddd; }
        tr:nth-child(even) { background: #f9f9f9; }
        .col-name { font-weight: bold; width: 20%; }
        .match { background: #e8f5e9; color: #2e7d32; }
        .diff { background: #ffebee; color: #c62828; }
        .missing { background: #f3e5f5; color: #7b1fa2; font-style: italic; }
        .truncate { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .truncate:hover { white-space: normal; overflow: visible; }
        input[type="radio"] { cursor: pointer; margin-right: 8px; }
        label { display: flex; align-items: center; cursor: pointer; }
        tr.selected { background: #c8e6c9 !important; }
        tr.selected td { background: #c8e6c9 !important; }
    </style>
</head>
<body>
    <h1>📊 CSV Comparison Report</h1>
    <div style="margin-bottom: 20px;">
        <button id="saveJsonBtn" onclick="saveSelectionsJSON()" style="padding: 12px 24px; font-size: 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;">💾 Save as JSON</button>
        <button id="saveCsvBtn" onclick="saveSelectionsCSV()" style="padding: 12px 24px; font-size: 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;">💾 Save as CSV</button>
        <span id="saveStatus" style="margin-left: 15px; font-size: 14px;"></span>
    </div>
"""

# Embed CSV data as JSON in page for saving
import json
csv_data_json = json.dumps({
    "fics1": indexed["fics1"],
    "fics2": indexed["fics2"],
    "fics3": indexed["fics3"]
})

html += f"""
    <script>
        const csvData = {csv_data_json};
    </script>
    <div class="summary">
        <h2>Coverage Summary</h2>
        <div>Total unique IDs: <span class="stat">{len(all_ids)}</span></div>
        <div>IDs in all 3 files: <span class="stat">{coverage['all_three']}</span></div>
        <div>IDs in fics1 & fics2 only: <span class="stat">{coverage['fics1_fics2']}</span></div>
        <div>IDs in fics1 & fics3 only: <span class="stat">{coverage['fics1_fics3']}</span></div>
        <div>IDs in fics2 & fics3 only: <span class="stat">{coverage['fics2_fics3']}</span></div>
        <div>IDs only in fics1: <span class="stat">{coverage['fics1_only']}</span></div>
        <div>IDs only in fics2: <span class="stat">{coverage['fics2_only']}</span></div>
        <div>IDs only in fics3: <span class="stat">{coverage['fics3_only']}</span></div>
        <hr>
        <div><strong>Total discrepancies found:</strong> <span class="stat">{len(differences)}</span> IDs with differences</div>
    </div>
"""

# Add differences
html += '<div class="differences">\n'
for ao3id in sorted(differences.keys(), key=int):
    diffs = differences[ao3id]

    # Get title and author from any available source
    title = "Unknown"
    author = "Unknown"
    for name in ["fics1", "fics2", "fics3"]:
        if ao3id in indexed[name]:
            row = indexed[name][ao3id]
            if row.get("title") and row["title"] != "...":
                title = row["title"]
            if row.get("author") and row["author"] != "...":
                author = row["author"]
            if title != "Unknown" and author != "Unknown":
                break

    html += f'    <div class="fic" data-ao3id="{escape(ao3id)}">\n'
    html += f'        <div class="fic-header">\n'
    html += f'            <div class="fic-id">AO3 ID: {escape(ao3id)} — {escape(title)} <em>by {escape(author)}</em></div>\n'
    html += f'        </div>\n'
    html += f'        <input type="hidden" name="source_{escape(ao3id)}" class="fic-selection" value="">\n'
    html += '        <table>\n'
    html += '            <tr><th class="col-name">Field</th>'
    html += '<th class="selectable-header" onclick="selectSource(this, \'' + escape(ao3id) + '\', \'fics1\')">fics1</th>'
    html += '<th class="selectable-header" onclick="selectSource(this, \'' + escape(ao3id) + '\', \'fics2\')">fics2</th>'
    html += '<th class="selectable-header" onclick="selectSource(this, \'' + escape(ao3id) + '\', \'fics3\')">fics3</th></tr>\n'

    for diff in diffs:
        col = diff["column"]
        v1, v2, v3 = diff["fics1"], diff["fics2"], diff["fics3"]

        # Format values (convert timestamps to datetime)
        v1_fmt = format_value(col, v1)
        v2_fmt = format_value(col, v2)
        v3_fmt = format_value(col, v3)

        # Determine which values match
        v1_class = "missing" if v1 == "MISSING" else ("match" if v1 == v2 and v1 == v3 else "diff")
        v2_class = "missing" if v2 == "MISSING" else ("match" if v2 == v1 and v2 == v3 else "diff")
        v3_class = "missing" if v3 == "MISSING" else ("match" if v3 == v1 and v3 == v2 else "diff")

        html += f'            <tr>\n'
        html += f'                <td class="col-name">{escape(col)}</td>\n'
        html += f'                <td class="{v1_class} truncate" title="{escape(v1_fmt)}">{escape(v1_fmt)}</td>\n'
        html += f'                <td class="{v2_class} truncate" title="{escape(v2_fmt)}">{escape(v2_fmt)}</td>\n'
        html += f'                <td class="{v3_class} truncate" title="{escape(v3_fmt)}">{escape(v3_fmt)}</td>\n'
        html += '            </tr>\n'

    html += '        </table>\n'
    html += '    </div>\n'

html += '</div>\n'
html += """
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
                    const rowData = csvData[sourceFile][ao3id];
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
                    const rowData = csvData[sourceFile][ao3id];
                    selections.push(rowData);
                }
            });

            if (selections.length === 0) {
                document.getElementById('saveStatus').textContent = '⚠️ No selections made yet';
                return;
            }

            // Get column headers from first row
            const headers = Object.keys(selections[0]);
            let csv = headers.map(h => `"${h}"`).join(',') + '\\n';

            selections.forEach(row => {
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
"""
html += '</body>\n</html>'

# Write report
output_path = Path("csv_comparison_report.html")
output_path.write_text(html)
print(f"\n✅ Report generated: {output_path}")
print(f"Open in your browser to view the comparison.")
