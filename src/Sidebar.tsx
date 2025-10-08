import { NavLink } from "react-router-dom";

export default function Aside({ projeto }: { projeto: string }) {
    return (
        <aside className="sidebar">
            <h1 className="sidebar_title">Etapas do Projeto</h1>
            <nav className="sidebar_nav">
                <NavLink 
                    to={`/projetos/${projeto}/roteiro`}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-document"></i>
                    <p>Roteirização</p>
                </NavLink>
                <NavLink 
                    to={`/projetos/${projeto}/esboco`}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-layout-fluid"></i>
                    <p>Esboço</p>
                </NavLink>
                <NavLink 
                    to={`/projetos/${projeto}/video`}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-video-camera-alt"></i>
                    <p>Geração de vídeo</p>
                </NavLink>
            </nav>
        </aside>
    )
}