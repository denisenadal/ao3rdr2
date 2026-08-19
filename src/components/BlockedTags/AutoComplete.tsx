import {type KeyboardEvent, type ChangeEvent, useState} from 'react'
import Tag from "../Button/Tag"

interface acProps{
    tags: string[],
    onUpdateTags: (updatedTagList:string[])=>void
}
//TODO modify to work with fic tags
const AutoComplete = ({tags,onUpdateTags}:acProps) => {
    
    const [userInput,updateInput] = useState("")
    function handleNewTag(e:KeyboardEvent){
        const newTag = userInput
       const updatedTags =[...tags,newTag]
        onUpdateTags(updatedTags)
        updateInput("")
    }
    function handleRemoveTag(tag:string){
;       const updatedTags= tags.filter(t=> {return t!== tag})
        onUpdateTags(updatedTags)
    }
    function handleInput(e:ChangeEvent){
        const input:string = (e.currentTarget as HTMLInputElement).value
        updateInput(input)
    }
    return (
        <div className="form-autocomplete"  >
            <fieldset className="form-autocomplete-input form-input">
                {tags.map(tag=>{
                    return (
                        <Tag key={tag} tag={tag} color="primary" variant="muted" size="md" className="btn-primary" onRemove={()=>{handleRemoveTag(tag)}} />
                    )
                })}
                <input type="text" className="form-input" value={userInput||""} placeholder="Type to add tag, Enter to save" onChange={handleInput}  onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault(); handleNewTag(e);} }}/>
            </fieldset>
            {/* <ul className="menu">
                <li className="menu-item">
                    <a href="#">
                        "tagname"
                    </a>
                </li>
            </ul> */}
        </div>
    )
}

export default AutoComplete