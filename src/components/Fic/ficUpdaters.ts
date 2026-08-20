import type { MouseEvent } from "react";
import type { Fic } from "./ficTypes.ts";


export const handleReadChange=(fic:Fic)=>{
    const updatedStatus: number = fic.read === 0 ? 1 :0; 
    let updatedFic: Fic = {...fic, read: updatedStatus }
    return updatedFic;
  }

export  const handleRatingChange=(e:MouseEvent,fic:Fic)=>{
    let newRating = parseInt(e.currentTarget.getAttribute("data-rating") || "0");
    const oldRating = fic.rating;
    if(oldRating === newRating){
      newRating = 0;
    }
     let updatedFic: Fic = {...fic, rating: newRating }
    return updatedFic;
  }