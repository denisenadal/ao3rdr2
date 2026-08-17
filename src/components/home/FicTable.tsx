import DataTable from 'react-data-table-component';
import { type TableColumn } from 'react-data-table-component';
import type { Fic, FicFieldTypes } from "../../types/fic.ts";
import { formatFicText, getEstTime } from "../fic/ficHelpers.ts"
import Icon from "../Icon"
import Button  from "../Button";
import ReadStatusToggle from "../fic/ReadStatusToggle"
import RatingButtons from "../fic/RatingButtons"
import TagList from "../fic/TagList"
import FicLinks from "../fic/FicLinks"

interface tableProps {
  fics: Fic[],
  updateSelectedFic: (fic: Fic) => void,
  toggleModal: (fic: Fic) => void;
}
const FicTable = ({ fics, updateSelectedFic, toggleModal }: tableProps) => {
  const minDefault = "30px"

  const handleReadChange=(fic:Fic)=>{
    const updatedStatus: number = fic.read === 0 ? 1 :0; 
    let updatedFic: Fic = {...fic, read: updatedStatus }
    updateSelectedFic(updatedFic);
  }
  const columns: TableColumn<Fic>[] = [
    {
      name: "",
      id: "ao3id",
      selector: row => row.ao3id,
      center: true,
      minWidth: minDefault,
      maxWidth: "44px",
      cell: (row) => {
        return (<Button color="primary" variant="ghost" className="s-circle" onClick={() => { toggleModal(row) }}><Icon name="open" size={18} /></Button>)
      }
    },
    {
      name: "Rating",
      id: "rating",
      sortable: true,
      filterable: true,
      button: true,
      minWidth: "140px",
      maxWidth: "160px",
      cell: row => { return (<RatingButtons rating={row.rating} size={18} showAll={true} editable={true} />) }
    },
    {
      name: "Read",
      id: "read",
      sortable: true,
      filterable: true,
      button: true,
      minWidth: minDefault,
      maxWidth: "60px",
      cell: row => { return (<ReadStatusToggle fic={row} size={18} changeReadStatus={()=>{handleReadChange(row)}} />) }
    },
    {
      name: "Title",
      id: "title",
      sortable: true,
      filterable: true,
      wrap: true,
      ignoreRowClick: true,
      minWidth: "240px",
      maxWidth: "420px",
      cell: row => { return (<FicLinks linkType="work" items={row.title} ao3id={row.ao3id} />) }
    },
    {
      name: "Author",
      id: "author",
      sortable: true,
      filterable: true,
      wrap: true,
      ignoreRowClick: true,
      minWidth: "120px",
      maxWidth: "200px",
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
      cell: row => { return (<FicLinks linkType="tag" items={row.fandom} ao3id={row.ao3id} />) }

    },
    {
      name: "Relationship",
      id: "relationship",
      sortable: true,
      filterable: true,
      wrap: true,
      ignoreRowClick: true,
      minWidth: "120px",
      maxWidth: "280px",
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
      cell: row => { return (<TagList fic={row} tags={row.personal_tags} size="sm" addTag={() => { }} removeTag={() => {handleRemovedTag("",row) }} />) }

    },
    {
      name: "Last Visit",
      id: "visit",
      sortable: true,
      right: true,
      minWidth: "60px",
      maxWidth: "80px",
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
        console.log(d); return d
      }
    }
  ]

  const fieldByCol = columns.map((col) => col.id) as (keyof Fic)[];

  function handleRemovedTag(tag: string, fic?: Fic | undefined) {
    if (!fic) { return; }
    const tags = fic.personal_tags || []
    if (tags.length === 0) { return }
    const updatedTags = tags.filter((t: string) => { return t !== tag })
    const updatedFic = { ...fic, personal_tags: updatedTags }
    updateSelectedFic(updatedFic);
  }



  return (<section id="main-fic-table" className="table-section">
    <DataTable columns={columns} data={fics} keyField="ao3id" pagination={true} theme="default" />;
  </section>
  )
}

export default FicTable