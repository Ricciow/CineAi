import { useState } from "react";
import ChatCard, { type ChatCardProps } from "../../components/Card/ChatCard";
import authenticatedFetch from "../../api/authenticatedFetch";
import Button from "../Buttons/Button";

export default function ChatList({ initialChats, onCreateChat }: { initialChats: ChatCardProps[], onCreateChat?: () => void }) {
    const [chats, setChats] = useState<ChatCardProps[]>(initialChats);

    async function handleChatDelete(id: string) {
        const chatsBackup = [...chats];
        setChats(chats.filter(chat => chat.id !== id));
        const response = await authenticatedFetch(`conversation/${id}`, { method: "DELETE" });

        if (!response.ok) {
            setChats(chatsBackup);
        }
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {chats.length > 0 ? (
                <div className="chats_grid">
                    {chats.map((chat) => (
                        <ChatCard 
                            key={chat.id} 
                            title={chat.title} 
                            description={chat.description} 
                            id={chat.id} 
                            onDelete={handleChatDelete} 
                        />
                    ))}
                </div>
            ) : (
                <div className="empty_state" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem' }}>
                    <div className="empty_state_icon">
                        <i className="fi fi-rr-comment-dots"></i>
                    </div>
                    <h3>Nenhum chat encontrado</h3>
                    <p>Você ainda não tem chats de roteiro neste projeto. Comece um novo agora!</p>
                    <div style={{ marginTop: '1.5rem' }}>
                        <Button text="Criar meu primeiro chat" onClick={onCreateChat} style="projeto_button" />
                    </div>
                </div>
            )}
        </div>
    );
}