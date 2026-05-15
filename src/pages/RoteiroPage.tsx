import { Suspense, useEffect, useState } from "react";
import Button from "../components/Buttons/Button";
import { type ChatCardProps } from "../components/Card/ChatCard";
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import ChatList from "../components/chat/ChatList";
import Spinner from "../components/Outros/Spinner";
import { useAuth } from "../components/Auth/AuthProvider";
import authenticatedFetch from "../api/authenticatedFetch";
import toast from "react-hot-toast";

async function loadChats(projectId: string) {
    const response = await authenticatedFetch(`conversation/?project_id=${projectId}`, 
        { 
            method: "GET" 
        }
    );

    if (!response.ok) {
        throw new Response("Nao foi possivel carregar os chats", { status: response.status, statusText: response.statusText });
    }

    return response.json(); 
}

export async function roteiroPageLoader({ params }: any) {
    const projectId = params.projeto;
    const chatsPromise = loadChats(projectId);

    return { chatsRequest: chatsPromise }; 
}


export default function RoteiroPage() {
    const { chatsRequest } = useLoaderData() as { chatsRequest: Promise<ChatCardProps[]>};
    const { projeto: projectId } = useParams();
    const { userId } = useAuth();
    const navigate = useNavigate();

    const [project, setProject] = useState<any>(null);
    const [loadingProject, setLoadingProject] = useState(true);

    useEffect(() => {
        if (projectId) {
            setLoadingProject(true);
            authenticatedFetch(`project/${projectId}`, { method: "GET" }).then(async res => {
                if (res.ok) {
                    const data = await res.json();
                    setProject(data);
                }
                setLoadingProject(false);
            }).catch(err => {
                console.error("Error fetching project for permissions:", err);
                setLoadingProject(false);
            });
        }
    }, [projectId, userId]);

    const getAccess = () => {
        if (!project || !userId) return { canRead: false, canCreate: false, isReady: false };
        
        const isOwner = String(project.user_id) === String(userId);
        const member = project.members?.find((m: any) => String(m.user_id) === String(userId));
        const isAdmin = isOwner || member?.role === "admin";

        return {
            canRead: isAdmin || member?.permissions?.read,
            canCreate: isAdmin || member?.permissions?.create_chats,
            isReady: true
        };
    };

    const { canRead, canCreate, isReady } = getAccess();

    async function handleCreateChat() {
        if (!canCreate) {
            toast.error("Você não tem permissão para criar chats.");
            return;
        }

        const createPromise = authenticatedFetch(`conversation/`, 
            { 
                method: "POST",
                body: { 
                    title: "Novo Chat", 
                    description: "Sem descrição",
                    project_id: projectId
                }
            }
        ).then(async res => {
            if (!res.ok) {
                if (res.status === 403) {
                    const err = await res.json();
                    throw new Error(err.detail || "Sem permissão para criar chats");
                }
                throw new Error("Não foi possível criar o chat");
            }
            return res.json();
        });

        toast.promise(createPromise, {
            loading: 'Criando chat...',
            success: (newChat) => {
                navigate(`./${newChat.id}`);
                return 'Chat criado!';
            },
            error: (err) => err.message,
        });
    }

    return (
        <div className="projeto_main">
            <div className="projeto_header">
                <ProjetoTitle title="Roteirização" description="Crie, analise e refine seu roteiro. Comece um novo chat para gerar uma história, corrija um script ou peça sugestões à IA." />
                <Button 
                    text="Novo Chat de Roteiro" 
                    style="projeto_button" 
                    iconClass="fi fi-rr-add" 
                    fileInput={false} 
                    onClick={handleCreateChat}
                    disabled={!isReady || !canCreate}
                />
            </div>

            <div className="projeto_content">
                <Suspense fallback={<Spinner message="Carregando chats..." />}>
                    <Await
                        resolve={chatsRequest}
                        errorElement={<p className="text_error">Erro ao carregar os chats.</p>}
                    >
                        {(resolvedChats: ChatCardProps[]) => {
                            if (loadingProject || !userId) {
                                return <Spinner message="Verificando permissões..." />;
                            }
                            
                            if (!canRead) {
                                return (
                                    <div className="empty_state">
                                        <div className="empty_state_icon"><i className="fi fi-rr-eye-crossed"></i></div>
                                        <h3>Acesso Restrito</h3>
                                        <p>Você não tem permissão para ler o roteiro deste projeto.</p>
                                    </div>
                                );
                            }
                            return <ChatList initialChats={resolvedChats} onCreateChat={handleCreateChat} />;
                        }}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}