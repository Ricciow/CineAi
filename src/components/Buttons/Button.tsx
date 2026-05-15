import ArquivoButton from "./ArquivoButton"
import ArquivoInputButton from "./ArquivoInputButton"
import type { ButtonProps } from "./ButtonProps"
import NavLinkButton from "./NavLinkButton"

export default function Button(props : ButtonProps) {
    if(props.file) {
        return <ArquivoButton 
            arquivo={props.file} 
            onClick={props.onClick} 
            onDelete={props.onDelete} 
            style={props.style}
        />
    }
    if(props.to) {
        return <NavLinkButton 
            to={props.to} 
            type={props.type} 
            iconClass={props.iconClass} 
            text={props.text}
            end={props.end}
            className={props.className || props.style}
        />
    }
    if(props.fileInput) {
        return <ArquivoInputButton 
            onChange={props.onChange} 
            style={props.style} 
            text={props.text} 
        />
    }
    if(props.className) {
        return (
            <button 
                className={`${props.style ? `${props.style} ${props.className}` : props.className} ${props.disabled ? 'disabled' : ''}`}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.iconClass &&<i className={props.iconClass}></i>}
                {props.text && <p>{props.text}</p>}
            </button>
        )
    }
    return (
        <button 
            className={`${props.style} ${props.disabled ? 'disabled' : ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.iconClass &&<i className={props.iconClass}></i>}
            {props.text && <p>{props.text}</p>}
        </button>
    )
}