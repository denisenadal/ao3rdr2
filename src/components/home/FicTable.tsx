// import DataTable from 'datatables.net-react';
// import 'datatables.net-columncontrol-dt';
import React from "react";
import {columns, fieldByCol} from "./tableConfig.ts"

import {DataEditor, GridCellKind} from "@glideapps/glide-data-grid"
import type {Item,GridCell,GridColumn} from "@glideapps/glide-data-grid"

import "@glideapps/glide-data-grid/dist/index.css";

import FicSelector from "../../components/fic/FicSelector"
import FicLinks from "../../components/fic/FicLinks"
import FicText from "../../components/fic/FicText"
import RatingButtons from "../fic/RatingButtons/index.tsx"
import ReadStatusToggle from "../fic/ReadStatusToggle.tsx";
import TagList from "../fic/TagList"

import type {FilterKey, OptionSet} from "./filterOptions"
import type { Fic } from "../../types/fic.ts";

interface tableProps {
    fics: Fic[],
    updateSelectedFic:(fic:Fic)=> void,
    toggleModal: (fic:Fic)=>void;
  }
const FicTable = ({fics, updateSelectedFic, toggleModal}: tableProps)=>{

    const getCellContent = React.useCallback((cell: Item): GridCell => {
      const [col, row] = cell;
      const fic = fics[row];
      const key = fieldByCol[col];
      const cellData = fic[key];
      const cellType = columns[col].type;
      const formatter = columns[col].formatter

      return {
          kind: cellType,
          allowOverlay: false,
          displayData: formatter(cellData),
          data:formatter(cellData),
      } as GridCell;
  }, [fics]);

    function handleRemovedTag(tag:string,fic?:Fic|undefined){
      if(!fic){return;}
      const tags = fic.personal_tags || []
      if(tags.length === 0){return}
      const updatedTags = tags.filter((t:string)=>{return t !==tag})
      const updatedFic = {...fic,personal_tags:updatedTags}
      updateSelectedFic(updatedFic);
    }

//     const backup = ()=>{ return (  <DataTable id="ficTable" data={fics} columns={columns} options={options} slots={{
//       0:(data:string,row:Fic)=>{ return (<FicSelector fic={row} loadModalFic={()=>{toggleModal(row)}} />)
//       },
//       1:(data:number)=>{ return (<RatingButtons rating={data} size={18} showAll={true} editable={true} />)
//       },
//       2:(data:boolean)=>{return (<ReadStatusToggle status={data} size={18} editable={true}  />)},
//       3:(data:string, type:string, row:Fic)=>{return type=="display" ? (<FicLinks value={data} ao3id={row.ao3id} linkType="work" />) : data},
//       4:(data:string, type:string, row:Fic)=>{return type=="display" ? (<FicLinks value={data} ao3id={row.ao3id} linkType="user" />) : data},
//       5:(data:string,  type:string,row:Fic)=>{return type=="display" ?(<FicLinks value={data} ao3id={row.ao3id} linkType="tag" />) : data},
//       6:(data:string, type:string, row:Fic)=>{return type=="display" ?(<FicLinks value={data} ao3id={row.ao3id} linkType="tag" />) : data},
//       7:(data:string[],row:Fic)=>{ return (<TagList fic={row} tags={data} size="sm" removeTag={handleRemovedTag} />)
//         } ,
//       8:(data:number)=>{return (<FicText textType="MedDate">{data}</FicText>) },
//       9:(data:number)=>{return (<FicText textType="WordCount">{data}</FicText>) },
//       10:(data:number)=>{return (<FicText textType="EstTime">{data}</FicText>) },
//     }}></DataTable>
// )};

    return (<section className="table-section">
      <DataEditor getCellContent={getCellContent} columns={columns} rows={fics.length} />
      </section>
      )
}

export default FicTable