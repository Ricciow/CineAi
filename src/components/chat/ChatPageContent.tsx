import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import ProjetoTitle from "../projetos/ProjetoTitle";
import ChatArea from "./ChatArea";
import type { ChatMessage, ChatModel, Conversation } from "./chatTypes";

import geminiLogo from "../../assets/gemini.svg";
import gptLogo from "../../assets/openai.svg";
import claudeLogo from "../../assets/claude.svg";
import minimaxLogo from "../../assets/minimax.svg";
import stepfunLogo from "../../assets/stepfun.svg";
import Prompter from "./Prompter";
import authenticatedFetch from "../../api/authenticatedFetch";
import { useLocalStorage } from "react-use";
import { useOutletContext } from "react-router-dom";

import { useAuth } from "../Auth/AuthProvider";
import toast from "react-hot-toast";

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
    const { messages, title, description: initialDescription, project_id } = initialData;
    const [conversation, setConversation] = useState<ChatMessage[]>(messages);
    const [model, setModel] = useState<string>(modelsData[0]?.model || "");
    const [modelNumber, setModelNumber] = useLocalStorage<number>("chat-model-number", 0);
    const [inputText, setInputText] = useState("");
    const [chatDescription, setChatDescription] = useState(initialDescription);
    const [canSend, setCanSend] = useState(true);

    const { setChatName } = useOutletContext<{ setChatName: (name: string | undefined) => void }>();
    const { userId } = useAuth();

    useEffect(() => {
        setChatName(title);
        
        if (project_id && userId) {
            authenticatedFetch(`project/${project_id}`, { method: "GET" }).then(async res => {
                if (res.ok) {
                    const data = await res.json();
                    const isOwner = String(data.user_id) === String(userId);
                    const member = data.members?.find((m: any) => String(m.user_id) === String(userId));
                    const isAdmin = isOwner || member?.role === "admin";
                    
                    console.log("Chat Permission Debug:", { userId, projectOwner: data.user_id, member, isAdmin });
                    setCanSend(isAdmin || member?.permissions?.send_messages);
                }
            });
        }
        
        return () => setChatName(undefined);
    }, [title, setChatName, project_id, userId]);

    if(modelNumber && modelNumber > modelsData.length - 1) {
        setModelNumber(0);
    }
    if(modelNumber && modelsData[modelNumber] && model !== modelsData[modelNumber].model) {
        setModel(modelsData[modelNumber].model);
    }
    const chatName = title

    const options = modelToOption(modelsData);

    async function handleSendPrompt(prompt: string) {
        if (!prompt.trim()) return;

        const userMessage = { role: "user", content: prompt }
        const agentMessage = { role: "assistant", content: "", reasoning: "" }
        setConversation([...conversation, userMessage, agentMessage])
        setInputText("");

        try {
            const response = await authenticatedFetch(`conversation/${id}/message`, { 
                method: "POST", 
                body: { 
                    user_input: prompt,
                    model: model
                }});

            if (!response.ok) {
                if (response.status === 403) {
                    const err = await response.json();
                    toast.error(err.detail || "Sem permissão para enviar mensagens");
                    setConversation(prev => prev.slice(0, -2));
                    setInputText(prompt);
                    return;
                }
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            if (!response.body) {
                throw new Error("Corpo da resposta vazio");
            }
            
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let baseResponse = {
                role: "assistant" as const,
                content: "",
                reasoning: "",
            }

            let partialChunk = "";

            const processStream = async (): Promise<void> => {
                const { done, value } = await reader.read();

                if (done) {
                    console.log('Stream finalizado.');
                    return;
                }

                const chunkString = decoder.decode(value, { stream: true });
                const combinedChunk = partialChunk + chunkString;
                const lines = combinedChunk.split('\n');
                
                partialChunk = lines.pop() || "";

                for (const str of lines) {
                    if (str) {
                        try {
                            const jsonData = JSON.parse(str);
                            
                            if (jsonData.description) {
                                setChatDescription(jsonData.description);
                                continue;
                            }

                            if (jsonData.content && jsonData.content.includes("[Erro:")) {
                                throw new Error(jsonData.content);
                            }

                            if (jsonData.reset) {
                                baseResponse.content = "";
                                baseResponse.reasoning = "";
                            }

                            if (jsonData.content) baseResponse.content += jsonData.content;
                            if (jsonData.reasoning) baseResponse.reasoning += jsonData.reasoning;

                            setConversation(prev => {
                                const updatedLastMessage = { ...baseResponse };
                                return [...prev.slice(0, -1), updatedLastMessage];
                            });
                        } catch (err) {
                            if (err instanceof Error && err.message.includes("[Erro:")) throw err;
                            console.error("Não foi possível parsear o JSON do chunk:", str, err);
                        }
                    }
                }

                return processStream();
            };

            await processStream();
        } catch (error) {
            console.error("Erro no chat:", error);
            toast.error("Ocorreu um erro ao gerar a resposta. Tente novamente.");
            
            setInputText(prompt);
            
            setConversation(prev => prev.slice(0, -2));
        }
    }

    async function handleUpdateTitle(newTitle: string) {
        const oldTitle = title;
        setChatName(newTitle);
        
        const response = await authenticatedFetch(`conversation/${id}`, 
            { 
                method: "PATCH",
                body: {
                    title: newTitle
                }
            });
        
        if (!response.ok) {
            if (response.status === 403) {
                const err = await response.json();
                toast.error(err.detail || "Sem permissão para alterar o título");
                setChatName(oldTitle);
            } else {
                toast.error("Erro ao atualizar título");
                setChatName(oldTitle);
            }
        }
    }

    function handleModelSelect(model: string, index: number) {
        setModel(model);
        setModelNumber(index);
    }

    return (
        <div className="chat_main">
            <div className="chat_header">
                <ProjetoTitle title={chatName} description={chatDescription} editable onSubmit={handleUpdateTitle}/>
                <Dropdown title="Modelos" options={options} onSelect={handleModelSelect} selected={modelNumber} titleByOption disabled={!canSend}/>
            </div>
            <ChatArea messages={conversation} />
            <div className="chat_footer">
                <Prompter 
                    onSubmit={handleSendPrompt} 
                    value={inputText} 
                    onValueChange={setInputText}
                    disabled={!canSend}
                />
            </div>
        </div>
    )
}