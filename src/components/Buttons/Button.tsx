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
        />
    }
    if(props.fileInput) {
        return <ArquivoInputButton 
            onChange={props.onChange} 
            style={props.style} 
            text={props.text} 
        />
    }
    return (
        <button 
            className={props.style}
            onClick={props.onClick}
        >
            <i className={props.iconClass}></i>
            <p>{props.text}</p>
        </button>
    )
}