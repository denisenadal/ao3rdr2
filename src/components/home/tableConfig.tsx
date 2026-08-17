import { type TableColumn } from 'react-data-table-component';
import type { Fic, FicFieldTypes } from "../../types/fic.ts";
import { formatFicText, getEstTime } from "../fic/ficHelpers.ts"
import Icon from "../Icon"
import Button  from "../Button";
import ReadStatusToggle from "../fic/ReadStatusToggle"
import RatingButtons from "../fic/RatingButtons"
import TagList from "../fic/TagList"
import FicLinks from "../fic/FicLinks"

const minDefault = "30px"

const columns: TableColumn<Fic>[] = [
  {
    name: "",
    id: "ao3id",
    selector: row => row.ao3id,
    center: true,
    minWidth: minDefault,
    maxWidth: "44px",
    cell: (row) => { return (<Button color="primary" variant="ghost" className="s-circle" onClick={()=>{window.alert(row.ao3id)}}><Icon name="open" size={18} /></Button>)
  }
  },
  {
    name: "Rating",
    id: "rating",
    sortable: true,
    filterable:true,
    button: true,
    minWidth: "140px",
    maxWidth: "160px",
    cell: row => {return (<RatingButtons rating={row.rating} size={18} showAll={true} editable={true} />)}
  },
  {
    name: "Read",
    id: "read",
    sortable: true,
    filterable:true,
    button: true,
    minWidth: minDefault,
    maxWidth: "60px",
    cell: row => {return (<ReadStatusToggle status={Boolean(row.read)} size={18} editable={true} />)}
  },
  {
    name: "Title",
    id: "title",
    sortable: true,
    filterable:true,
    wrap: true,
    ignoreRowClick: true,
    minWidth: "240px",
    maxWidth: "420px",
    cell: row => { return (<FicLinks linkType="work" items={row.title} ao3id={row.ao3id} />)}
  },
  {
    name: "Author",
    id: "author",
    sortable: true,
    filterable:true,
    wrap: true,
    ignoreRowClick: true,
    minWidth: "120px",
    maxWidth: "200px",
    cell: row => { return (<FicLinks linkType="user" items={row.author} ao3id={row.ao3id} />)}

  },
  {
    name: "Fandoms",
    id: "fandom",
    sortable: true,
    filterable:true,
    wrap: true,
    ignoreRowClick: true,
    minWidth: "160px",
    maxWidth: "280px",
    cell: row => { return (<FicLinks linkType="tag" items={row.fandom} ao3id={row.ao3id} />)}

  },
  {
    name: "Relationship",
    id: "relationship",
    sortable: true,
    filterable:true,
    wrap: true,
    ignoreRowClick: true,
    minWidth: "120px",
    maxWidth: "280px",
    cell: row => { return (<FicLinks linkType="tag" items={row.relationship} ao3id={row.ao3id} />)}
  },
  {
    name: "Private Tags",
    id: "personal_tags",
    sortable: true,
    filterable:true,
    wrap: true,
    ignoreRowClick: true,
    minWidth: "160px",
    maxWidth: "420px",
    cell: row => {return (<TagList fic={row} tags={row.personal_tags} size="sm" addTag={()=>{}}removeTag={()=>{}}/>)}

  },
  {
    name: "Last Visit",
    id: "visit",
    sortable: true,
    right:true,
    minWidth:"60px",
    maxWidth:"80px",
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
    right:true,
    minWidth:"60px",
    maxWidth:"70px",
    selector: row => row.word_count,
    format: (row, i) => {
      return formatFicText("WordCount", row.word_count)
    }
  },
  {
    name: "Est",
    id: "est_time",
    sortable: true,
    right:true,
    minWidth:"50px",
    maxWidth:"64px",
    selector: row => {
      const [hours, minutes] = getEstTime(row.word_count, false);
      return minutes
    },
    format: (row, i) => {
      let d = formatFicText("EstTime", row.word_count)
      console.log(d); return d
    }
  }
]

const fieldByCol = columns.map((col) => col.id) as (keyof Fic)[];



export { columns, fieldByCol };
