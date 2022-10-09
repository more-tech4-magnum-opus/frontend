import { Tag } from 'antd';
import react from 'react'
import { PrevMarketCard } from '../../components/prevMarketCard';
import { UserPreview } from '../../components/userPreview';
import header from '../header'

import './style.css';

export const Marketplace: react.FC = () => {
    return <div>
        {header}
        <div className="centered">
            <div className="mp-container">
                <div className="mp-previev">
                    <UserPreview 
                        level={3}
                        username="Vladimir"
                        score={"100 / 800"}
                        rubles={'100'}
                        fio={"Vladimir Dubrovin"}
                        id={32}
                        tags={[<Tag color="cyan">Designer</Tag>]}
                        tg={"vladimir_dubrovin"}
                        description="Долгое описание"
                        logo_url='/logo_example.png'
                    />
                </div>
                <div className="mp-content">
                    <PrevMarketCard 
                        cost={100}
                        name="Кружка"
                        image='/cup.png'
                        descr='Долгое описание'
                    />
                    <PrevMarketCard 
                        cost={100}
                        name="Кружка"
                        image='/cup.png'
                        descr='Долгое описание'
                    />
                    <PrevMarketCard 
                        cost={100}
                        name="Кружка"
                        image='/cup.png'
                        descr='Долгое описание'
                    />
                </div>
            </div>
        </div>
    </div>
}