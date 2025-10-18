import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom"
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import Dropdown from "../components/Dropdown/Dropdown";
import Propmter from "../components/chat/Prompter";

import geminiLogo from "../assets/gemini.svg";
import gptLogo from "../assets/openai.svg";
import claudeLogo from "../assets/claude.svg";
import UserMessage from "../components/chat/UserMessage";
import AgentMessage from "../components/chat/AgentMessage";
import { BackendUrl } from "../constants/env";
import { useEffect, useRef, useState } from "react";

const options = [{ name: "Gemini 2.5 pro", icon: geminiLogo, image: true, value: 1}, { name: "Gpt 5", icon: gptLogo, image: true, value: 1}, { name: "Claude 4.5 Sonnet", icon: claudeLogo, image: true, value: 1}]

type ChatMessage = {
    role: string,
    content: string
}

export async function chatPageLoader({ params }: LoaderFunctionArgs) {
    const id = params.id;

    console.log(BackendUrl);

    const response = await fetch(`${BackendUrl}/conversation-history?conversation_id=${id}`);

    if (!response.ok) {
        throw new Response("Não foi possível carregar o histórico do chat.", { 
            status: response.status,
            statusText: response.statusText,
        });
    }

    const data: ChatMessage[] = await response.json();

    return {
        id: id,
        fetchedConversation: data,
    };
}

export default function ChatPage() {
    const { id, fetchedConversation } : { id: string, fetchedConversation: ChatMessage[] } = useLoaderData();
    const [conversation, setConversation] = useState<ChatMessage[]>(fetchedConversation);

    const chatName = `Chat ${id}`
    const chatDescription = `Descrição do chat ${id}`

    const chatContentRef = useRef<HTMLDivElement>(null);

    async function handleSendPrompt(prompt: string) {
        const userMessage = { role: "user", content: prompt }
        setConversation([...conversation, userMessage])

        const result = await fetch(`${BackendUrl}/message?conversation_id=${id}&user_input=${prompt}`, {
            method: "POST",  
        })

        if(result.ok) {
            const response : ChatMessage = await result.json();
            setConversation([...conversation, userMessage, response])
        }   
    }

    useEffect(() => {
        const node = chatContentRef.current;
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    }, [conversation])

    return (
        <div className="chat_main">
            <div className="chat_header">
                <ProjetoTitle title={chatName} description={chatDescription} />
                <Dropdown title="Modelos" options={options} onSelect={() => {}} titleByOption/>
            </div>
            <div className="chat_content" ref={chatContentRef}>
                {conversation.map((message, index) => message.role === "user" ? <UserMessage key={index} message={message.content} /> : <AgentMessage key={index} message={message.content} />)}
            </div>
            <div className="chat_footer">
                <Propmter onSubmit={handleSendPrompt}/>
            </div>
        </div>
    )
}