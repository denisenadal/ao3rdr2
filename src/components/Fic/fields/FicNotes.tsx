import { useState, useEffect, type ChangeEvent } from "react";
import type { Fic, FicUpdate } from "../ficTypes.ts";

interface notesProps {
    fic: Fic,
    updateNotes?: (update: FicUpdate) => void
}

function FicNotes({ fic, updateNotes }: notesProps) {
    const [inputValue, setInputValue] = useState(fic.notes ? fic.notes : "")

    useEffect(() => {
        setInputValue(fic.notes ?? "");
    }, [fic.ao3id, fic.notes]);

    useEffect(() => {
        const id = setTimeout(() => {
            if (inputValue == fic.notes) return;
            if (updateNotes) {
                updateNotes({ fic, update: { notes: inputValue } });
            }
        }, 500);
        return () => clearTimeout(id);
    }, [inputValue, updateNotes]);


    function handleChange(e: ChangeEvent) {
        const notes: string = (e.currentTarget as HTMLInputElement).value
        setInputValue(notes);
    }
    function handleUpdate() {
        if (updateNotes) { updateNotes({ "fic": fic, "update": { "notes": inputValue } }) }
    }

    return (
        <textarea name="notes" id="fm-notes" className="form-input col-12 editable" onChange={handleChange} value={inputValue}></textarea>
    )
}

export default FicNotes