import "./addEvent.css"
import { Button, DatePicker, Input } from "antd";
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useHRDispatch } from "../../app/hooks";
import { fetchAddEvent } from "../../app/hr/hrSlice";
import { FileUploader } from "../../components/fileUploader";
import { Header } from "../../components/Header";
import { EventCard } from "../EventCard";


export const AddEvent: React.FC = () =>{

    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [starts, setStarts] = useState("")
    const [image, setImage] = useState() 

    let navigate = useNavigate()
    let dispatch = useHRDispatch()



    const create = () =>{
        fetchAddEvent(dispatch, {
            name:name,
            about:about,
            starts:starts,
            image:image as any
        })

        alert("Ивент успешно создан!")

        navigate("/hr")
        
    }

    return(
        <div className="addProduct">
            <Header links={[
            {
                link:"/hr",
                name:"События"
            },
            {
                link:"/hr/addEvent",
                name:"Создать событие"
            },
            {
                link:"/hr/transaction",
                name:"История транзакций"
            }
        ]}
        name={"HR"}></Header>
            <div className="addProductCard">
                <div className="addProductH1">Cоздать новое событие</div>
                <div className="addBodyWrapper">
                    <EventCard
                        image={"/mock.png"}
                        cost={5}
                        descr={about}
                        name={name}
                        members={2}
                    ></EventCard>
                    <div className="fieldsWrapper">
                        <div className="InpWrapper">
                            <div>Название</div>
                            <Input value={name} onChange={(e)=>setName(e.target.value)}></Input>
                        </div>
                        <div className="InpWrapper">
                            <div>Описание</div>
                            <Input value={about} onChange={(e)=>setAbout(e.target.value)}></Input>
                        </div>
                        <div className="InpWrapper">
                            <div>Дата проведения</div>
                            <DatePicker onChange={(_, datestring)=>setStarts(datestring)} />
                        </div>
                        <div className="InpWrapper">
                            <div>Картинка</div>
                            <FileUploader onResponse={(file)=>setImage(file)}></FileUploader>
                        </div>
                    </div>
                </div>
                <div className="addBtnWrapper">
                    <Button className="btn1" onClick={()=>navigate("/hr")}>Отмена</Button>
                    <Button className="btn2" onClick={()=>create()}>Создать</Button>
                </div>
            </div>
        </div>
    );
}