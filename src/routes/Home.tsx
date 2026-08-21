import { useState } from "react";
import FicTable from "../components/Fic/FicTable/index.tsx";
import FicModal from "../components/Fic/FicModal/index.tsx";
import type { Fic, FicUpdate } from "../components/Fic/ficTypes.ts";
import type { settingsData } from "../components/Panel/Settings/settingTypes.ts"
import { updateFicSB } from "../lib/supabase"

interface homeProps {
  settings: settingsData,
  fics: Fic[],
  onUpdatedFics: (fics: Fic[]) => void,
  readyState: boolean,
  allTags: string[]
}

function Home({ fics, settings, onUpdatedFics, readyState, allTags }: homeProps) {

  const [modalState, updateModalState] = useState({
    show: false,
    fic: fics[0] || null,
  })

  async function updateSelectedFic(update: FicUpdate | string) {
    if (typeof update === "string") return
    const err = await updateFicSB(update)
    let fic = { ...update.fic, ...update.update }
    const updatedFics = (fics.map(f =>
      f.ao3id === fic.ao3id ? fic : f
    ));
    onUpdatedFics(updatedFics);
    if (modalState.fic && modalState.fic.ao3id) {
      updateModalState(prev =>
        prev.fic.ao3id === fic.ao3id ? { ...prev, fic } : prev
      );
    }
  };

  function updateModalVisibility(fic?: Fic) {
    if (fic) {
      updateModalState({ fic: fic, show: true })
      return
    }
    updateModalState({ fic: modalState.fic, show: !modalState.show })
  }


  return (
    <>
      <FicTable fics={fics} updateSelectedFic={updateSelectedFic} toggleModal={updateModalVisibility} settings={settings} readyState={readyState} />
      <FicModal fic={modalState.fic} show={modalState.show} toggleModal={updateModalVisibility} updateFic={updateSelectedFic} allTags={allTags} />
    </>
  )
}

export default Home