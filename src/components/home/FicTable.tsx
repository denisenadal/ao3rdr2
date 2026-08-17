import DataTable from 'react-data-table-component';

import type { Fic} from "../../types/fic.ts";
import {columns} from "./tableConfig"
interface tableProps {
    fics: Fic[],
    updateSelectedFic:(fic:Fic)=> void,
    toggleModal: (fic:Fic)=>void;
  }
const FicTable = ({fics, updateSelectedFic, toggleModal}: tableProps)=>{
  
  
    function handleRemovedTag(tag:string,fic?:Fic|undefined){
      if(!fic){return;}
      const tags = fic.personal_tags || []
      if(tags.length === 0){return}
      const updatedTags = tags.filter((t:string)=>{return t !==tag})
      const updatedFic = {...fic,personal_tags:updatedTags}
      updateSelectedFic(updatedFic);
    }



    return (<section id="main-fic-table" className="table-section">
       <DataTable columns={columns} data={fics} keyField="ao3id" pagination theme="default" />;
      </section>
      )
}

export default FicTable