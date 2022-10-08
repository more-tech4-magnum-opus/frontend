import { Button } from "antd";
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { fetchDelProduct, getProductByID } from "../../app/admin/adminSlice";
import { RootAdminState } from "../../app/adminStore";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProductIE } from "../../app/interfaces";
import "./adminMarketCard.css"


export const AdminMarketCard:React.FC<ProductIE> = (props) =>{
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    
    return(
        <div className="adminCard">
            <img className="adminImg" src={props.image}></img>
            <div className="adminCardWrapper">
                <div className="adminCost">
                    <img src="/rub.svg"></img>
                    <div>{props.cost}</div>
                </div>
                <div className="adminCardH2">{props.name}</div>
                <div className="adminCardDescr">{props.description.split(" ").slice(0,6).join(" ")}</div>
                <Button className="btn1" style={{width:"100%"}} onClick={()=>navigate("/admin/market/" + props.id) }>Редактировать</Button>
                <Button className="btn2" style={{width:"100%"}} onClick={()=>fetchDelProduct(dispatch, props.id)}>Удалить</Button>
            </div>
            
        </div>
    )
}