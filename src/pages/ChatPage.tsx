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

type Conversation = {
    title: string,
    description: string,
    messages: ChatMessage[],
}

type ChatMessage = {
    role: string,
    content: string
    reasoning?: string
}

export async function chatPageLoader({ params }: LoaderFunctionArgs) {
    const id = params.id;

    const response = await fetch(`${BackendUrl}/conversation/${id}`);

    if (!response.ok) {
        throw new Response("Não foi possível carregar o histórico do chat.", { 
            status: response.status,
            statusText: response.statusText,
        });
    }

    const data: Conversation = await response.json();
    
    return {
        id: id,
        fetchedConversation: data.messages,
        title: data.title,
        description: data.description
    };
}

export default function ChatPage() {
    const { id, fetchedConversation , title, description } : { id: string, fetchedConversation: ChatMessage[], title: string, description: string } = useLoaderData();
    const [conversation, setConversation] = useState<ChatMessage[]>(fetchedConversation);

    const chatName = title
    const chatDescription = description

    const chatContentRef = useRef<HTMLDivElement>(null);

    async function handleSendPrompt(prompt: string) {
        const userMessage = { role: "user", content: prompt }
        const agentMessage = { role: "assistant", content: "", reasoning: "" }
        setConversation([...conversation, userMessage, agentMessage])

        const response = await fetch(`${BackendUrl}/message/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_input: prompt
            })
        })

        if (!response.ok || !response.body) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let baseResponse = {
            role: "assistant",
            content: "",
            reasoning: "",
        }

        async function processStream() {
            const { done, value } = await reader.read();

            if (done) {
                console.log('Stream finalizado.');
                return;
            }

            const chunkString = decoder.decode(value, { stream: true });

            const jsonStrings = chunkString.trim().split('\n');

            jsonStrings.forEach(str => {
                if (str) {
                    try {
                        const jsonData = JSON.parse(str);
                        baseResponse.content += jsonData.content;
                        baseResponse.reasoning += jsonData.reasoning;

                        setConversation(prev => {
                            prev = prev.slice(0, -1);
                            return [...prev, baseResponse]
                        });
                    } catch (err) {
                        console.error("Não foi possível parsear o JSON do chunk:", str, err);
                    }
                }
            });

            processStream();
        };

        processStream();
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
                <div></div>
                {conversation.map((message, index) => message.role === "user" ? <UserMessage key={index} message={message.content} /> : <AgentMessage key={index} message={message.content} reasoning={message?.reasoning} />)}
                <div></div>
            </div>
            <div className="chat_footer">
                <Propmter onSubmit={handleSendPrompt}/>
            </div>
        </div>
    )
}