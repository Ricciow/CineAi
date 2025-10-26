import { Suspense } from "react";
import Button from "../components/Buttons/Button";
import { type ChatCardProps } from "../components/Card/ChatCard";
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import ChatList from "../components/chat/ChatList";
import Spinner from "../components/Outros/Spinner";
import { useAuth } from "../components/Auth/AuthProvider";
import { authTokenLocalStorage } from "../constants/localstorage";
import authenticatedFetch from "../api/authenticatedFetch";

async function loadChats() {
    const token = authTokenLocalStorage();
    const response = await authenticatedFetch(`conversation/`, 
        { 
            method: "GET" 
        }, 
        token
    );

    if (!response.ok) {
        throw new Response("Nao foi possivel carregar os chats", { status: response.status, statusText: response.statusText });
    }
    
    return response.json(); 
}

export async function roteiroPageLoader() {
    const chatsPromise = loadChats();

    return { chatsRequest: chatsPromise }; 
}


export default function RoteiroPage() {
    const loaderData : { chatsRequest: Promise<ChatCardProps[]>} = useLoaderData();
    const { authToken } = useAuth();
    const navigate = useNavigate();

    async function handleCreateChat() {
        const response = await authenticatedFetch(`conversation/`, 
            { 
                method: "POST",
                body: { title: "Novo Chat", description: "Sem descrição" }
            }, 
            authToken
        );

        if (!response.ok) {
            throw new Response("Nao foi possivel criar o chat", { status: response.status, statusText: response.statusText });
        }
        const newChat = await response.json();
        navigate(`./${newChat._id}`);
    }

    return (
        <div className="projeto_main">
            <div className="projeto_header">
                <ProjetoTitle title="Roteirização" description="Crie, analise e refine seu roteiro. Comece um novo chat para gerar uma história, corrija um script ou peça sugestões à IA." />
                <Button text="Novo Chat de Roteiro" style="projeto_button" iconClass="fi fi-rr-add" fileInput={false} onClick={handleCreateChat} />
            </div>
            
            <div className="projeto_content">
                <Suspense fallback={<Spinner message="Carregando chats..." />}>
                    <Await
                        resolve={loaderData.chatsRequest}
                        errorElement={<p style={{ color: 'red' }}>Erro ao carregar os chats.</p>}
                    >
                        {(resolvedChats: ChatCardProps[]) => (
                            <ChatList initialChats={resolvedChats} />
                        )}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}