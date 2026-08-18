import type { MouseEvent } from "react";
import {getRatingIcon} from "./RatingIcons"
import type { Fic } from "../../../types/fic.ts";

interface RatingProps{
    fic: Fic,
    size: number,
    showAll: boolean,
    changeRating?: (e:MouseEvent, fic:Fic)=> void
}

function RatingButtons({fic, size, showAll , changeRating} : RatingProps) {
    let styles = {};
    const rating = fic.rating;
    const editable = changeRating !== undefined;
    
    if(!showAll){
        return ( 
            <button className="btn btn-link text-decoration-none rating-button p-0" style={styles} data-rating={rating} >
                {getRatingIcon(rating, size, false)}
                </button>
                
            )
        }
    else{
        const nums = [-1,1,2,3,4]
        let styles ={}
    
        return (
            <figure className="d-flex img-row flex-center p-0 m-0" style={{...styles,gap:2}}>
                {nums.map((i)=>{
                    let isBlank = i !== rating;

                    return ( 
                    <button key={i} className="btn-icon s-circle p-0 rating-button" data-rating={i} onClick={(e:MouseEvent)=>{ if(changeRating){ changeRating(e, fic)} }}  disabled={!editable}>
                        {getRatingIcon(i, size, isBlank)}
                        </button>
                        
                    )
                })}
            </figure>
        )
    }
}
export default RatingButtons