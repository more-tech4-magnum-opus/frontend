import { Tag } from 'antd'
import react from 'react'


interface IUserPreview{
    level: number;
    username: string;
    score: string;
    rubles: string;
    fio: string;
    id: number;
    tg: string;
    tags: react.ReactNode[];
    description: string;
    logo_url: string;
    className?: string;
}

export const UserPreview: react.FC<IUserPreview> = (props) => {
    return <div className={"self-info " + props.className}>
    <img src={props.logo_url} alt="" className="self-img" />
    <div className="information">
        <div className="stats">
            <div className="lvl">
                Lvl <span>{props.level} {props.username}</span>
                <img src="/Respect.svg" alt="" className='respect'/>
                <span>{props.score}</span>
            </div>
            <div className="rubles">
                <img src="/Rubles.svg" alt="" className="rubles-img" />
                {props.rubles}
            </div>
        </div>
        <div className="fio-id">
            <div className="id">
                Id {props.id}
            </div>
            <div className="fio">
                {props.fio}
            </div>
        </div>
        <div className="tg">
            @{props.tg}
            <img src="/eye.svg" alt="" className="eye" />
        </div>
        <div className="tags">
            {props.tags}
        </div>
        <div className="description">
            {props.description}
        </div>
    </div>
</div>
}