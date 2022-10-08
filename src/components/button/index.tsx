import react from 'react'
import './style.css'

interface IEButton{
    className: string;
    disabled: boolean;
    children?: react.ReactNode;
}

export const Button: react.FC<IEButton> = (props) => {
    var classes = ['my-button', props.className];
    if (props.disabled) classes.push('disabled')
    return <button className={classes.join(' ')}>
        {props.children}
    </button>
}