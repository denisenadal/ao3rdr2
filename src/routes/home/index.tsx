import {useState} from "react";
import type { Fic } from "../../types/fic.ts";

import "./home.css"
import FicTable from "../../components/home/FicTable";
import FicModal from "../../components/home/FicModal";
import fics from "../../temp/fics"


function Home(){
  const [ficList,updateFicList] = useState(fics);
  
  const [modalState, updateModalState] = useState({
    show: false,
    fic:fics[0]
  })
  const updateSelectedFic = (fic:Fic)=>{
    updateModalState({fic:fic,show:true})
    console.log(fic)
    console.log(modalState.fic)
    console.log(modalState.show)

  };
  const updateModalVisibility =()=>{
    updateModalState({fic:modalState.fic,show:!modalState.show})
  }
    return (
    <>
      {/* <table>
        {fics.map((fic)=>{
            return <tr><td>{fic.title}</td><td>{fic.author}</td></tr>
        })}
      </table> */}
      <FicTable fics={ficList} updateSelectedFic={updateSelectedFic} />
      <FicModal fic={modalState.fic} show={modalState.show}  toggleModal={updateModalVisibility}/>
    </>
)}

export default Home