import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import ProjetoTitle from "../projetos/ProjetoTitle";
import ChatArea from "./ChatArea";
import type { ChatMessage, Conversation } from "./chatTypes";
import { BackendUrl } from "../../constants/env";

import geminiLogo from "../../assets//gemini.svg";
import gptLogo from "../../assets//openai.svg";
import claudeLogo from "../../assets/claude.svg";
import Prompter from "./Prompter";
import { useAuth } from "../Auth/AuthProvider";

const options = [{ name: "Gemini 2.5 pro", icon: geminiLogo, image: true, value: 1}, { name: "Gpt 5", icon: gptLogo, image: true, value: 1}, { name: "Claude 4.5 Sonnet", icon: claudeLogo, image: true, value: 1}]

export default function ChatPageContent({ id, initialData }: { id: string, initialData: Conversation }) {
    const { messages, title, description } = initialData;
    const [conversation, setConversation] = useState<ChatMessage[]>(messages);
    const { authToken } = useAuth();
    const chatName = title
    const chatDescription = description

    async function handleSendPrompt(prompt: string) {
        const userMessage = { role: "user", content: prompt }
        const agentMessage = { role: "assistant", content: "", reasoning: "" }
        setConversation([...conversation, userMessage, agentMessage])

        const response = await fetch(`${BackendUrl}/conversation/${id}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                user_input: prompt
            })
        })

        if (!response.ok || !response.body) {
            setConversation(prev => [...prev.slice(0, -1)]);
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let baseResponse = {
            role: "assistant" as const,
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
                        
                        if (jsonData.content) baseResponse.content += jsonData.content;
                        if (jsonData.reasoning) baseResponse.reasoning += jsonData.reasoning;

                        setConversation(prev => {
                            const updatedLastMessage = { ...baseResponse };
                            return [...prev.slice(0, -1), updatedLastMessage];
                        });
                    } catch (err) {
                        console.error("Não foi possível parsear o JSON do chunk:", str, err);
                    }
                }
            });

            await processStream();
        };

        await processStream();
    }

    function handleUpdateTitle(title: string) {
        fetch(`${BackendUrl}/conversation/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({
                title: title
            })
        })
    }

    return (
        <div className="chat_main">
            <div className="chat_header">
                <ProjetoTitle title={chatName} description={chatDescription} editable onSubmit={handleUpdateTitle}/>
                <Dropdown title="Modelos" options={options} onSelect={() => {}} titleByOption/>
            </div>
            <ChatArea messages={conversation} />
            <div className="chat_footer">
                <Prompter onSubmit={handleSendPrompt}/>
            </div>
        </div>
    )
}