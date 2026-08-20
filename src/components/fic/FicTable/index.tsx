import{ type MouseEvent, useState } from "react";
import DataTable,{ type FilterState} from 'react-data-table-component';
import { type TableColumn } from 'react-data-table-component';
import type { Fic,FicUpdate } from "../ficTypes.ts";
import {type settingsData} from "../../Settings/settingTypes"
import { formatFicText, getEstTime } from "../ficFormatters.ts"
import Icon from "../../Icon.tsx"
import ReadStatusToggle from "../fields/ReadStatusToggle"
import RatingButtons from "../fields/RatingButtons"
import TagList from "../fields/TagList.tsx"
import FicLinks from "../fields/FicLinks.tsx"
import "./table.css"
//TODO add tag cell click event to add new tag
interface tableProps {
  fics: Fic[],
  updateSelectedFic: (update:FicUpdate|string) => void,
  toggleModal: (fic: Fic) => void;
  settings: settingsData
}

const FicTable = ({ fics, updateSelectedFic, toggleModal, settings }: tableProps) => {
  const minDefault = "30px"
  
  const columns: TableColumn<Fic>[] = [
    {
      name: "",
      id: "ao3id",
      selector: row => row.ao3id,
      center: true,
      minWidth: minDefault,
      maxWidth: "44px",
      cell: (row) => {
        return (<button color="primary"  className="btn-ghost s-circle" onClick={() => { toggleModal(row) }}><Icon name="open" size={18} /></button>)
      }
    },
    {
      name: "Read",
      id: "read",
      sortable: true,
      filterable: true,
      filterType: "number",
      filterFunction: (row, filter) => {
        let read= false
        let v = filter.condition1.value
        if (v && v !== ""){
          read = Boolean(v)
        }
        return row.read == read;},
      button: true,
      minWidth: "60px",
      maxWidth: "80px",
      sortFunction:(a,b)=>{ let ar = a.read ? 1: 0; let br = b.read ? 1: 0; return ar - br},
      cell: row => { return (<ReadStatusToggle fic={row} size={18} changeReadStatus={updateSelectedFic} />) }
    },
    {
      name: "Rating",
      id: "rating",
      sortable: true,
      filterable: true,
      minWidth: "108px",
      maxWidth: "112px",
      filterType:"number",
      filterFunction: (row, filter) => {
        let rating= 0
        let v = filter.condition1.value
        if (v && v !== ""){
          rating = typeof v === "string" ? parseInt(v) : v;
        }
        if(rating > 4 ){rating = 4}
        return row.rating == rating;},
      sortFunction:(a,b)=>{ return a.rating - b.rating},
      cell: row => { return (<RatingButtons fic={row} size={18} showAll={true} changeRating={updateSelectedFic} />) }
    },
    {
      name: "Title",
      id: "title",
      sortable: true,
      filterable: true,
      filterType: "text",
      wrap: true,
      ignoreRowClick: true,
      minWidth: "240px",
      maxWidth: "420px",
      filterFunction: (row, filter) => {
        const term = (filter.condition1.value ?? '').toLowerCase();
        return row.title.toLowerCase().includes(term);},
      sortFunction:(a,b)=>{ const aname = typeof a.title  === "string" ? a.title.toLowerCase() : "";const bname =  typeof b.title  === "string"  ? b.title.toLowerCase() : ""; return (aname.localeCompare(bname, undefined, { sensitivity: 'base' })) },
      cell: row => { return (<FicLinks linkType="work" items={row.title} ao3id={row.ao3id} />) }
    },
    {
      name: "Author",
      id: "author",
      sortable: true,
      filterable: true,
      wrap: true,
      ignoreRowClick: true,
      minWidth: "100px",
      maxWidth: "200px",
      filterType:"text",
      filterFunction: (row, filter) => {
        if(!row.author.length){return false;}
        let a:string = row.author[0];
        if(Array.isArray(row.author) ){
          a = row.author.toString();
        }
        const term:string = (filter.condition1.value ?? '').toLowerCase();
        return a.toLowerCase().includes(term)
        return false},
      sortFunction:(a,b)=>{ const aname = typeof a.author[0].toLowerCase();const bname =  typeof b.author[0].toLowerCase(); return (aname.localeCompare(bname, undefined, { sensitivity: 'base' })) },
      cell: row => { return (<FicLinks linkType="user" items={row.author} ao3id={row.ao3id} />) }

    },
    {
      name: "Fandoms",
      id: "fandom",
      sortable: true,
      filterable: true,
      wrap: true,
      ignoreRowClick: true,
      minWidth: "160px",
      maxWidth: "280px",
      filterType:"text",
      filterFunction: (row, filter) => {
        if(!row.fandom.length){return false;}
        let f:string = row.fandom[0];
        const term:string = (filter.condition1.value ?? '').toLowerCase();
        return f.toLowerCase().includes(term)
        return false},
      sortFunction:(a,b)=>{ const aname = a.fandom[0].toLowerCase() || "";const bname =   b.fandom[0].toLowerCase() || ""; return (aname.localeCompare(bname, undefined, { sensitivity: 'base' })) },
      cell: row => { return (<FicLinks linkType="tag" items={row.fandom} ao3id={row.ao3id} />) }

    },
    {
      name: "Relationship",
      id: "relationship",
      sortable: true,
      filterable: true,
      wrap: true,
      ignoreRowClick: true,
      minWidth: "140px",
      maxWidth: "280px",
      filterType:"text",
      filterFunction: (row, filter) => {
        if(!row.relationship.length){return false;}
        let r:string = row.relationship[0];
        const term:string = (filter.condition1.value ?? '').toLowerCase();
        return r.toLowerCase().includes(term)
        return false},
        sortFunction:(a,b)=>{ const aname = a.relationship[0].toLowerCase() || "";const bname =   b.relationship[0].toLowerCase() || ""; return (aname.localeCompare(bname, undefined, { sensitivity: 'base' })) },
      cell: row => { return (<FicLinks linkType="tag" items={row.relationship} ao3id={row.ao3id} />) }
    },
    {
      name: "Private Tags",
      id: "personal_tags",
      sortable: true,
      filterable: true,
      wrap: true,
      ignoreRowClick: true,
      minWidth: "160px",
      maxWidth: "420px",
      sortFunction: (a,b)=>{ 
        const atag = a.personal_tags && a.personal_tags.length > 0 ? a.personal_tags[0].toLowerCase(): ""; 
        const btag = b.personal_tags && b.personal_tags.length > 0 ? b.personal_tags[0].toLowerCase(): ""; 
        return (atag.localeCompare(btag, undefined, { sensitivity: 'base' }))
       },
      cell: row => { return (<TagList fic={row} tags={row.personal_tags} size="sm" updateTags={updateSelectedFic}  />) }

    },
    {
      name: "Visited",
      id: "visit",
      sortable: true,
      filterable: true,
      right: true,
      minWidth: "66px",
      maxWidth: "86px",
      filterType: "datetime",
      selector: row => row.visit,
      format: (row, i) => {
        let visitDate = row.visit
        return formatFicText("MedDate", visitDate)
      }
    },
    {
      name: "Words",
      id: "word_count",
      sortable: true,
      right: true,
      minWidth: "60px",
      maxWidth: "70px",
      selector: row => row.word_count,
      format: (row, i) => {
        return formatFicText("WordCount", row.word_count)
      }
    },
    {
      name: "Est",
      id: "est_time",
      sortable: true,
      right: true,
      minWidth: "50px",
      maxWidth: "64px",
      selector: row => {
        const [hours, minutes] = getEstTime(row.word_count, false);
        return minutes
      },
      format: (row, i) => {
        let d = formatFicText("EstTime", row.word_count)
         return d
      }
    }
  ]



  return (<section id="fic-table" className="table-section">
    <DataTable columns={columns} data={fics} keyField="ao3id" pagination={true} defaultSortFieldId="visit" defaultSortAsc={false} theme="default" striped={true}  />
  </section>
  )
}

export default FicTable