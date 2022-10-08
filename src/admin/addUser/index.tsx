import { Button, Input } from "antd";
import { Dropdown, Menu, Space } from 'antd';

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddEmployer, fetchChangeEmployer, fetchDelEmployer, getEmployerByTg } from "../../app/admin/adminSlice";
import { RootAdminState } from "../../app/adminStore";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "../adminUserCard/adminUserCard.css"

export const AddUser:React.FC = () => {
    let dispatch = useAppDispatch()
    let navigate = useNavigate()
    const [type, setType] = useState("WORKER") //WORKER HR ADMIN
    const [salary, setSalary] = useState("10")
    const [tg, setTg] = useState("")
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")
    const [respect, setrespect] = useState("100")
    const [command, setcommand] = useState("")
    
    

    const onSave = () =>{
        console.log(type)
        fetchAddEmployer(dispatch,{
            name:name,
            salary:salary,
            respect: respect,
            type: type,
            pass:pass,
            tg:tg,
            command: command
        })
        alert("Пользователь добавлен!")
        navigate("/admin/users")
    }

    

    return(
        <div className="userCard">
            <div className="changeProductCard">
                <div className="addProductH1">
                    Создание пользователя
                </div>
                <div className="userCardWrapper">
                    <div className="InpWrapper">
                        <div className="nameText">Telegram</div>
                        <Input value={tg} onChange={(e)=>setTg(e.target.value)} placeholder="Telegram"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">Роль</div>
                        <select onChange={(e)=>setType(e.target.value)}>
                            <option>WORKER</option>
                            <option>HR</option>
                            <option>ADMIN</option>
                        </select>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">ФИО</div>
                        <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="ФИО"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">Пароль</div>
                        <Input value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="ФИО"></Input>
                    </div>

                    <div className="InpWrapper">
                        <div className="nameText">Зарплата</div>
                        <Input  type="number" value={salary} onChange={(e)=>setSalary(e.target.value)} placeholder="баланс"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText"> Респект</div>
                        <Input  type="number"  value={respect} onChange={(e)=>setrespect(e.target.value)} placeholder="респект"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">Команда</div>
                        <Input type="number" value={command} onChange={(e)=>setcommand(e.target.value)} placeholder="команда"></Input>
                    </div>
                </div>
                <div className="btnWrapper">
                    <Button className="btn2" onClick={()=>onSave()}>Добавить</Button>
                </div>
            </div>
        </div>
    );
}