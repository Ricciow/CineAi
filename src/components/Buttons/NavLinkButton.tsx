import { NavLink } from "react-router-dom";

type NavLinkButtonProps = {
    to: string
    type?: 'header' | 'sidebar'
    iconClass?: string
    text?: string
    end?: boolean
}

export default function NavLinkButton({ to, type, iconClass, text, end }: NavLinkButtonProps) {
    return (
        <NavLink 
            end={end}
            to={to}
            className={({ isActive }) => isActive ? `${type}_link active` : `${type}_link`}
        >
            {iconClass &&<i className={iconClass}></i>}
            {text && <p>{text}</p>}
        </NavLink>
    )
}