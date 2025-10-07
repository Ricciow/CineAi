import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header className="header">
            <h1 className="header_title">CineAI</h1>
            <i className="fi fi-rr-angle-small-right header_arrow"></i>
            <nav className="header_nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "header_link active" : "header_link"}>Home</NavLink>
                <p>/</p>
                <NavLink to="/movies" className={({ isActive }) => isActive ? "header_link active" : "header_link"}>Movies</NavLink>
                <p>/</p>
                <NavLink to="/about" className={({ isActive }) => isActive ? "header_link active" : "header_link"}>About</NavLink>
            </nav>
        </header>
    )
}