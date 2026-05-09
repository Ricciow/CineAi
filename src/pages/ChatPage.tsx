import { 
    useLoaderData, 
    type LoaderFunctionArgs, 
    Await
} from "react-router-dom";
import { Suspense } from "react";
import type { ChatModel, Conversation } from "../components/chat/chatTypes";
import ErrorPage from "./ErrorPage";
import Spinner from "../components/Outros/Spinner";
import ChatPageContent from "../components/chat/ChatPageContent";
import authenticatedFetch from "../api/authenticatedFetch";

async function loadConversation(id: string): Promise<Conversation> {
    const response = await authenticatedFetch(`conversation/${id}`, 
        { 
            method: "GET" 
        }
    );

    if (!response.ok) {
        throw new Response("Não foi possível carregar o histórico do chat.", { 
            status: response.status,
            statusText: response.statusText,
        });
    }

    const data: any = await response.json();
    
    return {
        messages: data.messages,
        title: data.title,
        description: data.description,
        project_id: data.project_id
    };
}

async function loadModels(): Promise<ChatModel[]> {
    const response = await authenticatedFetch(`conversation/models`, 
        {
            method: "GET"
        }
    );

    if (!response.ok) {
        throw new Response("Nao foi possivel carregar os modelos", { 
            status: response.status,
            statusText: response.statusText,
        });
    }

    const responseJson = await response.json();

    return responseJson
}

type loaderFunctionResult = {
    id: string,
    conversationData: Promise<Conversation>,
    modelsData: Promise<ChatModel[]>
}

export async function chatPageLoader({ params }: LoaderFunctionArgs): Promise<loaderFunctionResult> {
    const id = params.id as string;

    const conversationPromise = loadConversation(id);
    
    const modelsPromise = loadModels();

    return {
        id: id,
        conversationData: conversationPromise, 
        modelsData: modelsPromise
    };
}


export default function ChatPage() {
    const { id, conversationData, modelsData } = useLoaderData() as loaderFunctionResult;

    return (
        <Suspense fallback={
            <Spinner message="Carregando histórico do chat..." className="chat_page_spinner"/>
        }>
            <Await
                resolve={conversationData}
                errorElement={<ErrorPage />}
            >
                {(resolvedData) => (
                    <Await
                        resolve={modelsData}
                        errorElement={<ErrorPage />}
                    >
                        {(resolvedModels) => (
                            <ChatPageContent id={id} initialData={resolvedData} modelsData={resolvedModels} />
                        )}
                    </Await>
                )}
            </Await>
        </Suspense>
    )
}