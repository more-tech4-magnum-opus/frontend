import { Button, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminFetcher, hrFetcher, useHRDispatch } from "../../app/hooks";
import { Header } from "../../components/Header";

interface DataTypeIE{
    key:string,
    type:string,
    user_from:string,
    user_to: string,
    amount: number
}

export const TransactionHistory: React.FC = () =>{
    const [transaction, setTransaction] = useState([-1] as any)
    let location = useLocation()
    let hr;
    if (location.pathname.split("/")[1] == "hr"){
        hr = true
    }

    if (transaction[0] == -1){
        if(hr){
            console.log(1)
            hrFetcher.get("blockchain/history/").then(response=>setTransaction(response.data))
        }
        else{
            console.log(2)
            adminFetcher.get("blockchain/history/").then(response=>setTransaction(response.data))

        }
    }
    let navigator = useNavigate()
    const collator = new Intl.Collator('ru');
    const data:DataTypeIE[] = []

    const columns: ColumnsType<DataTypeIE> = [
        {
            title: 'Тип операции',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => collator.compare(a.type, b.type),
            render: text=><Tag color="green">
                                {text}
                        </Tag>
        },
        {
            title: 'Отправитель',
            dataIndex: 'user_from',
            key: 'user_from',
            sorter: (a, b) => collator.compare(a.user_from, b.user_from) ,

        },
        {
            title: 'Получатель',
            dataIndex: 'user_to',
            key: 'user_to',
            sorter: (a, b) => collator.compare(a.user_to, b.user_to) ,

        }, 
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'amount',
            render: text=><div>{ text} <img src="/rub.svg"></img></div>
        },
    ]
    transaction.forEach((el:any)=>{
        data.push({
            key: el.type,
            type: el.type,
            user_from: el.user_from,
            user_to: el.user_to,
            amount: el.amount,
        } as DataTypeIE)
    })

    return(
        <div className="addProduct">
            {hr? <Header links={[
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
                    ]} name={"HR"}></Header>: <Header links={[
                        {
                            link:"/admin/users",
                            name:"Участники"
                        },
                        {
                            link:"/admin/market",
                            name:"Market place"
                        },
                        {
                            link:"/admin/market/add",
                            name:"Cоздать товар (NFT)"
                        },
                        {
                            link:"/admin/transaction",
                            name:"История транзакций"
                        },
 
                    ]}
                name={"Firesieht"}></Header>
                }
            
            
            <div className="addProductCard">
                <div className="addProductH1">История транзакций</div>
                <Button onClick={()=>navigator("/transaction")}  className="btn1">Сделать перевод</Button>
                <Table columns={columns} dataSource={data} />
                <Button onClick={()=>navigator(-1)}  className="btn2">Назад</Button>
            </div>
        </div>
    );
}