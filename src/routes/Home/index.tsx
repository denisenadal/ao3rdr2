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
  const [ficList, updateFicList] = useState(fics);
  const [modalState, updateModalState] = useState({
    show: false,
    fic: fics[0]
  })
  const displayedFics = settings.rdr.hideDislikes
  ? ficList.filter(fic => fic.rating !== -1)
  : ficList


  const updateSelectedFic = (update:FicUpdate|string) => {
    if(typeof update === "string")return
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
      <FicTable fics={displayedFics} updateSelectedFic={updateSelectedFic}  toggleModal={updateModalVisibility} settings={settings} />
      <FicModal fic={modalState.fic} show={modalState.show} toggleModal={updateModalVisibility} updateFic={updateSelectedFic} /> 
    </>
  )
}

export default Home