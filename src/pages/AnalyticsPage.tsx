import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import authenticatedFetch from "../api/authenticatedFetch";
import Spinner from "../components/Outros/Spinner";
import GenericHeader from "../components/projetos/GenericHeader";
import "../styles/pages/ProjetosPage.css";

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
                                    <div style={{ padding: '24px', background: 'var(--secondary-color)', borderRadius: '24px', border: '1px solid var(--midway-color)', color: 'var(--text-white)' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '1px solid var(--midway-color)', textAlign: 'left' }}>
                                                    <th style={{ padding: '16px', color: 'var(--text-light-gray)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Variante</th>
                                                    <th style={{ padding: '16px', color: 'var(--text-light-gray)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Elemento</th>
                                                    <th style={{ padding: '16px', color: 'var(--text-light-gray)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Cliques</th>
                                                    <th style={{ padding: '16px', color: 'var(--text-light-gray)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>Emails Relacionados</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.stats.map((stat, index) => (
                                                    <tr 
                                                        key={index} 
                                                        style={{ 
                                                            borderBottom: '1px solid var(--primary-color)', 
                                                            transition: 'background-color 0.2s ease-in-out' 
                                                        }} 
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)'} 
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <td style={{ padding: '20px 16px' }}>
                                                            <span style={{ background: 'var(--midway-color)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.05)' }}>{stat._id.variant}</span>
                                                        </td>
                                                        <td style={{ padding: '20px 16px' }}><code style={{ background: 'rgba(0,0,0,0.2)', padding: '4px 8px', borderRadius: '6px', color: 'var(--bright-purple-button-color)', fontSize: '0.9rem' }}>{stat._id.elementId}</code></td>
                                                        <td style={{ padding: '20px 16px', fontWeight: 'bold', color: 'var(--purple-button-color)', fontSize: '1.2rem' }}>{stat.count}</td>
                                                        <td style={{ padding: '20px 16px' }}>
                                                            {stat.emails.length > 0 ? (
                                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                                    {stat.emails.map((email, eIdx) => (
                                                                        <span key={eIdx} style={{ background: 'var(--primary-color)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', border: '1px solid var(--midway-color)', color: 'var(--text-light-gray)' }}>{email}</span>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.6 }}>Nenhum email</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {data.stats.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} style={{ padding: '48px', textAlign: 'center', color: 'var(--text-light-gray)' }}>
                                                            <i className="fi fi-rr-search-alt" style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem', opacity: 0.5 }}></i>
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
