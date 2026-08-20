import type {ChangeEvent} from "react";
import type { Fic,FicUpdate } from "../ficTypes.ts";

interface notesProps {
    fic: Fic,
    updateNotes?: (update:FicUpdate)=> void
}

function FicNotes({ fic, updateNotes }: notesProps) {
    function handleChange(e:ChangeEvent){
        const notes:string = (e.currentTarget as HTMLInputElement).value
        const update = {"fic":fic, "update":{"notes": notes}}

        if(updateNotes){ updateNotes(update) }
    }
     
    return (
        <textarea name="notes" id="fm-notes" className="form-input col-12 editable" onChange={handleChange} value={fic.notes||""}></textarea>

  )
}

export default FicNotes