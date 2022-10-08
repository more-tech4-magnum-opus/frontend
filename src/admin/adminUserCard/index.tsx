import { Button, Input } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchChangeEmployer, fetchDelEmployer, getEmployerByTg } from "../../app/admin/adminSlice";
import { RootAdminState } from "../../app/adminStore";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./adminUserCard.css"

export const AdminUserCard:React.FC = () => {
    let {tg} = useParams()
    let user = useAppSelector((state: RootAdminState) => getEmployerByTg(state, tg as string))
    let dispatch = useAppDispatch()
    let navigate = useNavigate()

    const [name, setName] = useState(user.name)
    const [balance, setbalance] = useState(user.balance)
    const [respect, setrespect] = useState(user.respect)
    const [command, setcommand] = useState(user.name)
    const [jobTittle, setjobTittle] =  useState(user.jobTittle)
    
    
    const onDelete = () =>{
        fetchDelEmployer(dispatch, user.telegramID)
    }

    const onSave = () =>{
        fetchChangeEmployer(dispatch,{
            name:name,
            balance:balance,
            respect: respect,
            speciality: jobTittle,
            tg:user.telegramID
        })
        alert("Данные сохранены!")
        navigate("/admin/users")
    }
    return(
        <div className="userCard">
            <div className="changeProductCard">
                <div className="addProductH1">
                    Редактирование пользователя: {user.name}
                </div>
                <div className="userCardWrapper">
                    <div className="InpWrapper">
                        <div className="nameText">Telegram</div>
                        <div className="fieldText">{user.telegramID}</div>
                    </div>
                    <div  className="InpWrapper">
                        <div className="nameText">Кошелек</div>
                        <div  className="fieldText">{user.wallet}</div>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">Роль</div>
                        <div  className="fieldText">{user.role}</div>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">ФИО</div>
                        <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="ФИО"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">Баланс</div>
                        <Input value={balance} onChange={(e)=>setbalance(Number(e.target.value))} placeholder="баланс"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText"> Респект</div>
                        <Input value={respect} onChange={(e)=>setrespect(Number(e.target.value))} placeholder="респект"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">Команда</div>
                        <Input value={command} onChange={(e)=>setcommand(e.target.value)} placeholder="команда"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div className="nameText">Специальность</div>
                        <Input value={jobTittle} onChange={(e)=>setjobTittle(e.target.value)} placeholder="специальность"></Input>
                    </div>
                </div>
                <div className="btnWrapper">
                    <Button className="btn1"  onClick={()=>onDelete()}>Удалить пользователя</Button>
                    <Button className="btn2" onClick={()=>onSave()}>Сохранить</Button>
                </div>
            </div>
        </div>
    );
}