import { useState } from "react";
import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import ProjetoHeader from "./components/projetos/ProjetoHeader";
import ProjetoSidebar from "./components/projetos/ProjetoSidebar";
import authenticatedFetch from "./api/authenticatedFetch";

export async function projetoLoader({ params }: LoaderFunctionArgs) {
    const response = await authenticatedFetch(`project/${params.projeto}`, { method: "GET" });
    if (!response.ok) {
        throw new Response("Projeto não encontrado", { status: 404 });
    }
    const project = await response.json();
    return {
        projeto: params.projeto,
        projectName: project.name
    }
}

export default function LayoutProjeto() {
    const { projeto, projectName } = useLoaderData() as { projeto: string, projectName: string };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className={`layout ${isSidebarOpen ? 'sidebar_open' : ''}`}>
            <ProjetoHeader toggleSidebar={toggleSidebar} projectName={projectName} />
            <ProjetoSidebar projeto={projeto} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="layout_content">
                <Outlet />
            </main>
            {isSidebarOpen && <div className="sidebar_overlay" onClick={toggleSidebar}></div>}
        </div>
    )
}