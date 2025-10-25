import { Suspense } from "react";
import Button from "../components/Buttons/Button";
import { type ChatCardProps } from "../components/Card/ChatCard";
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { BackendUrl } from "../constants/env";
import ChatList from "../components/chat/ChatList";
import Spinner from "../components/Outros/Spinner";

async function loadChats() {
    const response = await fetch(`${BackendUrl}/conversation/`);

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
    const loaderData = useLoaderData() as { chatsRequest: Promise<ChatCardProps[]> };
    const navigate = useNavigate();

    async function handleCreateChat() {
        const response = await fetch(`${BackendUrl}/conversation/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Novo Chat", description: "Sem descrição" })
        });
        if (!response.ok) {
            throw new Response("Nao foi possivel criar o chat", { status: response.status, statusText: response.statusText });
        }
        const newChat = await response.json();
        navigate(`./${newChat.id}`);
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