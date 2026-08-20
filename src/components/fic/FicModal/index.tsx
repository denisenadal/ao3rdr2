import Button from "../../Button/index.tsx"
import Icon from "../../Icon.tsx"

import type { Fic, FicUpdate } from "../ficTypes.ts";
import {formatFicText} from "../ficFormatters.ts"
import RatingButtons from "../fields/RatingButtons/index.tsx"
import ReadStatusToggle from "../fields/ReadStatusToggle"
import FicLinks from "../fields/FicLinks.tsx"
import TagList from "../fields/TagList.tsx"
import FicNotes from "../fields/FicNotes.tsx"

import "./modal.css"

interface modalProps {
  fic: Fic,
  show: boolean,
  toggleModal: () => void,
  updateFic: (update:FicUpdate|string)=>void
}

const FicModal = ({ fic, show, toggleModal, updateFic }: modalProps) => {
  if(!fic){return}
  const chapterString = fic.chapters_published + "/" + fic.chapters_total;


  function renderTags(tags?:string[] ){
     if(fic.personal_tags ){
      return (
    <section className="columns form-group editable">
      <label className="m-0 form-label col-11" >Personal Tags</label>
      <TagList fic={fic} tags={tags} size="md" updateTags={updateFic} />
    </section> 
      )}
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
            <section className="fic-meta flex-column d-flex columns">
              <h2 id="fm-heading" className="modal-title m-0 h4">{fic.title}</h2>
              <p id="fm-author" className="m-0">{fic.author}</p>
            </section>
            <section className="columns">
              
              <div className="fic-controls column col-auto">
              <ReadStatusToggle fic={fic} size={24} changeReadStatus={updateFic} />
              </div>
              <div className="column">
              <RatingButtons fic={fic} size={18} showAll={true} changeRating={updateFic} />
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
                <div id="fm-fandoms">
                  {<FicLinks items={fic.fandom} ao3id={fic.ao3id} linkType="tag" />}
                </div>
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
              <FicNotes fic={fic} updateNotes={updateFic} />
            </section>
            {renderTags(fic.personal_tags)}
          </main>
          <footer id="fm-footer" className="modal-footer">
            <Button color="secondary" variant="muted" onClick={handleToggle} label="Close" />
          </footer>
        </dialog>
    </section>
  )
}

export default FicModal