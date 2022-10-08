import "./adminClans.css"
import { Button, Space, Table, Tag } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { getClanByName, getEmployers } from "../../app/admin/adminSlice";
import { useAppSelector } from "../../app/hooks";
import type { ColumnsType } from 'antd/es/table';
import { RootAdminState } from "../../app/adminStore";


interface DataTypeIE{
    key:string,
    name:string, 
    telegram:string,
    respect:number,
    balance:number,
    speciality: string,
}


export const AdminClans:React.FC = () =>{
    let {name} = useParams()
    let clan = useAppSelector((state)=>getClanByName(state, name as string))
    let navigator = useNavigate()
    const collator = new Intl.Collator('ru');
    let users = useAppSelector((state:RootAdminState)=>getEmployers(state))
    const data:DataTypeIE[] = []

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
        
    }
    return(
        <div className="userTable">
            <div className="changeProductCard">
                <div className="addProductH1">Участники клана {name}</div>
                <Table columns={columns} dataSource={data} />
                <Button onClick={()=>navigator("/admin/users")}  className="btn2">Назад</Button>
            </div>
        </div>
    );
}