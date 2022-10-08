import react from 'react'
import { Header } from '../../components/Header'
import './style.css'
import { Tag } from 'antd'
import { Button } from '../../components/button'
import { UserPreview } from '../../components/userPreview'
import header from "../header"

export const UserLk: react.FC = () => {
    return <div>
        {header}
        <div className="centered">
            <div className="block">
            <div className="content">
                <UserPreview 
                    level={3}
                    logo_url='/logo_example.png'
                    username='BrainBreaker'
                    rubles='100'
                    fio='Vladimir Dubrovin'
                    id={123}
                    tg={'dubrovin_vladimir'}
                    tags={[<Tag color={'blue'}>Designer</Tag>]}
                    description={"Очень долгое описание"}
                    score={"700 / 800"}
                />
                
            </div>
            <div className="events">
                    <div className="header-events">
                        <div className="buttons">
                            <Button className='' disabled={false} children={<span>Все события</span>} />
                            <div className="sep"></div>
                            <Button className='' disabled={true} children={<span>Участвую</span>} />
                        </div>
                    </div>
                    <div className="content-events">
                        <div className="event">
                            <img src="/event-image.png" alt="" className="event-photo" />
                            <div className="gift">
                                <span className="title-gift">Награда</span>
                                <div className="gift-content">
                                    <img src="/Respect.svg" alt="" />
                                    260
                                </div>
                            </div>
                            <div className="content-header">MEETUP «творческий рост 4.0»</div>
                            <div className="descr">Посидим, поговорим о творчестве. Ведь Люди...</div>
                            <div className="participants">
                                <div className="par-title">Кол-во участников</div>
                                <div className="participant-content">28/35</div>
                            </div>
                            
                            <Button 
                                disabled={false} 
                                children={<span>Присоединиться</span>} 
                                className='grad-button' 
                            />
                        </div>
                        <div className="event">
                            <img src="/event-image.png" alt="" className="event-photo" />
                            <div className="gift">
                                <span className="title-gift">Награда</span>
                                <div className="gift-content">
                                    <img src="/Respect.svg" alt="" />
                                    260
                                </div>
                            </div>
                            <div className="content-header">MEETUP «творческий рост 4.0»</div>
                            <div className="descr">Посидим, поговорим о творчестве. Ведь Люди...</div>
                            <div className="participants">
                                <div className="par-title">Кол-во участников</div>
                                <div className="participant-content">28/35</div>
                            </div>
                            
                            <Button 
                                disabled={false} 
                                children={<span>Присоединиться</span>} 
                                className='grad-button' 
                            />
                        </div>
                        <div className="event">
                            <img src="/event-image.png" alt="" className="event-photo" />
                            <div className="gift">
                                <span className="title-gift">Награда</span>
                                <div className="gift-content">
                                    <img src="/Respect.svg" alt="" />
                                    260
                                </div>
                            </div>
                            <div className="content-header">MEETUP «творческий рост 4.0»</div>
                            <div className="descr">Посидим, поговорим о творчестве. Ведь Люди...</div>
                            <div className="participants">
                                <div className="par-title">Кол-во участников</div>
                                <div className="participant-content">28/35</div>
                            </div>
                            
                            <Button 
                                disabled={false} 
                                children={<span>Присоединиться</span>} 
                                className='grad-button' 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
}