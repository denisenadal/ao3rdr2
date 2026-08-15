import type { MouseEvent } from "react";
import {getRatingIcon} from "./RatingIcons"

interface RatingProps{
    rating: number,
    size: number,
    showAll: boolean,
    editable: boolean
}


const changeRating = function(e:MouseEvent){
    console.log(e)
}
function RatingButtons({rating, size, showAll , editable= true} : RatingProps) {
    let styles = {};
    if(document.documentElement.hasAttribute("data-bs-theme") && document.documentElement.getAttribute("data-bs-theme") === "dark"){
        styles = {mixBlendMode: "difference",
            opacity: 0.7}
    }
    if(!showAll){
        return ( 
            <button className="btn btn-link text-decoration-none rating-button p-0" style={styles} onClick={changeRating}  disabled={!editable}>
                {getRatingIcon(rating, size, false)}
                </button>
                
            )
        }
    else{
        const nums = [-1,0,1,3,5]
        let styles ={}
    
        return (
            <figure className="d-flex img-row flex-center p-0 m-0" style={{...styles,gap:2}}>
                {nums.map((i)=>{
                    let isBlank = i !== rating;

                    return ( 
                    <button key={i} className="btn btn-link text-decoration-none rating-button p-0"  onClick={changeRating}  disabled={!editable}>
                        {getRatingIcon(i, size, isBlank)}
                        </button>
                        
                    )
                })}
            </figure>
        )
    }
}
export default RatingButtons