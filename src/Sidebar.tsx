import { NavLink } from "react-router-dom";

export default function Aside({ pathnames }: { pathnames: string[] }) {

    // Pega a parte de projetos/nomedoprojeto/
    const basepath = pathnames.slice(0, 2).join('/');

    return (
        <aside className="sidebar">
            <h1 className="sidebar_title">Etapas do Projeto</h1>
            <nav className="sidebar_nav">
                <NavLink 
                    to={basepath + "/roteirizacao"}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-document"></i>
                    <p>Roteirização</p>
                </NavLink>
                <NavLink 
                    to={basepath + "/esboco"}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-layout-fluid"></i>
                    <p>Esboço</p>
                </NavLink>
                <NavLink 
                    to={basepath + "/video"}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                >
                    <i className="fi fi-rr-video-camera-alt"></i>
                    <p>Geração de vídeo</p>
                </NavLink>
            </nav>
        </aside>
    )
}