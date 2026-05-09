import { useState } from "react";
import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import ProjetoHeader from "./components/projetos/ProjetoHeader";
import ProjetoSidebar from "./components/projetos/ProjetoSidebar";
import authenticatedFetch from "./api/authenticatedFetch";
import { useAuth } from "./components/Auth/AuthProvider";

export async function projetoLoader({ params }: LoaderFunctionArgs) {
    const response = await authenticatedFetch(`project/${params.projeto}`, { method: "GET" });
    if (!response.ok) {
        throw new Response("Projeto não encontrado", { status: 404 });
    }
    const project = await response.json();
    return {
        projeto: params.projeto,
        project
    }
}

export default function LayoutProjeto() {
    const { projeto, project } = useLoaderData() as { projeto: string, project: any };
    const { userId } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chatName, setChatName] = useState<string | undefined>(undefined);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const isOwner = project?.user_id && userId ? String(project.user_id) === String(userId) : false;
    const isAdmin = isOwner || (project?.members?.some((m: any) => String(m.user_id) === String(userId) && m.role === "admin") ?? false);

    return (
        <div className={`layout ${isSidebarOpen ? 'sidebar_open' : ''}`}>
            <ProjetoHeader toggleSidebar={toggleSidebar} projectName={project.name} chatName={chatName} />
            <ProjetoSidebar projeto={projeto} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isAdmin={isAdmin} />
            <main className="layout_content">
                <Outlet context={{ setChatName }} />
            </main>
            {isSidebarOpen && <div className="sidebar_overlay" onClick={toggleSidebar}></div>}
        </div>
    )
}