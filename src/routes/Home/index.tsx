import { useState} from "react";

import FicTable from "../../components/fic/FicTable";
import FicModal from "../../components/fic/FicModal";
import type { Fic,FicUpdate } from "../../components/fic/ficTypes.ts";
import type {settingsData} from "../../components/Settings/settingTypes.ts"
import fics from "../../temp/fics"

interface homeProps{
  settings: settingsData
}

function Home({settings}:homeProps) {  
  //TODO use settings to update table display.
  const [ficList, updateFicList] = useState(fics);
  const [modalState, updateModalState] = useState({
    show: false,
    fic: fics[0]
  })


  const updateSelectedFic = (update:FicUpdate) => {
    let fic = {...update.fic,...update.update}
    updateFicList(ficList.map(f =>
      f.ao3id === fic.ao3id ? fic : f
    ));
    updateModalState(prev =>
      prev.fic.ao3id === fic.ao3id ? { ...prev, fic } : prev
    );
  };
  
  const updateModalVisibility = (fic?:Fic) => {
    if(fic){
      updateModalState({ fic: fic, show: true})
      return 
    }
    updateModalState({ fic: modalState.fic, show: !modalState.show })
  }
  

  return (
    <>
      <FicTable fics={ficList} updateSelectedFic={updateSelectedFic}  toggleModal={updateModalVisibility} />
      <FicModal fic={modalState.fic} show={modalState.show} toggleModal={updateModalVisibility} updateFic={updateSelectedFic} /> 
    </>
  )
}

export default Home