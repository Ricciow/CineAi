import { Outlet, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export function projetoLoader({ params }: LoaderFunctionArgs) {
    return {
        projeto: params.projeto
    }
}

export default function LayoutProjeto() {
    const { projeto } = useLoaderData();

    return (
        <div className="layout">
            <Header />
            <Sidebar projeto={projeto} />
            <div className="layout_content">
                <Outlet />
            </div>
        </div>
    )
}