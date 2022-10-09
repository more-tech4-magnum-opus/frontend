import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./regUsers.css"
import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Table, Tag } from 'antd';
import { fetchSubmitAttendance, getCurrentEvent, setCurrentEvent } from "../../app/hr/hrSlice";
import { hrFetcher, useHRDispatch, useHRSelector } from "../../app/hooks";
import { RootHRState } from "../../app/hrStore";

interface DataTypeIE{
    key:string,
    id:number,
    telegram:string,
    attended: boolean
}


export const RegUsers:React.FC = () =>{
    const [attendance, setAttendance] = useState([-1 as any])
    let {name} = useParams()
    
    let navigator = useNavigate()
    const collator = new Intl.Collator('ru');
    const data:DataTypeIE[] = []
    let dispatch = useHRDispatch()

    dispatch(setCurrentEvent(name as string))
    if (attendance[0] == -1){
        hrFetcher.get("events/attendance/"+name+"/list/").then(response=>setAttendance(response.data))

    }

    

    const columns: ColumnsType<DataTypeIE> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id ,
        },
        {
            title: 'Telegram',
            dataIndex: 'telegram',
            key: 'telegram',
            sorter: (a, b) => collator.compare(a.telegram, b.telegram) ,

        },
        
        {
            title: 'Респект',
            dataIndex: 'telegram',
            key: 'telegram',
            render: text=><div>{  "5"} <img src="/respect.svg"></img></div>
        },
        {
            title: 'Начислено',
            dataIndex: 'attended',
            key: 'attended',
            render: text=><Tag color={text? "green":"red"}>
            {text? "Да":"Нет"}
          </Tag>
        },
        {
            title: "Награда",
            dataIndex: 'speciality',
            key: 'speciality',
            render: (_, recorder) => <Button onClick={()=>fetchSubmitAttendance(dispatch, recorder.telegram,name as string)}  className="btn2">Начислить</Button>
        }
    ]

    attendance.forEach((attend)=>{
        data.push({
            key:attend.id,
            id: attend.id,
            telegram: attend.worker_username,
            attended: attend.attended
        } as DataTypeIE)
    })
    
    let currentEvent = useHRSelector((state:RootHRState)=>getCurrentEvent(state))


    return(
        <div className="userTable">
            <div className="changeProductCard">
                <div className="addProductH1">Участники мероприятия {currentEvent.name}</div>
                <Table columns={columns} dataSource={data} />
                <Button onClick={()=>navigator("/hr")}  className="btn2">Назад</Button>
            </div>
        </div>
    );
}