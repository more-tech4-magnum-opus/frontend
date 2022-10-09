import { Button, Input } from "antd";
import React, { useState } from "react";
import { adminFetcher, hrFetcher } from "./app/hooks";

export const Transaction:React.FC = () =>{
    const [user, setUser] = useState("")
    const [amount, setAmount] = useState(0)

    const reset = () =>{
        setUser("")
        setAmount(0)
    }

    const sendCoins = () =>{
        let formData = new FormData()
        formData.append("amount", amount.toString())
        formData.append("username", user)

        hrFetcher.post("blockchain/transact/", formData).then(e=>{
            alert("Коины переведены!")
            reset()
        }

        )
    }
    return(
        <div className="addProduct">
            <div className="addProductCard">
                <div className="addProductH1">Перевод/Выдача DigitalRubles</div>
                <div className="fieldsWrapper" >
                    <div className="InpWrapper">
                        <div>Telegram username</div>
                        <Input value={user} onChange={(e)=>setUser(e.target.value)} placeholder="firesieht"></Input>
                    </div>
                    <div className="InpWrapper">
                        <div>Сумма в коинах</div>
                        <Input value={amount} type="number" onChange={(e)=>setAmount(Number(e.target.value))} placeholder="100"></Input>
                    </div>
                </div>
                <Button onClick={()=>sendCoins()} className="btn1">Отправить</Button>
            </div>
        </div>
    );
}