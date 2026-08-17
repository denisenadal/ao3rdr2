import Tag from "../../components/Button/Tag"
import type { Fic } from "../../types/fic.ts";

interface tlProps{
    fic?: Fic,
    tags?: string[];
    size?: "sm"|"md";
    removeTag?: (tag:string, fic?:Fic)=>void;
    addTag?:(tag:string)=>void;
}
const TagList = ({fic,tags,size= "md",removeTag,addTag}:tlProps) => {
  if(!tags || tags.length === 0){return;}

  function handleRemovedTag(tag:string,fic?:Fic){
    if(removeTag && fic){
        removeTag(tag, fic)
    }
    else if(removeTag){
      removeTag(tag )
    }
  }
  function handleNewTag(tag:string,fic?:Fic){
    if(addTag){
        addTag(tag)
    }
  }
  return (
    <ul className="d-flex gap-2 py-2 m-0 px-0">
        {tags.map((tag)=>{
          return <li key={tag} className="d-flex"><Tag color={"primary"} variant={"muted"} size={size} onRemove={()=>{handleRemovedTag(tag,fic)}}>{tag}</Tag></li>
        })}
      </ul>
  )
}

export default TagList