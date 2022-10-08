import "./addAdminMarket.css"
import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootAdminState } from "../../app/adminStore"
import { fetchAddProduct, fetchChangeProduct, getProductByID, getUser } from "../../app/admin/adminSlice"
import { Button, Input } from "antd"
import { ProductIE } from "../../app/interfaces"
import { FileUploader } from "../../components/fileUploader"
import { Header } from "../../components/Header"
import { PrevMarketCard } from "../../components/prevMarketCard"

export const AddAdminMarketProduct:React.FC = () =>{
    const [name, setName] = useState("")
    const [descr, setDescr] = useState("")
    const [cost, setCost] = useState(0)
    const [file, setFile] = useState() as any
    let user = useAppSelector((state:RootAdminState)=>getUser(state))

    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    const onDiscard = () =>{
        setName("")
        setCost(0)
        setDescr("")
    }

    const onAcceept = () =>{
        fetchAddProduct(dispatch, {image: file, name:name, cost:cost, descr:descr})
        alert("Успешно создан товар:" +  name)
        navigate("/admin/market")
    }
    const { TextArea } = Input;

    return(
        <div className="addProduct">
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
            <div className="addProductCard">
                <div className="addProductH1">Создать новый продукт (NFT сертификат)</div>
                
                <div className="addBodyWrapper">
                    <div>
                        <PrevMarketCard
                            image={"/cover.png"}
                            name={name}
                            descr={descr}
                            cost={cost}
                        ></PrevMarketCard>
                    </div>
                    <div className="fieldsWrapper">
                        <div className="InpWrapper" >
                            <div>Название</div>
                            <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Название товара"></Input>
                        </div>
                        <div className="InpWrapper">
                            <div>Описание</div>
                            <TextArea rows={4}  value={descr} onChange={(e)=>setDescr(e.target.value)} placeholder="Описание товара"></TextArea>
                        </div>
                        <div className="InpWrapper">
                            <div>Стоимость</div>
                            <Input value={cost} onChange={(e)=>setCost(Number(e.target.value))} placeholder="100"></Input>
                        </div>
                        <div className="InpWrapper">
                            <div>Изображение</div>
                            <div>
                                <FileUploader onResponse={(file)=>setFile(file)}></FileUploader>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="addBtnWrapper">
                    <Button className="btn1" onClick={()=>onDiscard()}>Отмена</Button>
                    <Button className="btn2" onClick={()=>onAcceept()}>Опубликовать</Button>
                </div>
            </div>
        </div>
    );
}