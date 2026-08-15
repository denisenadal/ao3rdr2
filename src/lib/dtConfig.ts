import type { DataTableProps } from "datatables.net-react";
import "datatables.net-columncontrol";
import "datatables.net-responsive";
type FilterOption = { label: string; value: any };
type ColumnFilterOptions = {
  title?: FilterOption[];
  author?: FilterOption[];
  fandoms?: FilterOption[];
  relationship?: FilterOption[];
};
const getControl =  (options?: Array<{ label: string, value: any }>)=>{
  return [
    "order",
    {
      extend: "dropdown",
      icon: "search",
      content: [{
        extend: "searchList",
        orthogonal: "filter",  // Add this to use filter type for labels
        options: options || null
      }]
    }];
}
const getColumnConfig = (options: ColumnFilterOptions) => {
  /** Plugin fields (responsivePriority, columnControl, etc.) aren't fully reflected in DT3's ColumnsConfig. */
  const columns = [
    {
      title: "",
      data: "ao3id",
      className: "btn-col",
      type: "num",
      target: -1,
      responsivePriority: 1,
      columnControl: [],
      targets: -1,
    },
    {
      title: "Rating",
      data: "rating",
      type: "num",
      className: "rating-col",
      responsivePriority: 0,
      columnControl: ["order"],
    },
    {
      title: "Read",
      data: "read",
      type: "num",
      responsivePriority: 3,
      className: "dt-center read-status",
      columnControl: ["order"],
    },
    {
      title: "Title",
      data: "title",
      type: "string",
      searchable: true,
      responsivePriority: 1,
      className: "title-col",
      columnControl: getControl(options.title),
    },
    {
      title: "Author",
      data: "author",
      className: "author",
      searchable: true,
      responsivePriority: 6,
      columnControl: getControl(options.author),
    },
    {
      title: "Fandoms",
      data: "fandom",
      searchable: true,
      className: "fandoms",
      responsivePriority: 7,
      columnControl: getControl(options.fandoms),
    },
    {
      title: "Relationship",
      data: "relationship",
      className: "relationships",
      searchable: true,
      responsivePriority: 4,
      columnControl: getControl(options.relationship),
    },
    {
      title: "Last Visit",
      data: "visit",
      type: "date",
      responsivePriority: 2,
      className: "last-visit",
      columnControl: ["order"],
    },
    {
      title: "Updated",
      data: "updated",
      type: "date",
      className: "updated-date",
      responsivePriority: 8,
      columnControl: ["order"]
    },
    {
      title: "Words",
      data: "word_count",
      className: "word-count",
      type: "num-fmt",
      responsivePriority: 5,
      columnControl: ["order"],
    },
    {
      title: "Est",
      data: "word_count",
      type: "num-fmt",
      className: "estimated-time",
      responsivePriority: 5,
      columnControl: ["order"],
    },
  ] as unknown as NonNullable<DataTableProps["columns"]>;

  return columns
}


/** Cast needed: DT3 types say `Options`, react package still expects `Config`, and columnControl plugin types don't accept string content names cleanly. */

const options = {
  order: [[7, "desc"]],
  deferRender: true,
  rowId: "ao3id",
  responsive: {
    details: false,
  },
} as unknown as NonNullable<DataTableProps["options"]>;

export { getColumnConfig, options };
