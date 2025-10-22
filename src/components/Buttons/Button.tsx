import ArquivoButton from "./ArquivoButton"
import ArquivoInputButton from "./ArquivoInputButton"
import type { ButtonProps } from "./ButtonProps"
import NavLinkButton from "./NavLinkButton"

/**
 * Componente de botão genérico
 * 
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 * 
 * Se ```props.file``` for verdadeiro, retorna um componente ```ArquivoButton```
 * 
 * Se ```props.to``` for verdadeiro, retorna um componente ```NavLinkButton```
 * 
 * Se ```props.fileInput``` for verdadeiro, retorna um componente ```ArquivoInputButton```
 * 
 * Caso contrário, retorna um botão padrão
 */
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
    if(props.className) {
        return (
            <button 
                className={props.className}
                onClick={props.onClick}
            >
                {props.iconClass &&<i className={props.iconClass}></i>}
                {props.text && <p>{props.text}</p>}
            </button>
        )
    }
    return (
        <button 
            className={props.style}
            onClick={props.onClick}
        >
            {props.iconClass &&<i className={props.iconClass}></i>}
            {props.text && <p>{props.text}</p>}
        </button>
    )
}