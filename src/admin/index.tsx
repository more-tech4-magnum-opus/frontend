import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';
import { fetchAddProduct, fetchDelProduct, fetchSendCoins, getProducts, getUser } from "../app/admin/adminSlice";
import { adminFetcher, useAppDispatch, useAppSelector } from "../app/hooks";
import { useSelector } from "react-redux";
import { RootAdminState } from "../app/adminStore";
import { Header } from "../components/Header";

export const AdminPage:React.FC = () => {
    const [respProducts, setRespProducts] = useState([-1 as any])
    let products = useAppSelector((state:RootAdminState)=>getProducts(state))
    let user = useAppSelector((state:RootAdminState)=>getUser(state))
    let dispatch = useAppDispatch()
    if (products.length == 0){
        adminFetcher.get("marketplace/product/").then(
        (response)=> setRespProducts(response.data as any)
        )
    }

    if (respProducts[0] != -1){
        respProducts.forEach((product)=>{
            fetchAddProduct(dispatch, product)
        })
    }


    return(
        <div>
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
            ghbdtn
            {/* <div>
                <Input type="number" onChange={(e)=>setUsername(e.target.value)} placeholder="userID"></Input>
                <Input type="number" onChange={(e)=>setAmount(e.target.value)} placeholder="amount"></Input>
                <Button onClick={()=> fetchSendCoins(dispatch, {userID:Number(username), amount:Number(amount)})}>Отправить деньги</Button>
                <div>
                    {"Баланс:" + useSelector((state: RootAdminState)=>getUser(state)).balance}
                </div>
            </div>
            <div>
                Продукты:
                <div>
                    {products.map(el=>JSON.stringify(el))}
                </div>
            </div>
            <div>
                Добавить продукт:
                <Input onChange={(e)=>setName(e.target.value)} placeholder="productName"></Input>
                <Input onChange={(e)=>setDescr(e.target.value)} placeholder="description"></Input>
                <Input onChange={(e)=>setImage(e.target.value)} placeholder="imageURL"></Input>
                <Input type="number" onChange={(e)=>setCost(e.target.value)} placeholder="cost"></Input>
                <Button onClick={()=> fetchAddProduct(dispatch, {name:name, descr:descr, image:image as any,cost:Number(cost)})}>Cоздать продукт</Button>
            </div>
            <div>
                Удалить проодукт:
                <Input type="number" onChange={(e)=>setDelID(e.target.value)} placeholder="ID to delete"></Input>
                <Button onClick={()=> fetchDelProduct(dispatch, Number(delID))}>Удалить продукт</Button>
            </div> */}
        </div>
    );
}
