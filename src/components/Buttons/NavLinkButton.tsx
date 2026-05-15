import { NavLink } from "react-router-dom";

type NavLinkButtonProps = {
    to: string
    type?: 'header' | 'sidebar'
    iconClass?: string
    text?: string
    end?: boolean
    className?: string
}

export default function NavLinkButton({ to, type, iconClass, text, end, className }: NavLinkButtonProps) {
    return (
        <NavLink 
            end={end}
            to={to}
            className={({ isActive }) => {
                const baseClass = isActive ? `${type}_link active` : `${type}_link`;
                return className ? `${baseClass} ${className}` : baseClass;
            }}
        >
            {iconClass &&<i className={iconClass}></i>}
            {text && <p>{text}</p>}
        </NavLink>
    )
}