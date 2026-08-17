import Tag from "../../components/Button/Tag"
import type { Fic } from "../../types/fic.ts";
import type { MouseEvent } from "react";

interface tlProps{
    fic?: Fic,
    tags?: string[];
    size?: "sm"|"md";
    removeTag?: (e:MouseEvent, fic?:Fic)=>void;
    addTag?:(tag:string)=>void;
}
const TagList = ({fic,tags,size= "md",removeTag,addTag}:tlProps) => {
  if(!tags || tags.length === 0){return;}

  function handleRemovedTag(e:MouseEvent,fic?:Fic){
    if(removeTag && fic){
        removeTag(e, fic)
    }
    else if(removeTag){
      removeTag(e )
    }
  }
  function handleNewTag(tag:string,fic?:Fic){
    if(addTag){
        addTag(tag)
    }
  }
  return (
    <ul className="tag-list d-flex gap-2 py-2 m-0 px-0">
        {tags.map((tag)=>{
          return <li key={tag} className="tag-wrap d-flex m-0">
            <Tag fic={fic} color={"primary"} variant={"muted"} size={size} onRemove={(e:MouseEvent,fic)=>{ if(removeTag){ removeTag(e, fic)} }} >{tag}</Tag>
            </li>
        })}
      </ul>
  )
}

export default TagList