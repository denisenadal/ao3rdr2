import { useState} from "react";

import FicTable from "../../components/Fic/FicTable/index.tsx";
import FicModal from "../../components/Fic/FicModal/index.tsx";
import type { Fic,FicUpdate } from "../../components/Fic/ficTypes.ts";
import type {settingsData} from "../../components/Settings/settingTypes.ts"

interface homeProps{
  settings: settingsData,
  fics: Fic[],
  onUpdatedFics: (fics:Fic[]) =>void
}

function Home({fics,settings, onUpdatedFics}:homeProps) {  
  
  const [modalState, updateModalState] = useState({
    show: false,
    fic: fics[0] || null
  })
  // const displayedFics = settings.rdr_hideDislikes
  // ? fics.filter(fic => fic.rating !== -1)
  // : fics
  const displayedFics = fics;


  const updateSelectedFic = (update:FicUpdate|string) => {
    if(typeof update === "string")return
    let fic = {...update.fic,...update.update}
    const updatedFics = (fics.map(f =>
      f.ao3id === fic.ao3id ? fic : f
    ));
    onUpdatedFics(updatedFics);
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