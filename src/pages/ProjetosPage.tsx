import { Suspense, useState } from "react";
import { useLoaderData, Await, useNavigate, Link } from "react-router-dom";
import authenticatedFetch from "../api/authenticatedFetch";
import Spinner from "../components/Outros/Spinner";
import Button from "../components/Buttons/Button";
import AlertCard from "../components/Card/AlertCard";
import "../styles/pages/ProjetosPage.css";

import GenericHeader from "../components/projetos/GenericHeader";

interface Project {
    id: string;
    name: string;
    description?: string;
}

async function loadProjects(): Promise<Project[]> {
    const response = await authenticatedFetch("project/", { method: "GET" });
    if (!response.ok) {
        throw new Response("Não foi possível carregar os projetos.", { 
            status: response.status, 
            statusText: response.statusText 
        });
    }
    return response.json();
}

export async function projetosPageLoader() {
    return { projectsPromise: loadProjects() };
}

export default function ProjetosPage() {
    const { projectsPromise } = useLoaderData() as { projectsPromise: Promise<Project[]> };
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [localProjects, setLocalProjects] = useState<Project[] | null>(null);
    const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

    async function handleCreateProject() {
        if (!newProjectName.trim()) return;

        const response = await authenticatedFetch("project/", {
            method: "POST",
            body: { name: newProjectName, description: newProjectDescription }
        });

        if (response.ok) {
            const newProject = await response.json();
            navigate(`/projetos/${newProject.id}/roteiro`);
        } else {
            alert("Erro ao criar projeto.");
        }
    }

    async function confirmDeleteProject() {
        if (!projectToDelete) return;

        const response = await authenticatedFetch(`project/${projectToDelete.id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            if (localProjects) {
                setLocalProjects(localProjects.filter(p => p.id !== projectToDelete.id));
            }
            setProjectToDelete(null);
        } else {
            alert("Erro ao excluir projeto.");
            setProjectToDelete(null);
        }
    }

    return (
        <div className="layout">
            <GenericHeader />
            <main className="layout_content">
                <div className="projetos_container">
                    <header className="projetos_main_header">
                        <div className="projetos_title_group">
                            <h1 className="projetos_title">Seus Projetos</h1>
                            <p className="projetos_description">Gerencie seus roteiros e produções cinematográficas com IA.</p>
                        </div>
                        <Button 
                            text="Novo Projeto" 
                            style="projeto_button" 
                            iconClass="fi fi-rr-add" 
                            onClick={() => setIsCreating(true)} 
                        />
                    </header>

                    <div className="projetos_content_section">
                        <Suspense fallback={<div className="spinner_full_container"><Spinner message="Carregando seus projetos..." /></div>}>
                            <Await resolve={projectsPromise} errorElement={<div className="error_full_message"><i className="fi fi-rr-exclamation"></i> Ops! Não conseguimos carregar seus projetos no momento.</div>}>
                                {(projects: Project[]) => {
                                    if (!localProjects && projects) {
                                        setLocalProjects(projects);
                                    }
                                    const displayedProjects = localProjects || projects;

                                    return (
                                        <div className="projects_grid">
                                            {displayedProjects.map((project) => (
                                                <Link key={project.id} to={`/projetos/${project.id}/roteiro`} className="project_card">
                                                    <div className="project_card_icon">
                                                        <i className="fi fi-rr-film"></i>
                                                    </div>
                                                    <div className="project_card_info">
                                                        <h4>{project.name}</h4>
                                                        <p>{project.description || "Sem descrição disponível"}</p>
                                                    </div>
                                                    <button 
                                                        className="delete_project_button" 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setProjectToDelete(project);
                                                        }}
                                                        title="Excluir projeto"
                                                    >
                                                        <i className="fi fi-rr-trash"></i>
                                                    </button>
                                                    <div className="project_card_arrow">
                                                        <i className="fi fi-rr-angle-small-right"></i>
                                                    </div>
                                                </Link>
                                            ))}
                                            {displayedProjects.length === 0 && (
                                                <div className="empty_state">
                                                    <div className="empty_state_icon">
                                                        <i className="fi fi-rr-folder-open"></i>
                                                    </div>
                                                    <h3>Nenhum projeto encontrado</h3>
                                                    <p>Você ainda não tem projetos criados. Comece criando um agora!</p>
                                                    <Button text="Criar meu primeiro projeto" onClick={() => setIsCreating(true)} style="projeto_button" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                }}
                            </Await>
                        </Suspense>
                    </div>
                </div>

                {projectToDelete && (
                    <AlertCard className="chat_card_confirmation" darken>
                        <h2>{projectToDelete.name}</h2>
                        <p>Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.</p>
                        <div className="chat_card_delete">
                            <Button style="generic_button" onClick={() => setProjectToDelete(null)} text="Cancelar" fileInput={false}/>
                            <Button style="delete_button_bg" onClick={confirmDeleteProject} text="Deletar" fileInput={false}/>
                        </div>
                    </AlertCard>
                )}

                {isCreating && (
                    <div className="modal_overlay" onClick={() => setIsCreating(false)}>
                        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal_header">
                                <h3>Criar Novo Projeto</h3>
                                <button className="close_modal" onClick={() => setIsCreating(false)}>
                                    <i className="fi fi-rr-cross-small"></i>
                                </button>
                            </div>
                            <div className="modal_body">
                                <div className="input_group">
                                    <label>Nome do Projeto</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ex: O Mistério da Ilha" 
                                        value={newProjectName} 
                                        onChange={(e) => setNewProjectName(e.target.value)} 
                                        autoFocus
                                    />
                                </div>
                                <div className="input_group">
                                    <label>Descrição</label>
                                    <textarea 
                                        placeholder="Uma breve descrição sobre sua obra..." 
                                        value={newProjectDescription} 
                                        onChange={(e) => setNewProjectDescription(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="modal_footer">
                                <Button text="Cancelar" onClick={() => setIsCreating(false)} style="generic_button" />
                                <Button text="Criar Projeto" onClick={handleCreateProject} style="projeto_button" />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
