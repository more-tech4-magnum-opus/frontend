import "./adminMarketPopUp.css"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootAdminState } from "../../app/adminStore"
import { fetchChangeProduct, getProductByID, getUser } from "../../app/admin/adminSlice"
import { Button, Input } from "antd"
import { ProductIE } from "../../app/interfaces"
import { PrevMarketCard } from "../../components/prevMarketCard"
import { Header } from "../../components/Header"

export const AdminMarketPopUp:React.FC = () =>{
    let {id} = useParams()
    let product = useAppSelector((state: RootAdminState)=>getProductByID(state, Number(id)))
    const [cost, setCost] = useState(product.cost)
    const [name, setName] = useState(product.name)
    const [descr, setDescr] = useState(product.description)
    let user = useAppSelector((state:RootAdminState)=>getUser(state))

    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    const onSave = () =>{
        console.log("cocb")
        fetchChangeProduct(dispatch, {
            cost: cost, 
            name: name,
            description: descr,
            id:product.id,
            image: product.image
        } as ProductIE)
        navigate("/admin/market")
    }

    return(
        <div className="changeProduct">
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
            <div className="changeProductCard">
                <div className="addProductH1">Изменение товара</div>
                <div className="addBodyWrapper">
                        <PrevMarketCard
                            image={"/cover.png"}
                            name={name}
                            descr={descr}
                            cost={cost}
                        ></PrevMarketCard>
                    <div className="fieldsWrapper">
                        <div className="InpWrapper">
                            <div>Цена</div>
                            <Input value={cost} onChange={(e)=>setCost(Number(e.target.value))} placeholder="Цена"></Input>
                        </div>
                        <div className="InpWrapper">
                            <div>Название</div>
                            <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Название"></Input>
                        </div>
                        <div className="InpWrapper"> 
                            <div>Описание</div>
                            <Input value={descr} onChange={(e)=>setDescr(e.target.value)} placeholder="Описание"></Input>
                        </div>
                    </div>
                </div>
                
                <Button className="btn1" onClick={()=>onSave()}>Cохранить</Button>
            </div>
        </div>
    )
}