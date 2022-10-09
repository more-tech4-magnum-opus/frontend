import { Tag } from "antd";
import React from "react";
import { hrFetcher, useAppSelector, useHRDispatch, useHRSelector } from "../app/hooks";
import { getEvents, getMe, setEvents, setMe } from "../app/hr/hrSlice";
import { RootHRState } from "../app/hrStore";
import { EventIE, HRIE } from "../app/interfaces";
import { Header } from "../components/Header";
import { UserPreview } from "../components/userPreview";
import { EventCard } from "./EventCard";


export const HR:React.FC = () =>{
    let me = useHRSelector((state:RootHRState)=>getMe(state))
    let dispatch = useHRDispatch()
    let events = useHRSelector((state:RootHRState)=>getEvents(state))

    
    if (me.telegram == undefined){
        hrFetcher.get("users/self/").then(response=>{
            dispatch(setMe({
                wallet: response.data.wallet_public_key,
                role: response.data.type,
                telegram: response.data.telegram,
                command: response.data.command,
                respect: response.data.respect,
                balance: response.data.money,
                name: response.data.name
            } as HRIE))
        })
        hrFetcher.get("events/").then(resp=>{
            dispatch(setEvents(resp.data.map((response:any)=>({
                name: response.name,
                about: response.about,
                slug: response.slug,
                creator: {
                    wallet: "",
                    role: response.creator.type,
                    telegram: response.creator.telegram,
                    command: response.creator.command,
                    respect: response.creator.respect,
                    balance: response.creator.money,
                    name: response.creator.name
                } as HRIE,
                starts: response.starts,
                image: response.image,
                planning: Number(response.planning),
                attended: Number(response.attended)
            } as EventIE))))
        })
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
        <div className="userPreview">
            <UserPreview
                level={3}
                logo_url='/logo_example.png'
                username='BrainBreaker'
                rubles={Number(me.balance).toString()}
                fio={me.name}
                id={me.command}
                tg={me.telegram}
                tags={[<Tag color={'blue'}>HR</Tag>]}
                description={"Sample"}
                score={Number(me.respect).toString()}
            ></UserPreview>
        </div>
        <div className="marketCard">
            <div className="addProductH1">Доступные события</div>
            <div className="productWrapper">
                {
                    events.map(event=><EventCard
                            image={event.image}
                            cost={5}
                            descr={event.about}
                            name={event.name}
                            members={event.planning}
                            slug={event.slug}
                    ></EventCard>)
                }
            </div>
        </div>
    </div>
    )
}