import React, { useState } from "react"
import { addProduct, addProducts, fetchAddProduct, getProducts, getUser } from "../../app/admin/adminSlice";
import { RootAdminState } from "../../app/adminStore";
import { adminFetcher, useAppDispatch, useAppSelector } from "../../app/hooks";
import { Header } from "../../components/Header";
import { AdminMarketCard } from "../adminMarketCard";
import "./adminMarket.css"
import { ProductIE } from "../../app/interfaces";

export const AdminMarket:React.FC = () =>{
    const [first, setFirst] = useState(true)

    let user = useAppSelector((state:RootAdminState)=>getUser(state))
    let cards: JSX.Element[] = []
    let prod = useAppSelector(
        (state: RootAdminState)=>getProducts(state)).forEach(
            product=>cards.push(<AdminMarketCard  
                        name={product.name}
                        description={product.description}
                        image={product.image} 
                        cost={product.cost} 
                        id={product.id}
                    ></AdminMarketCard>))
    let products = useAppSelector((state:RootAdminState)=>getProducts(state))

    let dispatch = useAppDispatch()

    if (products.length == 0 && first ){
        setFirst(false)
        adminFetcher.get("marketplace/product/").then(
        (response)=>{
            dispatch(addProducts(
                response.data.map((params:any)=>
                    ({
                        name: params.name,
                        description:params.description,
                        image: params.image_cropped,
                        cost:Number(params.price),
                        id:params.slug
                    } as ProductIE)
                )
            ))
            }
        )
    }


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