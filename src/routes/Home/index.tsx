import { useState} from "react";

import "./Home.css"
import FicTable from "../../components/home/FicTable";
import FicModal from "../../components/home/FicModal";
import type { Fic } from "../../types/fic.ts";

import fics from "../../temp/fics"


function Home() {  
  const [ficList, updateFicList] = useState(fics);
  const [modalState, updateModalState] = useState({
    show: false,
    fic: fics[0]
  })


  const updateSelectedFic = (fic: Fic) => {
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