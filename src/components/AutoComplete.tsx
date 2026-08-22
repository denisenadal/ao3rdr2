import { type ChangeEvent, useState, useMemo } from 'react'
import type { Fic, } from "./Fic/ficTypes.ts";

import Tag from "./Tag/index.tsx"

interface acProps {
    fic?: Fic,
    tags: string[] | undefined,
    onUpdateTags: (updatedTagList: string[]) => void
}
const AutoComplete = ({ fic, tags, onUpdateTags }: acProps) => {
    if (!tags) return
    const [userInput, updateInput] = useState("")
    const displayedTags = fic ? fic.personal_tags : tags;
    const matches: string[] = useMemo(() => {
        if (!fic) return [];
        if (userInput.length === 0) return [];
        let startingSet = tags.filter(n => !fic.personal_tags.includes(n))

        return startingSet.filter(n => n.includes(userInput))
    }, [userInput]);


    function handleNewTag(tag: string) {
        const updatedTags = [...displayedTags, tag]
        onUpdateTags(updatedTags)
        updateInput("")
    }
    function handleRemoveTag(tag: string) {
        const updatedTags = displayedTags.filter(t => { return t !== tag })
        onUpdateTags(updatedTags)
    }
    function handleInput(e: ChangeEvent) {
        const input: string = (e.currentTarget as HTMLInputElement).value
        updateInput(input)
    }
    function renderMatches() {

        return (<ul className="menu p-0">
            {matches.map((tag) => {
                return (
                    <li key={tag} className="menu-item m-0 p-0">
                        <a href="#" className="d-flex" onClick={() => { handleNewTag(tag) }}>{tag}</a>
                    </li>
                )
            })}
        </ul>)
    }
    return (
        <div className="form-autocomplete col-12"  >
            <fieldset className="form-autocomplete-input form-input">
                {displayedTags.map(tag => {
                    return (
                        <Tag fic={fic} key={tag} tag={tag} color="primary" variant="muted" size="md" onRemove={() => { handleRemoveTag(tag) }} />
                    )
                })}
                <input type="text" className="form-input" value={userInput || ""} placeholder="Type to add tag, Enter to save" onChange={handleInput} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleNewTag(userInput); } }} />
            </fieldset>
            {fic ? renderMatches() : ""}
        </div>
    )
}

export default AutoComplete