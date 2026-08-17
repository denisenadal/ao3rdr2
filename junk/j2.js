// ✅ Sortable column with a custom badge cell
{
    name: 'Status',
    selector: row => row.status, // sort key
    cell: row => <StatusBadge status={row.status} />, // display
    sortable: true,
  }
  
  // ✅ Currency column — format preserves sort order
  {
    name: 'Salary',
    selector: row => row.salary, // sort on raw number
    format: row => `$${row.salary.toLocaleString()}`, // display formatted
    sortable: true,
    right: true,
  }