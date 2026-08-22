import { useState } from "react"
import Button from "../../Button/index.tsx";
import Icon from "../../Icon.tsx";

import type { Fic, FicUpdate } from "../ficTypes.ts";
import { formatFicText } from "../ficFormatters.ts";
import RatingButtons from "../fields/RatingButtons/index.tsx";
import ReadStatusToggle from "../fields/ReadStatusToggle/index.tsx";
import FicLinks from "../fields/FicLinks.tsx";
import AutoComplete from "../../../components/AutoComplete";
import FicNotes from "../fields/FicNotes.tsx";

import "./modal.css";

interface modalProps {
  fic: Fic;
  show: boolean;
  toggleModal: () => void;
  updateFic: (update: FicUpdate | string) => void;
  allTags: string[];
  deleteFic: (fic: Fic) => void
}

const FicModal = ({ fic, show, toggleModal, updateFic, allTags, deleteFic }: modalProps) => {
  if (!fic) { return; }
  const chapterString = fic.chapters_published + "/" + fic.chapters_total;
  const [showDelete, setShowDelete] = useState(false)

  function handleDelete() {
    deleteFic(fic);
    setShowDelete(false);
    toggleModal();
  }

  return (
    <section className={"fic-modal modal " + (show ? "active" : "hide")}>
      <a href="#close" className={"modal-overlay"} aria-label="Close" onClick={(e) => { e.preventDefault(); toggleModal(); }} ></a>
      <dialog className="modal-container">
        {!showDelete ? (
          <div className="fic-content">
            <header className="modal-header p-relative">
              <button className="btn btn-ghost s-circle p-absolute" style={{ top: ".5rem", right: 0 }} aria-label="Close" onClick={() => { toggleModal(); }} >
                <Icon name="close" className="close-modal btn-icon" />
              </button>
              <h2 id="fm-heading" className="modal-title m-0 h4">
                <FicLinks linkType="work" items={fic.title} ao3id={fic.ao3id} />
              </h2>
              <section className="columns">
                <div className="column flex-column fic-meta-left">
                  <FicLinks linkType="user" items={fic.author} ao3id={fic.ao3id} className="m-0 col-12" />
                  <div className="columns m-0">
                    <ReadStatusToggle fic={fic} size={22} changeReadStatus={updateFic} />
                    <RatingButtons fic={fic} size={20} showAll={true} changeRating={updateFic} />
                  </div>
                </div>
                <div className="column col-auto form-group text-right">
                  <p className="m-0 form-label">Visited</p>
                  <p id="fm-visit">{formatFicText("LongDate", fic.visit)}</p>
                </div>
              </section>
            </header>
            <main className="modal-body">
              <section className="columns">
                <div className="column col-6 form-group">
                  <p className="m-0 form-label">  Pairing &nbsp;<span id="fm-cat"></span> </p>
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
                  <p id="fm-wc">{formatFicText("WordCount", fic.word_count)}</p>
                </div>
                <div className="column col-6 form-group">
                  <p className="m-0 form-label">Chapters</p>
                  <p id="fm-chapters">{formatFicText("Generic", chapterString)}</p>
                </div>
              </section>
              <section className="columns py-3">
                <div className="col-12">
                  <p className="m-0 form-label">Summary</p>
                  <p id="fm-summary">{formatFicText("Summary", fic.summary)}</p>
                </div>
              </section>

              <section className="columns form-group">
                <label className="m-0 form-label col-11">Notes</label>
                <FicNotes fic={fic} updateNotes={updateFic} />
              </section>
              <section className="columns form-group editable">
                <label className="m-0 form-label col-11">Personal Tags</label>
                <AutoComplete fic={fic} tags={allTags} onUpdateTags={(tags) => { updateFic({ fic: fic, update: { personal_tags: tags } }); }} />
              </section>
            </main>
            <footer id="fm-footer" className="modal-footer">
              <Button color="error" variant="ghost" onClick={() => { setShowDelete(true) }} label="Delete Bookmark" />
              <span className="column spacer"></span>
              <Button color="secondary" variant="muted" onClick={() => { toggleModal(); }} label="Close" />
            </footer>
          </div>)
          : (
            <div className="delete-content p-2">
              <h2>Confirm</h2>
              <p className="m-0">Are you sure you want to remove this bookmark from your account?</p>
              <footer className="delete-footer columns pt-2">
                <span className="spacer column"></span>
                <Button color="secondary" variant="muted" onClick={() => { setShowDelete(false) }} label="No, Go Back" className="mr-2" />
                <Button color="error" variant="solid" onClick={() => { handleDelete(); }} label="Yes Delete" />
              </footer>
            </div>)}
      </dialog>
    </section >
  );
};

export default FicModal;
