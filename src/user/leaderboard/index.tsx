import react from 'react'
import header from '../header'
import './style.css';


interface IClan{
    place: number;
}

const ClanLeaderboard: react.FC<IClan> = (props) =>{
    return <div>
        <div className="clan-leader__content">
            <img src="/clan-logo.png" alt="" className="clan-image" />
            <div className="clan-info">
                <div className="clan-place">
                    Место клана: {props.place} / 45
                </div>
                <div className="clan-names">Skull & Bones</div>
            </div>
            <div className="container">
                <div className="score-clan">
                    Score клана:
                    <img src="/Respect.svg" alt="" width={10} />
                    {3600 - 200 * props.place}
                </div>
            </div>
        </div>
    </div>
}


export const Leaderboard: react.FC = () => {
    return <div>
        {header}
        <div className="centered">
            <div className="leaderboard-container">
                <div className="leaderboard-title">
                    Лидерборд кланов
                </div>
                <ClanLeaderboard place={1} />
                <ClanLeaderboard place={2} />
                <ClanLeaderboard place={3} />
            </div>
        </div>
    </div>
}