import React, { useState } from "react"
import { getProducts, getUser } from "../../app/admin/adminSlice";
import { RootAdminState } from "../../app/adminStore";
import { useAppSelector } from "../../app/hooks";
import { Header } from "../../components/Header";
import { AdminMarketCard } from "../adminMarketCard";
import "./adminMarket.css"
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";
import { AdminMarketPopUp } from "../adminMarketPopUp";

export const AdminMarket:React.FC = () =>{
    const [opened, setOpened] = useState(false);
    let user = useAppSelector((state:RootAdminState)=>getUser(state))
    let cards: JSX.Element[] = []
    let products = useAppSelector(
        (state: RootAdminState)=>getProducts(state)).forEach(
            product=>cards.push(<AdminMarketCard  
                        name={product.name}
                        description={product.description}
                        image={product.image} 
                        cost={product.cost} 
                        id={product.id}
                    ></AdminMarketCard>))
    
    return(
            <div className="market">
                <Header links={[
                        {
                            link:"/admin/market",
                            name:"Market place"
                        },
                        {
                            link:"/admin/market/add",
                            name:"Cоздать товар (NFT)"
                        },
                        {
                            link:"/admin/users",
                            name:"Участники"
                        }
                    ]}
                    name={user.name}></Header>
                <div className="marketCard">
                    <div className="addProductH1">Market Place товаров и услуг</div>
                    <div className="productWrapper">
                        {cards}
                    </div>
                </div>
            </div>
            
    );
}