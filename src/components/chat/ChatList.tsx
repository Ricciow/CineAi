import { useState } from "react";
import ChatCard, { type ChatCardProps } from "../../components/Card/ChatCard";
import { BackendUrl } from "../../constants/env";
import { useAuth } from "../Auth/AuthProvider";

export default function ChatList({ initialChats }: { initialChats: ChatCardProps[] }) {
    const [chats, setChats] = useState<ChatCardProps[]>(initialChats);
    const { authToken } = useAuth();

    async function handleChatDelete(id: string) {
        const chatsBackup = [...chats];
        setChats(chats.filter(chat => chat.id !== id));
        const response = await fetch(`${BackendUrl}/conversation/${id}`, 
            { 
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${authToken}` },
                method: "DELETE" 
            });
        if (!response.ok) {
            setChats(chatsBackup);
        }
    }

    return (
        <>
            {chats.length > 0 ? (
                chats.map((chat) => (
                    <ChatCard 
                        key={chat.id} 
                        title={chat.title} 
                        description={chat.description} 
                        id={chat.id} 
                        onDelete={handleChatDelete} 
                    />
                ))
            ) : (
                <p>Nenhum chat encontrado. Crie um novo!</p>
            )}
        </>
    );
}