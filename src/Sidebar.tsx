import { NavLink } from "react-router-dom";

export default function Aside() {
    return (
        <aside className="sidebar">
            <h1 className="sidebar_title">Etapas do Projeto</h1>
            <nav className="sidebar_nav">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-document"></i>
                    <p>Roteirização</p>
                </NavLink>
                <NavLink 
                    to="/movies" 
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-layout-fluid"></i>
                    <p>Esboço</p>
                </NavLink>
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-video-camera-alt"></i>
                    <p>Geração de vídeo</p>
                </NavLink>
            </nav>
        </aside>
    )
}