import DataTable from 'datatables.net-react';
import 'datatables.net-columncontrol-dt';
import {getColumnConfig, options} from "../../lib/dtConfig"
import type { Fic } from "../../types/fic.ts";
import FicSelector from "../../components/fic/ficSelector"
import FicLinks from "../../components/fic/ficLinks"
import FicText from "../../components/fic/ficText"
import RatingButtons from "../fic/ratingButtons/index.tsx"
import ReadStatusToggle  from "../fic/readStatusToggle.tsx";
import { extractFilterOptions } from "../../lib/format"


interface tableProps {
    fics: Fic[],
    updateSelectedFic:(fic:Fic)=> void
  }
const FicTable = ({fics, updateSelectedFic}: tableProps)=>{
    const titleOpts = extractFilterOptions(fics, 'title');
    const authorOpts = extractFilterOptions(fics, 'author');
    const fandomOpts = extractFilterOptions(fics, 'fandom');
    const relationshipOpts = extractFilterOptions(fics, 'relationship');
    const columns = getColumnConfig({
      author: authorOpts,
      fandoms: fandomOpts,
      title: titleOpts,
      relationship: relationshipOpts,
    });

    return (<section className="table-section">
        <DataTable id="ficTable" data={fics} columns={columns} options={options} slots={{
            0:(data:string,row:Fic)=>{ return (<FicSelector fic={row} updateSelectedFic={()=>{updateSelectedFic(row)}} />)
            },
            1:(data:number)=>{ return (<RatingButtons rating={data} size={24} showAll={true} editable={true} />)
            },
            2:(data:boolean)=>{return (<ReadStatusToggle status={data} size={24} editable={true}  />)},
            3:(data:string, type:string, row:Fic)=>{return type=="display" ? (<FicLinks value={data} ao3id={row.ao3id} linkType="work" />) : data},
            4:(data:string, type:string, row:Fic)=>{return type=="display" ? (<FicLinks value={data} ao3id={row.ao3id} linkType="user" />) : data},
            5:(data:string,  type:string,row:Fic)=>{return type=="display" ?(<FicLinks value={data} ao3id={row.ao3id} linkType="tags" />) : data},
            6:(data:string, type:string, row:Fic)=>{return type=="display" ?(<FicLinks value={data} ao3id={row.ao3id} linkType="tags" />) : data},
            7:(data:number)=>{return (< FicText textType="LongDate" text={data}/>) },
            8:(data:number)=>{return (< FicText textType="MedDate" text={data}/>) },
            9:(data:number)=>{return (< FicText textType="WordCount" text={data}/>) },
            10:(data:number)=>{return (< FicText textType="EstTime" text={data}/>) },
          }}></DataTable></section>
    )
}

export default FicTable