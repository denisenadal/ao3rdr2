// import type { DataTableProps } from "datatables.net-react";
// import "datatables.net-columncontrol";
// import "datatables.net-responsive";
import { GridCellKind } from "@glideapps/glide-data-grid";
import type { Fic } from "../../types/fic.ts";



const columns = [
  {
    title: "",
    id: "ao3id",
    width:40,
    type: GridCellKind.RowID,
    formatter: (data: unknown)=>{
      if(data)
      return data.toString()
    }
  },
  {
    title: "Rating",
    id: "rating",
    type: GridCellKind.Number,
    width: 100,
    formatter: (data: unknown)=>{
      if(data){return data.toString()}
      return "0"
    }
  },
  {
    title: "Read",
    id: "read",
    width:40,
    type: GridCellKind.Boolean,
    formatter: (data: unknown)=>{
      if(data)
      {return data ? true : false}
      return false
    }
  },
  {
    title: "Title",
    id: "title",
    width:200,
    type: GridCellKind.Uri,
    hasMenu: true,
    formatter: (data: unknown)=>{
      if(data){return data} return ""
    }
  },
  {
    title: "Author",
    id: "author",
    width:180,
    type: GridCellKind.Uri,
    hasMenu: true,
    formatter: (data: unknown)=>{
      if(data){return data} return ""
    }
  },
  {
    title: "Fandoms",
    id: "fandom",
    width:180,
    type: GridCellKind.Uri,
    hasMenu: true,
    formatter: (data: unknown)=>{
      if(data){return data} return ""
    }
  },
  {
    title: "Relationship",
    id: "relationship",
    width:180,
    type: GridCellKind.Uri,
    hasMenu: true,
    formatter: (data: unknown)=>{
      if(data){return data} return ""
    }
  },
  {
    title: "Private Tags",
    id: "personal_tags",
    width:180,
    type: GridCellKind.Bubble,
    formatter: (data: unknown)=>{
      if(data){return data} return []
    }
  },
  {
    title: "Last Visit",
    id: "visit",
    width:160,
    type: GridCellKind.Number,
    formatter: (data: unknown)=>{
      if(data){return data.toString()} return "0"
    }
  },
  {
    title: "Words",
    id: "word_count",
    width:90,
    type: GridCellKind.Number,
    formatter: (data: unknown)=>{
      if(data){return data.toString()} return "0"
    }
  },
  {
    title: "Est",
    id: "word_count",
    width:60,
    type: GridCellKind.Number,
    formatter: (data: unknown)=>{
      if(data){return data.toString()} return "0"
    }
  },
]

const fieldByCol = columns.map((col) => col.id) as (keyof Fic)[];



export { columns, fieldByCol};
