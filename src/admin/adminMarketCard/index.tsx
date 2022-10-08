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
            <img src={props.image}></img>
            <div className="adminCost">
                <img src="/rub.svg"></img>
                <div>{props.cost}</div>
            </div>
            <div>{props.name}</div>
            <div>{props.description}</div>
            <Button className="btn1" onClick={()=>navigate("/admin/market/" + props.id) }>Редактировать</Button>
            <Button className="btn2" onClick={()=>fetchDelProduct(dispatch, props.id)}>Удалить</Button>
        </div>
    )
}