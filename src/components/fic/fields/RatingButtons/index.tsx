import  type { MouseEvent,ChangeEvent} from "react";
import {useRef} from "react";
import { getRatingIcon } from "./RatingIcons.tsx"
import type { Fic, FicUpdate } from "../../ficTypes.ts";

interface RatingProps {
    fic: Fic,
    size: number,
    showAll: boolean,
    changeRating?: (update: FicUpdate) => void
}

function RatingButtons({ fic, size, showAll, changeRating }: RatingProps) {
    let styles = {};
    const rating = fic.rating;
    const editable = changeRating !== undefined;
    const nums = [-1, 1, 2, 3, 4]

    function handleClick(e:MouseEvent) {
        const rating:number = parseInt((e.target as HTMLInputElement).value)
        const update = {"fic":fic, "update":{"rating": rating}}
        if(changeRating){ changeRating(update) }
    }

    return (
        <fieldset className="d-flex img-row flex-center p-0 m-0" style={{ ...styles, gap: 2 }}>
            {nums.map((i) => {
                let isBlank = i !== rating;

                return (
                    <div className="rating-button p-relative" key={i} style={{width:size+"px"}}>
                        <label className="p-absolute"> {getRatingIcon(i, size, isBlank)}</label>
                        <input type="radio" name="rating" className="btn-icon s-circle p-0 m-0 rating-radio" value={i} onClick={handleClick} disabled={!editable} />
                    </div>
                )
            })}
        </fieldset>)
}
export default RatingButtons