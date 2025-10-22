import { useState } from "react";
import Button from "../components/Buttons/Button";
import ChatCard, { type ChatCardProps } from "../components/Card/ChatCard";
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BackendUrl } from "../constants/env";

export async function roteiroPageLoader() {
    // const projeto = params.projeto

    const response = await fetch(`${BackendUrl}/conversation`)

    if(!response.ok) {
        throw new Response("Nao foi possivel carregar os chats", { status: response.status, statusText: response.statusText })
    }

    const data: ChatCardProps[] = await response.json();

    return { chatsRequest: data }
}

export default function RoteiroPage() {
    const { chatsRequest } : { chatsRequest: ChatCardProps[]}= useLoaderData();

    const [chats, setChats] = useState<ChatCardProps[]>(chatsRequest);

    const navigate = useNavigate();

    async function handleCreateChat() {

        const response = await fetch(`${BackendUrl}/conversation`, 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title: "Novo Chat", description: "Sem descrição"})
            });

        if(!response.ok) {
            throw new Response("Nao foi possivel criar o chat", { status: response.status, statusText: response.statusText })
        }

        const newChat = await response.json();

        navigate(`./${newChat.id}`, );

        setChats([...chats, newChat])
    }
    
    async function handleChatDelete(id: string) {
        const chatsBackup = [...chats];
        setChats(chats.filter(chat => chat.id !== id));

        const response = await fetch(`${BackendUrl}/conversation/${id}`, {method: "DELETE"})

        if(!response.ok) {
            setChats(chatsBackup);
        }
    }

    return (
        <div className="projeto_main">
            <div className="projeto_header">
                <ProjetoTitle title="Roteirização" description="Crie, analise e refine seu roteiro. Comece um novo chat para gerar uma história, corrija um script ou peça sugestões à IA."/>
                <Button text="Novo Chat de Roteiro" style="projeto_button" iconClass="fi fi-rr-add" fileInput={false} onClick={handleCreateChat}/>
            </div>
            <div className="projeto_content">
                {chats.map((chat) => <ChatCard key={chat.id} title={chat.title} description={chat.description} id={chat.id} onDelete={handleChatDelete}/>) }
            </div>
        </div>
    )
}