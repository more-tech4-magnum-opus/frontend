import react from 'react'
import { Game } from '../../components/game'
import header from '../header'

import './style.css'

export const ClanWar: react.FC = () => {
    return <div>
            {header}
            <div className="centered">
                <div className="clanwar-content">
                    <img src="/clanwarlogo.png" alt="" style={{transform: 'scale(0.7)'}} />
                    <div className="map">
                    <div className="blueteam-pos">
                        <div className="blueteam">
                            <div className="blueteam-info" style={{backgroundImage: 'url(/blueteamback.png)'}}>
                                <div className="positioned">
                                    <div className="center-img">
                                        <img src="/clan-logo.png" alt="" height={116}/>
                                    </div>
                                    <div className="clanwar-info">
                                        <div className="clanwar-name">Skull & Bones</div>
                                        <div className="clanwar-number">Место клана: 1 / 45</div>
                                        <div className="clanwar-score">Score клана:
                                            <img src="/Respect.svg" alt="" />
                                         4000</div>
                                    </div>
                            </div>
                            <div className="blueteamteam" style={{backgroundImage: 'url(/blueteambigboard.png)'}}>
                                <div className="bigboardpos">
                                    <div className="title">Твоя команда</div>
                                    <div className="parts">
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                        </div>    
                    </div>
                        </div>

                        <div className="redteam-pos">
                        <div className="blueteam">
                            <div className="blueteam-info" style={{backgroundImage: 'url(/redteamboard.png)'}}>
                                <div className="positioned">
                                    <div className="center-img">
                                        <img src="/redteam.png" alt="" height={116}/>
                                    </div>
                                    <div className="clanwar-info">
                                        <div className="clanwar-name">Skull & Bones</div>
                                        <div className="clanwar-number">Место клана: 1 / 45</div>
                                        <div className="clanwar-score">Score клана:
                                            <img src="/Respect.svg" alt="" />
                                         4000</div>
                                    </div>
                            </div>
                            <div className="blueteamteam" style={{backgroundImage: 'url(/redteambigboard.png)'}}>
                                <div className="bigboardpos">
                                    <div className="title title-red">Команда противников</div>
                                    <div className="parts">
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                        <div className="part">
                                            <div className="ava">
                                                <img src="/blue-team.png" alt="" />
                                            </div>
                                            <div className="war-lvl">
                                                Lvl. 8
                                            </div>
                                            <div className="war-fio">
                                                Савин Максим
                                            </div>
                                            <div className="war-f">
                                                <img src="/Respect.svg" alt="" />
                                                1300
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                        </div>    
                    </div>
                        </div>
                    </div>
                    <Game></Game>
            </div>
        </div>
    </div>
}