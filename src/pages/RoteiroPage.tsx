import { useState } from "react";
import Button from "../components/Buttons/Button";
import ChatCard, { type ChatCardProps } from "../components/Card/ChatCard";
import ProjetoTitle from "../components/projetos/ProjetoTitle";

export default function RoteiroPage() {
    const [chats, setChats] = useState<ChatCardProps[]>([]);

    function handleCreateChat() {
        const newChat = {
            title: "Novo Chat",
            description: "Novo chat",
            id: (chats.length + 1).toString()
        }
        setChats([...chats, newChat])
    }
    
    function handleChatDelete(id: string) {
        setChats(chats.filter(chat => chat.id !== id));
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