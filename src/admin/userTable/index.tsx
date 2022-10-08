import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearScreenDown } from 'readline';
import { getClans, getEmployers, getUser, setClans, setEmployers } from '../../app/admin/adminSlice';
import { RootAdminState } from '../../app/adminStore';
import { adminFetcher, useAppDispatch, useAppSelector } from '../../app/hooks';
import { ClanIE, EmployerIE } from '../../app/interfaces';
import { Header } from '../../components/Header';
import "./userTable.css"

interface DataTypeIE{
    key:string,
    name:string, 
    telegram:string,
    command:string,
    respect:number,
    balance:number,
    speciality: string,
}
interface ClanColumnsIE{
    key: string,
    name: string,
    tg: string,
    members: number
}


export const UserTable:React.FC = () =>{
    let [clans, setclans] = useState(false)

    let navigator = useNavigate()
    const collator = new Intl.Collator('ru');
    let user = useAppSelector((state:RootAdminState)=>getUser(state))
    const clanColums:ColumnsType<ClanColumnsIE> = [
        {
            title: "+",
            key: "action",
            render: (_, record) =>(
                <img style={{cursor:"pointer"}} onClick={()=>navigator("/admin/clans/" + record.name)} src="/gear.svg"></img>
            )
        },
        {
            title: 'Название клана',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => collator.compare(a.name, b.name) ,
        },
        {
            title: 'Telegram клана',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (<div>@{record.name.split(" ").join("")}</div>),
            sorter: (a, b) => collator.compare(a.name, b.name) ,
        },
        {
            title: 'Количество участников',
            dataIndex: 'members',
            key: 'members',
            sorter: (a, b) => a.members - b.members ,
        },
        {
            title: 'Участники',
            dataIndex: 'members',
            key: 'members',
            render: (_, record) => (<Link to={"/admin/clans/" + record.name} ><div style={{color:"#1890FF"}}>Посмотреть</div></Link>),
            sorter: (a, b) => collator.compare(a.name, b.name) ,
        },
    ]
    const columns: ColumnsType<DataTypeIE> = [
        {
            title: "+",
            key: "action",
            render: (_, record) =>(
                <img style={{cursor:"pointer"}} onClick={()=>navigator("/admin/users/" + record.key)} src="/gear.svg"></img>
            )
        },
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => collator.compare(a.name, b.name) ,
        },
        {
            title: 'Telegram',
            dataIndex: 'telegram',
            key: 'telegram',
            sorter: (a, b) => collator.compare(a.telegram, b.telegram) ,

        },
        {
            title: 'Название клана',
            dataIndex: 'command',
            key: 'command',
            sorter: (a, b) => Number(a.command) - Number(b.command) ,

        },
        {
            title: 'Респект',
            dataIndex: 'respect',
            key: 'respect',
            sorter: (a, b) => a.respect - b.respect,
            render: text=><div>{text + " "} <img src="/respect.svg"></img></div>
        },
        {
            title: 'Баланс',
            dataIndex: 'balance',
            key: 'balance',
            sorter: (a, b) => a.balance - b.balance,

            render: text=><div>{text + " "} <img src="/rub.svg"></img></div>
        },
        {
            title: 'Специальность',
            dataIndex: 'speciality',
            key: 'speciality',
            sorter: (a, b) => collator.compare(a.speciality, b.speciality) ,
            render: text=><Tag color="green" key={text}>
            {text}
          </Tag>
        },
    ]

    let dispatch = useAppDispatch()

    const data:DataTypeIE[] = []
    const clanData:ClanColumnsIE[] = []

    let users = useAppSelector((state:RootAdminState)=>getEmployers(state))
    let clansData = useAppSelector((state:RootAdminState)=>getClans(state))
    if (users.length == 0){
        adminFetcher.get("users/").then((response)=>{
            dispatch(setEmployers(response.data.map(((user:any)=>({
                name: user.name, 
                wallet: user.wallet_public_key,
                telegramID: user.telegram,
                command: user.command,
                role: user.type,
                respect: user.respect,
                balance: user.salary,
                jobTittle: user.department,
            }) as EmployerIE ))))
        })
        adminFetcher.get("season/clans/").then((response:any)=>{
            dispatch(setClans(
                response.data.map((clan:any)=>({
                    name: clan.name,
                    users: clan.users.map(((user:any)=>({
                    name: user.name, 
                    wallet: user.wallet_public_key,
                    telegramID: user.telegram,
                    command: user.command,
                    role: user.type,
                    respect: user.respect,
                    balance: user.salary,
                    jobTittle: user.department,
                    }) ))
                } as ClanIE))
                ))
        })
    }
    if (users.length > 0){
        users.forEach((user)=>{
            data.push(
                {
                    name: user.name,
                    balance: user.balance,
                    command: user.command,
                    speciality: user.jobTittle,
                    key: user.telegramID,
                    telegram: user.telegramID,
                    respect: user.respect,
                } as DataTypeIE
            )
        })
        clansData.forEach((clan)=>{
            clanData.push({
                key:clan.name,
                name:clan.name,
                tg: clan.name,
                members:clan.users.length
            } as ClanColumnsIE)
        })
    }

    return(
        <div className='userTable'>
            <Header links={[
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
 
                    ]}
                name={user.name}></Header>
            <div className='changeProductCard'>
                <div className="addProductH1">Участники VTB Games</div>
                <div className='btnWrapper'>
                    <Button onClick={()=>setclans(false)} className={clans? "btn1":"btn2"}>Пользователи</Button>

                    <Button onClick={()=>setclans(true)} className={clans? "btn2":"btn1"}>Кланы</Button>

                    <Button onClick={()=>navigator("add/")}  className='btn1'>Новый пользователь</Button>
                    <Button onClick={()=>adminFetcher.post("season/")}  className='btn1'>Начать сезон</Button>
                </div>
                {
                    clans? <Table columns={clanColums} dataSource={clanData} />:<Table columns={columns} dataSource={data} />
                }
                
            </div>
        </div>
    );
}