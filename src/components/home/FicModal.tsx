import type { Fic } from "../../types/fic.ts";
import RatingButtons from "../../components/fic/RatingButtons"
import FicLinks from "../../components/fic/FicLinks"
import FicText from "../../components/fic/FicText"
import Button from "../../components/Button"
import TagList from "../../components/fic/TagList"

interface modalProps {
  fic: Fic,
  show: boolean,
  toggleModal: () => void,
  updateFic: (fic:Fic)=>void
}

const FicModal = ({ fic, show, toggleModal, updateFic }: modalProps) => {
  const chapterString = fic.chapters.published + "/" + fic.chapters.total

  function removeTag(tag:string){
    const tags = fic.personal_tags || []
    if(tags.length === 0){
      return
    }
    const updatedTags = tags.filter((t:string)=>{return t !==tag})
    const updatedFic = {...fic,personal_tags:updatedTags}
    updateFic(updatedFic);
  }

  function addTag(tag:string){
    const tags = fic.personal_tags || []
   if(tags.includes(tag)){
    return
   }
    const updatedTags = [...tags,tag]
    const updatedFic = {...fic,personal_tags:updatedTags}
    updateFic(updatedFic);
  }

  function renderTags(tags?:string[] ){
    if(fic.personal_tags)
    return (<section className="row pt-3">
      <label className="m-0 form-label col-11" >Personal Tags</label>
      <TagList tags={tags} size="md" removeTag={removeTag} addTag={addTag} />
    </section>)
  }

  function handleToggle(){
    toggleModal();
  }
  return (

    <section className={"fic-modal " + (show ? "show" : "hide")} style={{ display: show ? "block" : "none" }}>
      <div className={"modal-backdrop fade " + (show ? "show" : "hide")}></div>
      <div className={"modal modal-lg " + (show ? "show" : "hide")} style={{ display: show ? "block" : "none" }}>
        <dialog className="modal-dialog modal-content">
          <header className="modal-header ">
            <button className="btn btn-link position-absolute" style={{top:0,right:0}} aria-label="Close" onClick={handleToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--bs-body-color)" width="24" height="24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <section className="flex-column d-flex flex-grow-1">
              <h2 id="fm-heading" className="modal-title m-0 h4">{fic.title}</h2>
              <p id="fm-author" className="m-0">{fic.author}</p>
            </section>
            <section className="flex-column ">
              <RatingButtons rating={fic.rating} size={24} showAll={true} editable={true} />
            </section>
          </header>
          <main className="modal-body">
            <section className="row">
              <div className="col-6">
                <p className="m-0 form-label">Pairing</p>&nbsp;<span id="fm-cat"></span>
                {<FicLinks value={fic.relationship} ao3id={fic.ao3id} linkType="tag" />}
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Fandoms</p>
                <p id="fm-fandoms">
                  {<FicLinks value={fic.fandom} ao3id={fic.ao3id} linkType="tag" />}
                </p>
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Word Count</p>
                <p id="fm-wc">
                  {<FicText textType="WordCount">{fic.word_count}</FicText>}
                </p>
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Chapters</p>
                <p id="fm-chapters">
                  {<FicText textType="Generic">{chapterString}</FicText>}
                </p>
              </div>
            </section>
            <section  className="row">
              <div className="col-6">
                <p className="m-0 form-label">Updated</p>
                <p id="fm-update">
                  {<FicText textType="LongDate">{fic.visit}</FicText>}
                </p>
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Visited</p>
                <p id="fm-visit">
                  {<FicText textType="LongDate">{fic.visit}</FicText>}
                </p>
              </div>
            </section>
            <section className="row">
              <div className="col-12">
                <p className="m-0 form-label">Summary</p>
                <p id="fm-summary">{ <FicText textType="Summary">{fic.summary}</FicText>}</p>
              </div>
            </section>

            <section className="row px-2">
              <label className="m-0 form-label col-11" >Notes</label>
              <textarea name="notes" id="fm-notes" className="form-input col-12"></textarea>
            </section>
            {renderTags(fic.personal_tags)}
          </main>
          <footer id="fm-footer" className="modal-footer">
            <Button color="info" variant="muted" onClick={()=>window.alert("hello")}>Click Me</Button>
          </footer>
        </dialog>
      </div>
    </section>
  )
}

export default FicModal