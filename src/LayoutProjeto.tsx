import { useState } from "react";
import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import ProjetoHeader from "./components/projetos/ProjetoHeader";
import ProjetoSidebar from "./components/projetos/ProjetoSidebar";

export function projetoLoader({ params }: LoaderFunctionArgs) {
    return {
        projeto: params.projeto
    }
}

export default function LayoutProjeto() {
    const { projeto } = useLoaderData();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={`layout ${isSidebarOpen ? 'sidebar_open' : ''}`}>
            <ProjetoHeader toggleSidebar={toggleSidebar} />
            <ProjetoSidebar projeto={projeto} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="layout_content">
                <Outlet />
            </main>
            {isSidebarOpen && <div className="sidebar_overlay" onClick={toggleSidebar}></div>}
        </div>
    )
}