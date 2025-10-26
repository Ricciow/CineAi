import { useState } from "react";
import ChatCard, { type ChatCardProps } from "../../components/Card/ChatCard";
import { useAuth } from "../Auth/AuthProvider";
import authenticatedFetch from "../../api/authenticatedFetch";

export default function ChatList({ initialChats }: { initialChats: ChatCardProps[] }) {
    const [chats, setChats] = useState<ChatCardProps[]>(initialChats);
    const { authToken } = useAuth();

    async function handleChatDelete(id: string) {
        const chatsBackup = [...chats];
        setChats(chats.filter(chat => chat.id !== id));
        const response = await authenticatedFetch(`conversation/${id}`, { method: "DELETE" }, authToken);

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