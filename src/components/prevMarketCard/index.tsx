import React from "react"
import "./prevMarketCard.css"
interface PrevMarketCardIE{
    image:string, 
    cost: number,
    descr: string,
    name:string
}

export const PrevMarketCard:React.FC<PrevMarketCardIE> = (props) =>{

    return(
        <div className="prevCard">
            <img className="prevImg" src={props.image}></img>
            <div className="prevCardWrapper">
                <div className="prevCost">
                    <img src="/rub.svg"></img>
                    <div>{props.cost}</div>
                </div>
                <div className="prevCardH2">{props.name}</div>
                <div className="prevCardDescr">{props.descr.split(" ").slice(0,6).join(" ")}</div>
            </div>
        </div>
    )
}