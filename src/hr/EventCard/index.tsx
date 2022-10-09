import { Button } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useHRDispatch } from "../../app/hooks"
import { fetchDelEvent } from "../../app/hr/hrSlice"
import "../../components/prevMarketCard/prevMarketCard.css"
import "./eventCard.css"

interface EventCardIE{
    image:string, 
    cost: number,
    descr: string,
    name:string,
    members: number
    slug?:string
}

export const EventCard:React.FC<EventCardIE> = (props) =>{
    let dispatch = useHRDispatch()
    let navigator = useNavigate()
    
    return(
        <div className="prevCard">
            <img className="eventImg" src={props.image}></img>
            <div className="prevCardWrapper">
                <div className="prevCost">
                    <img  src="/rub.svg"></img>
                    <div>{props.cost}</div>
                </div>
                <div className="prevCardH2">{props.name}</div>
                <div className="prevCardDescr">{props.descr.split(" ").slice(0,6).join(" ")}</div>
                <Button style={{width:"100%"}} onClick={()=>navigator("/hr/events/reg/" + props.slug)} className="btn2">Зарегистрировать</Button>
                <Button  style={{width:"100%"}} onClick={()=>fetchDelEvent(dispatch, props.slug as string)} className="btn1">Удалить ивент</Button>
            </div>
        </div>
    )
}