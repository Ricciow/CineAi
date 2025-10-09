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

    return (
        <div className="layout">
            <ProjetoHeader />
            <ProjetoSidebar projeto={projeto} />
            <main className="layout_content">
                <Outlet />
            </main>
        </div>
    )
}