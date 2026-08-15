import type { Fic } from "../../types/fic.ts";
import type { MouseEvent } from "react"
import RatingButtons from "../../components/fic/RatingButtons"
import FicLinks from "../../components/fic/FicLinks"
import FicText from "../../components/fic/FicText"

interface modalProps {
  fic: Fic,
  show: boolean,
  toggleModal: () => void
}

const FicModal = ({ fic, show, toggleModal }: modalProps) => {
  const chapterString = fic.chapters.published + "/" + fic.chapters.total
  // const handleToggle=(e:MouseEvent)=>{
  //   toggleModal()
  // }
  return (

    <section className={"fic-modal " + (show ? "show" : "hide")} style={{ display: show ? "block" : "none" }}>
      <div className={"modal-backdrop fade " + (show ? "show" : "hide")}></div>
      <div className={"modal modal-lg " + (show ? "show" : "hide")} style={{ display: show ? "block" : "none" }}>
        <dialog className="modal-dialog modal-content">
          <header className="modal-header ">
            <button className="btn btn-link position-absolute" style={{top:0,right:0}} aria-label="Close" onClick={toggleModal}>
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
                {<FicLinks value={fic.relationship} ao3id={fic.ao3id} linkType="tags" />}
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Fandoms</p>
                <p id="fm-fandoms">
                  {<FicLinks value={fic.fandom} ao3id={fic.ao3id} linkType="tags" />}
                </p>
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Word Count</p>
                <p id="fm-wc">
                  {<FicText text={fic.word_count} textType="WordCount" />}
                </p>
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Chapters</p>
                <p id="fm-chapters">
                  {<FicText text={chapterString} textType="Generic" />}
                </p>
              </div>
            </section>
            <section  className="row">
              <div className="col-6">
                <p className="m-0 form-label">Updated</p>
                <p id="fm-update">
                  {<FicText text={fic.visit} textType="LongDate" />}
                </p>
              </div>
              <div className="col-6">
                <p className="m-0 form-label">Visited</p>
                <p id="fm-visit">
                  {<FicText text={fic.visit} textType="LongDate" />}
                </p>
              </div>
            </section>
            <section className="row">
              <div className="col-12">
                <p className="m-0 form-label">Summary</p>
                <p id="fm-summary"> {<FicText text={fic.summary} textType="Summary" />}</p>
              </div>
            </section>

            <section className="row px-2">
              <label className="m-0 form-label col-11" >Notes</label>
              <div id="notes-loading" className="loading col-1" style={{ opacity: 0 }}></div>
              <textarea name="notes" id="fm-notes" className="form-input col-12"></textarea>
            </section>
          </main>
          <footer id="fm-footer" className="modal-footer">
            <a id="fm-update-fic" className="btn"><i className="icon icon-refresh"></i> Update Missing Fields</a>
          </footer>
        </dialog>
      </div>
    </section>
  )
}

export default FicModal