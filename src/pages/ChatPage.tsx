import { 
    useLoaderData, 
    type LoaderFunctionArgs, 
    Await // Await remains
} from "react-router-dom";
import { BackendUrl } from "../constants/env";
import { Suspense } from "react"; // Suspense remains
import type { Conversation } from "../components/chat/chatTypes";
import ErrorPage from "./ErrorPage";
import Spinner from "../components/Outros/Spinner";
import ChatPageContent from "../components/chat/ChatPageContent";

async function loadConversation(id: string): Promise<Conversation> {
    const response = await fetch(`${BackendUrl}/conversation/${id}`);

    if (!response.ok) {
        throw new Response("Não foi possível carregar o histórico do chat.", { 
            status: response.status,
            statusText: response.statusText,
        });
    }

    const data: Conversation = await response.json();
    
    return {
        messages: data.messages,
        title: data.title,
        description: data.description
    };
}

export async function chatPageLoader({ params }: LoaderFunctionArgs) {
    const id = params.id as string;

    const conversationPromise = loadConversation(id);
    
    return {
        id: id,
        conversationData: conversationPromise, 
    };
}

export default function ChatPage() {
    const { id, conversationData } = useLoaderData() as { id: string, conversationData: Promise<Conversation> };

    return (
        <Suspense fallback={
            <Spinner message="Carregando histórico do chat..." className="chat_page_spinner"/>
        }>
            <Await
                resolve={conversationData}
                errorElement={<ErrorPage />}
            >
                {(resolvedData) => (
                    <ChatPageContent id={id} initialData={resolvedData} />
                )}
            </Await>
        </Suspense>
    )
}