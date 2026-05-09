import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import authenticatedFetch from "../api/authenticatedFetch";
import Spinner from "../components/Outros/Spinner";
import GenericHeader from "../components/projetos/GenericHeader";
import "../styles/pages/ProjetosPage.css";
import "../styles/pages/AnalyticsPage.css";

interface AnalyticsStat {
    _id: {
        variant: string;
        elementId: string;
    };
    count: number;
    emails: string[];
}

interface AnalyticsResponse {
    stats: AnalyticsStat[];
}

async function loadAnalytics(): Promise<AnalyticsResponse> {
    const response = await authenticatedFetch("analytics/stats", { method: "GET" });
    if (!response.ok) {
        throw new Response("Não foi possível carregar os dados de analytics.", { 
            status: response.status, 
            statusText: response.statusText 
        });
    }
    return response.json();
}

export async function analyticsPageLoader() {
    return { analyticsPromise: loadAnalytics() };
}

export default function AnalyticsPage() {
    const { analyticsPromise } = useLoaderData() as { analyticsPromise: Promise<AnalyticsResponse> };

    return (
        <div className="layout">
            <GenericHeader />
            <main className="layout_content">
                <div className="projetos_container">
                    <header className="projetos_main_header">
                        <div className="projetos_title_group">
                            <h1 className="projetos_title">Analytics</h1>
                            <p className="projetos_description">Dados de engajamento e conversão por variante.</p>
                        </div>
                    </header>

                    <div className="projetos_content_section">
                        <Suspense fallback={<div className="spinner_full_container"><Spinner message="Carregando analytics..." /></div>}>
                            <Await resolve={analyticsPromise} errorElement={<div className="error_full_message"><i className="fi fi-rr-exclamation"></i> Erro ao carregar analytics.</div>}>
                                {(data: AnalyticsResponse) => (
                                    <div className="analytics_table_container">
                                        <table className="analytics_table">
                                            <thead>
                                                <tr>
                                                    <th>Variante</th>
                                                    <th>Elemento</th>
                                                    <th>Cliques</th>
                                                    <th>Emails Relacionados</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.stats.map((stat, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <span className="variant_badge">{stat._id.variant}</span>
                                                        </td>
                                                        <td><code className="element_id_code">{stat._id.elementId}</code></td>
                                                        <td className="cliques_count">{stat.count}</td>
                                                        <td>
                                                            {stat.emails.length > 0 ? (
                                                                <div className="emails_list">
                                                                    {stat.emails.map((email, eIdx) => (
                                                                        <span key={eIdx} className="email_badge">{email}</span>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <span className="no_emails_text">Nenhum email</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {data.stats.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} className="no_data_cell">
                                                            <i className="fi fi-rr-search-alt no_data_icon"></i>
                                                            Nenhum dado de analytics encontrado.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </Await>
                        </Suspense>
                    </div>
                </div>
            </main>
        </div>
    );
}
