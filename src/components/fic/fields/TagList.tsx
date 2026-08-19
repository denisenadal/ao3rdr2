import Tag from "../../../components/Button/Tag"
import type { Fic,FicUpdate } from "../ficTypes.ts";

interface tlProps{
    fic: Fic,
    tags?: string[];
    size?: "sm"|"md";
    updateTags?: (update:FicUpdate|string)=>void;
}
const TagList = ({fic,tags,size= "md",updateTags}:tlProps) => {
  if(!tags || tags.length === 0){return;}

  return (
    <ul className="tag-list d-flex gap-2 py-2 m-0 px-0">
        {tags.map((tag)=>{
          return <li key={tag} className="tag-wrap d-flex m-0">
            <Tag fic={fic} tag={tag} color={"primary"} variant={"muted"} size={size} onRemove={updateTags} ></Tag>
            </li>
        })}
      </ul>
  )
}

export default TagList