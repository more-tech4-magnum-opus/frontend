import "./Header.css"
import React from "react"
import { Link, useLocation, useParams } from "react-router-dom"

interface HeaderIE{
    links: {
        link:string,
        name:string
    }[],
    name:string
}

export const Header:React.FC<HeaderIE> = (props) =>{
    let location = useLocation()
    const onClick = () =>{
   
    }


    return(
        <header className="header">
            <img src="/logo.svg" className="logo"></img>
            <div className="links">
                {   
                    props.links.map(link=><div 
                            className={location.pathname.split("/").pop() == link.link.split('/').pop()? "activeLink":"link"}>
                                <Link to={link.link}>{link.name}</Link>
                            </div>)
                }
            </div>
            <div className="userInfo">
                <div>{props.name}</div>
                <img onClick={()=>onClick()} src="/logout.svg"></img>
            </div>
        </header>
    );
}
