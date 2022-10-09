import { Tag } from 'antd';
import react from 'react'
import { Button } from '../../components/button';
import { UserPreview } from '../../components/userPreview';
import header from '../header'

import './style.css';

export const Clan: react.FC = () => {
    return <div>
        {header}
        <div className="centered">
            <div className="content-clans">
                <div className="clan-content">
                    <div className="clan-header">
                        <img src="/clan-logo.png" alt="" />
                        <div className="clan-info">
                            <div className="clan-stats">
                                <div className="clan-number">
                                    Место клана 1 / 45
                                </div>
                                <div className="clan-score">
                                    Score клана
                                    <img src="/Respect.svg" alt="" />
                                    400
                                </div>
                            </div>
                            <div className="clan-name">
                                Skull & Bones
                            </div>
                            <div className="tg-chat">
                                @Tg_chat
                            </div>
                        </div>
                    </div>
                    <div className="clan-parts">
                        <div className="clan-parts__content">
                            <div className="clan-parts__header">
                                <Button 
                                    disabled={true} 
                                    className={''}
                                    children={<span>Участники клана Skull & Bones </span>} 
                                />
                            </div>
                            <UserPreview 
                                level={7}
                                username={"CockMasturbator"}
                                score={"10000 / 30000"}
                                rubles={'1000'}
                                fio={"Cock masturbator 3000"}
                                id={69}
                                tg={"CockMast"}
                                tags={[<Tag color={"gold"}>Programmer</Tag>]}
                                logo_url={"/logo_example.png"}
                                description={"description"}
                                className={'no-padding'}
                            />
                            <UserPreview 
                                level={7}
                                username={"CockMasturbator"}
                                score={"10000 / 30000"}
                                rubles={'1000'}
                                fio={"Cock masturbator 3000"}
                                id={69}
                                tg={"CockMast"}
                                tags={[<Tag color={"gold"}>Programmer</Tag>]}
                                logo_url={"/logo_example.png"}
                                description={"description"}
                                className={'no-padding'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}