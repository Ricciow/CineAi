import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import ProjetoTitle from "../projetos/ProjetoTitle";
import ChatArea from "./ChatArea";
import type { ChatMessage, ChatModel, Conversation } from "./chatTypes";

import geminiLogo from "../../assets//gemini.svg";
import gptLogo from "../../assets//openai.svg";
import claudeLogo from "../../assets/claude.svg";
import minimaxLogo from "../../assets/minimax.svg";
import stepfunLogo from "../../assets/stepfun.svg";
import Prompter from "./Prompter";
import authenticatedFetch from "../../api/authenticatedFetch";
import { useLocalStorage } from "react-use";

function modelToOption(modelsData: ChatModel[]) {
    return modelsData.map(model => {
        let icon;
        switch(model.provider) {
            case "minimax":                
                icon = minimaxLogo;
                break;
            case "openai":
                icon = gptLogo;
                break;
            case "gemini":
                icon = geminiLogo;
                break;
            case "claude":
                icon = claudeLogo;
                break;
            case "stepfun":
                icon = stepfunLogo;
                break;
            default:
                icon = "";
        }
    
        return { name: model.name, icon: icon, image: icon !== "", value: model.model };
    });
}

export default function ChatPageContent({ id, initialData, modelsData }: { id: string, initialData: Conversation, modelsData: ChatModel[] }) {
    const { messages, title, description } = initialData;
    const [conversation, setConversation] = useState<ChatMessage[]>(messages);
    const [model, setModel] = useState<string>(modelsData[0]?.model || "");
    const [modelNumber, setModelNumber] = useLocalStorage<number>("chat-model-number", 0);
    if(modelNumber && modelNumber > modelsData.length - 1) {
        setModelNumber(0);
    }
    if(modelNumber && modelsData[modelNumber] && model !== modelsData[modelNumber].model) {
        setModel(modelsData[modelNumber].model);
    }
    const chatName = title
    const chatDescription = description

    const options = modelToOption(modelsData);

    async function handleSendPrompt(prompt: string) {
        const userMessage = { role: "user", content: prompt }
        const agentMessage = { role: "assistant", content: "", reasoning: "" }
        setConversation([...conversation, userMessage, agentMessage])

        const response = await authenticatedFetch(`conversation/${id}/message`, { 
            method: "POST", 
            body: { 
                user_input: prompt,
                model: model
            }});

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

        let partialChunk = "";

        async function processStream() {
            const { done, value } = await reader.read();

            if (done) {
                console.log('Stream finalizado.');
                return;
            }

            const chunkString = decoder.decode(value, { stream: true });
            const combinedChunk = partialChunk + chunkString;
            const lines = combinedChunk.split('\n');
            
            // O último elemento pode ser um JSON incompleto
            partialChunk = lines.pop() || "";

            lines.forEach(str => {
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

    async function handleUpdateTitle(title: string) {
        await authenticatedFetch(`conversation/${id}`, 
            { 
                method: "PATCH",
                body: {
                    title: title
                }
            })
    }

    function handleModelSelect(model: string, index: number) {
        setModel(model);
        setModelNumber(index);
    }

    return (
        <div className="chat_main">
            <div className="chat_header">
                <ProjetoTitle title={chatName} description={chatDescription} editable onSubmit={handleUpdateTitle}/>
                <Dropdown title="Modelos" options={options} onSelect={handleModelSelect} selected={modelNumber} titleByOption/>
            </div>
            <ChatArea messages={conversation} />
            <div className="chat_footer">
                <Prompter onSubmit={handleSendPrompt}/>
            </div>
        </div>
    )
}