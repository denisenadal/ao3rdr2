import type { MouseEvent } from "react";
import type { Fic } from "../../types/fic.ts";
import RatingButtons from "../../components/fic/RatingButtons"
import ReadStatusToggle from "../../components/fic/ReadStatusToggle"
import FicLinks from "../../components/fic/FicLinks"
import {formatFicText} from "../fic/ficHelpers.ts"
import Button from "../../components/Button"
import TagList from "../../components/fic/TagList"
import Icon from "../../components/Icon"
import "./modal.css"
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
    return (<section className="columns form-group editable">
      <label className="m-0 form-label col-11" >Personal Tags</label>
      <TagList tags={tags} size="md" removeTag={removeTag} addTag={addTag} />
    </section>)
  }

  const handleRatingChange=(e:MouseEvent,fic:Fic)=>{
    console.log(e.currentTarget)
    // let updatedFic: Fic = {...fic, read: updatedStatus }
    // updateSelectedFic(updatedFic);
  }

  function handleToggle(){
    toggleModal();
  }
  return (

    <section className={"fic-modal modal " + (show ? "active" : "hide")} >
      <a href="#close" className={"modal-overlay"} aria-label="Close" onClick={(e)=>{e.preventDefault();handleToggle()}}></a>
        <dialog className="modal-container">
          <header className="modal-header p-relative">
            <button className="btn btn-ghost s-circle p-absolute" style={{top:".5rem",right:0}} aria-label="Close" onClick={handleToggle}>
              <Icon name="close" className="close-modal btn-icon" />
            </button>
            <section className="flex-column d-flex columns">
              <h2 id="fm-heading" className="modal-title m-0 h4">{fic.title}</h2>
              <p id="fm-author" className="m-0">{fic.author}</p>
            </section>
            <section className="columns">
              
              <div className="column col-auto">
              <ReadStatusToggle fic={fic} size={24} changeReadStatus={()=>{}} />
              </div>
              <div className="column">
              <RatingButtons fic={fic} size={18} showAll={true} changeRating={ handleRatingChange} />
              </div>
              <div className="column col-auto form-group text-right">
                <p className="m-0 form-label">Visited</p>
                <p id="fm-visit">
                  {formatFicText("LongDate",fic.visit)}
                </p>
              </div>
            </section>
          </header>
          <main className="modal-body">
            <section className="columns">
              <div className="column col-6 form-group">
                <p className="m-0 form-label">Pairing &nbsp;<span id="fm-cat"></span></p>
                {<FicLinks items={fic.relationship} ao3id={fic.ao3id} linkType="tag" />}
              </div>
              <div className="column col-6 form-group">
                <p className="m-0 form-label">Fandoms</p>
                <p id="fm-fandoms">
                  {<FicLinks items={fic.fandom} ao3id={fic.ao3id} linkType="tag" />}
                </p>
              </div>
              <div className="column col-6 form-group">
                <p className="m-0 form-label">Word Count</p>
                <p id="fm-wc">
                  {formatFicText("WordCount",fic.word_count)}
                </p>
              </div>
              <div className="column col-6 form-group">
                <p className="m-0 form-label">Chapters</p>
                <p id="fm-chapters">
                  {formatFicText("Generic",chapterString)}
                </p>
              </div>
            </section>
            <section className="columns py-3">
              <div className="col-12">
                <p className="m-0 form-label">Summary</p>
                <p id="fm-summary">{ formatFicText("Summary",fic.summary)}</p>
              </div>
            </section>

            <section className="columns form-group">
              <label className="m-0 form-label col-11" >Notes</label>
              <textarea name="notes" id="fm-notes" className="form-input col-12 editable"></textarea>
            </section>
            {renderTags(fic.personal_tags)}
          </main>
          <footer id="fm-footer" className="modal-footer">
            <Button color="info" variant="muted" onClick={()=>window.alert("hello")}>Click Me</Button>
          </footer>
        </dialog>
    </section>
  )
}

export default FicModal