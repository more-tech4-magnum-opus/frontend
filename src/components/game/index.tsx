import { message } from 'antd';
import react from 'react'
import './style.css'

interface IPostion{
    x: number;
    y: number;
}

const myCard = <div 
    style={
        {
            backgroundColor: "#096DD9", 
            width: "30px", 
            height: "30px", 
            borderRadius: "100px",
            border: "3px solid white"
        }}></div>

const teammeitCard = <div 
style={
    {
        backgroundColor: "#096DD9", 
        width: "30px", 
        height: "30px", 
        borderRadius: "100px",
        border: "3px solid white",
        opacity: '0.6'
    }}></div>
const enemy = <div 
style={
    {
        backgroundColor: "#D63E3E", 
        width: "30px", 
        height: "30px", 
        borderRadius: "100px",
        border: "3px solid white"
    }}></div>


const hunt = <div 
style={
    {
        backgroundColor: "#096DD9", 
        width: "40px", 
        height: "40px", 
        border: "3px solid white"
    }}></div>


const hint = <div
        style={
            {
                'backgroundColor': '#096DD9',
                'opacity': '0.4',
                width: "30px", 
                height: "30px", 
                borderRadius: "100px",
            }
        }
></div>

function choose(choices: any[]) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function checkPosition(
    position: IPostion, 
    playerCords: IPostion,
    enemiesCords: IPostion[],
    teammeitCords: IPostion[] 
) {
    if (position.x < 0 || position.x > 10) {
        return false
    }
    if (position.y < 0 || position.y > 10) {
        return false
    }
    if (position.x == playerCords.x && position.y == playerCords.y) {
        return false
    }
    for (var i = 0; i < enemiesCords.length; ++i) {
        if (position.x == enemiesCords[i].x && position.y == enemiesCords[i].y){
            return false
        }
    }
    for (var i = 0; i < teammeitCords.length; ++i) {
        if (position.x == teammeitCords[i].x && position.y == teammeitCords[i].y){
            return false
        }
    }
    return true;
}

const hunt_position = {x: 6, y: 9}

function getAvailableMoveCords(
    playerCords: IPostion, 
    enemiesCords: IPostion[], 
    teammeitCords: IPostion[], 
    myCords: IPostion) {
        var hintPositions:IPostion[] = [];
        if (checkPosition(
            {x: myCords.x, y: myCords.y+1},
            playerCords,
            enemiesCords,
            teammeitCords
        )){
            hintPositions.push({x: myCords.x, y: myCords.y+1})
        }
        if (checkPosition(
            {x: myCords.x+1, y: myCords.y},
            playerCords,
            enemiesCords,
            teammeitCords
        )){
            hintPositions.push({x: myCords.x+1, y: myCords.y})
        }
        if (checkPosition(
            {x: myCords.x, y: myCords.y-1},
            playerCords,
            enemiesCords,
            teammeitCords
        )){
            hintPositions.push({x: myCords.x, y: myCords.y-1})
        }
        if (checkPosition(
            {x: myCords.x-1, y: myCords.y},
            playerCords,
            enemiesCords,
            teammeitCords
        )){
            hintPositions.push({x: myCords.x-1, y: myCords.y})
        }
        return hintPositions
}

export const Game: react.FC = () => {
    const [huntVisible, setHuntVisible] = react.useState<boolean>(false);
    const [position, setPosition] = react.useState<IPostion>({x: 2, y: 4});
    const [hints, hintsPosition] = react.useState<IPostion[]>([]);
    const [visibleHints, setVisibleHints] = react.useState<boolean>(false);
    const [mousePosition, setMousePosition] = react.useState<IPostion>(
        {x: 0, y: 0},
        
    );
    const [buttonDown, setButtonDown] = react.useState<boolean>(false);
    const [enemies, setEnemiesPos] = react.useState<IPostion[]>([{x: 4, y: 2},
        {x: 3, y: 6},
        {x: 5, y: 6},
        {x: 9, y: 1},
        {x: 6, y: 8}]);
    const [teammeits, setTeammeits] = react.useState<IPostion[]>([
        {x: 8, y: 2},
        {x: 0, y: 3},
        {x: 4, y: 1},
        {x: 1, y: 9}
    ])
    if ((position.x == hunt_position.x && position.y == hunt_position.y) && huntVisible == false) {
        setHuntVisible(true);
        message.success("Вы нашли клетку!!")
    }
    if (!hints.length) {
        hintsPosition(getAvailableMoveCords(
            position,
            enemies,
            teammeits,
            position
        ));
        var clonedEnemies = enemies;
        var clonedEnemies = clonedEnemies.map((e) => choose(getAvailableMoveCords(
            position,
            enemies,
            teammeits,
            e
        )) as IPostion);
        var clonedTeammeits = teammeits.map((e) => choose(getAvailableMoveCords(
            position,
            enemies,
            teammeits,
            e
        )) as IPostion);
        setTeammeits(clonedTeammeits);
        setEnemiesPos(clonedEnemies);
        clonedEnemies.map((e) => {
            if (e.x == hunt_position.x && e.y == hunt_position.y) {
                setHuntVisible(true);
                message.error("Соперники нашли клетку!!")
            }
        })
        clonedTeammeits.map((e) => {
            if (e.x == hunt_position.x && e.y == hunt_position.y) {
                setHuntVisible(true);
                message.info("Тиммейты нашли клетку!!")
            }
        })
    }
    window.onmousemove = (event) => {
        setMousePosition({x: event.clientX, y: event.clientY})
    }
    window.onmouseup = () => {
        setVisibleHints(false);
        hintsPosition([]);
    }
    window.onmousedown = () => {
        setButtonDown(true);
    }
    window.onmouseup = () => {
        setButtonDown(false);
    }
    const yd = 51.7;
    const xd = 51.1;
    return <> <div className="map-map" style={{backgroundImage: 'url("/Game Board.png")'}}>
        <div className="map-positioned">
        {   huntVisible ?
                <div style={{
                    transform: `translateX(${hunt_position.x*xd}px) translateY(${hunt_position.y*yd}px)`,
                    position: 'absolute'
                }}>
                    {hunt}
                </div> : <></>
            }
            {
                !visibleHints ? 
                <div tabIndex={-1} className="" style={{
                    transform: 
                    !visibleHints ?
                    `translateX(${position.x*xd}px) translateY(${position.y*yd}px)` :
                    `translateX(${0}px) translateY(${0}px)`,
                    position: 'fixed'
                }} onMouseDown={() => {
                    setVisibleHints(true);
                }} onMouseUp={() => {
                    setVisibleHints(false);
                }}>{myCard}</div> : <></>
            }
            
            {
                visibleHints ?
                hints.map((e) => {
                    return <div tabIndex={-1}
                    style={{
                        transform: `translateX(${e.x*xd}px) translateY(${e.y*yd}px)`,
                        position: 'absolute'
                    }}
                    onMouseOver={(event) => {
                        if (!buttonDown){
                            setVisibleHints(false);
                            hintsPosition([]);
                            setPosition(e);
                        }
                    }}
                    >{hint}</div>
                }) : <div></div>
            }
            {
                enemies.map((e) => {
                    return <div style={{
                        transform: `translateX(${e.x*xd}px) translateY(${e.y*yd}px)`,
                        position: 'absolute'
                    }}>
                        {enemy}
                    </div>
                })
            }
            {
                teammeits.map((e) => {
                    return <div style={{
                        transform: `translateX(${e.x*xd}px) translateY(${e.y*yd}px)`,
                        position: 'absolute'
                    }}>
                        {teammeitCard}
                    </div>
                })
            }

        </div>
    </div>
    {
        visibleHints ?
        <div style={{
            position: 'absolute',
            left: mousePosition.x,
            top: mousePosition.y,
        }}>{myCard}</div> : 
        <></>
    } 
    </>
}