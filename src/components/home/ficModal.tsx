import type { Fic } from "../../types/fic.ts";
import type {MouseEvent} from "react"
import RatingButtons from "../../components/fic/ratingButtons"

interface modalProps {
  fic: Fic,
  show: boolean,
  toggleModal: ()=>void
}

const FicModal = ({ fic, show }: modalProps) => {

  // const handleToggle=(e:MouseEvent)=>{
  //   toggleModal()
  // }
  return (

    <section className={"modal " + (show ? "show" : "hide")} style={{ display: show ? "block" : "none" }}>
      <div className={"modal-backdrop fade " + (show ? "show" : "hide")}></div>
      <div className={"modal " + (show ? "show" : "hide")} style={{ display: show ? "block" : "none" }}>
        <dialog className="modal-dialog modal-content">
        <header className="modal-header pb-0">
        <a href="#close" className="btn btn-clear float-right" aria-label="Close"></a>
        <div className="row">
          <div className="col-10 flex-column">
            <h2 id="fm-heading" className="modal-title m-0 h4">{fic.title}</h2>
            <p id="fm-author" className="m-0">{fic.author}</p>
          </div>
          <div className="flex-column col-2">
            <RatingButtons rating={fic.rating | 0} size={24} showAll={true} editable={true} />
          </div>
        </div>
      </header>
      <main className="modal-body">
        <div className="row">
          <div className="col-6">
            <p className="m-0 form-label">Pairing</p>&nbsp;<span id="fm-cat"></span>
            <a id="fm-rel"></a>
          </div>
          <div className="col-6">
            <p className="m-0 form-label">Fandoms</p>
            <p id="fm-fandoms"></p>
          </div>
          <div className="col-6">
            <p className="m-0 form-label">Word Count</p>
            <p id="fm-wc"></p>
          </div>
          <div className="col-6">
            <p className="m-0 form-label">Chapters</p>
            <p id="fm-chapters"></p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="m-0 form-label">Updated</p>
            <p id="fm-update"></p>
          </div>
          <div className="col-6">
            <p className="m-0 form-label">Visited</p>
            <p id="fm-visit"></p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="m-0 form-label">Summary</p>
            <p id="fm-summary"></p>
          </div>
        </div>
        
        <div className="row px-2">
          <label className="m-0 form-label col-11" >Notes</label>
          <div id="notes-loading" className="loading col-1" style={{opacity:0}}></div>
          <textarea name="notes" id="fm-notes" className="form-input col-12"></textarea>
        </div>
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