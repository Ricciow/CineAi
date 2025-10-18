import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom"
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import Dropdown from "../components/Dropdown/Dropdown";

import geminiLogo from "../assets/gemini.svg";
import gptLogo from "../assets/openai.svg";
import claudeLogo from "../assets/claude.svg";

const options = [{ name: "Gemini 2.5 pro", icon: geminiLogo, image: true, value: 1}, { name: "Gpt 5", icon: gptLogo, image: true, value: 1}, { name: "Claude 4.5 Sonnet", icon: claudeLogo, image: true, value: 1}]

export function chatPageLoader({ params }: LoaderFunctionArgs) {
    return {
        id: params.id
    }
}

export default function ChatPage() {
    const { id } = useLoaderData();
    const chatName = `Chat ${id}`
    const chatDescription = `Descrição do chat ${id}`

    return (
        <div className="chat_main">
            <div className="chat_main_header">
                <ProjetoTitle title={chatName} description={chatDescription} />
                <Dropdown title="Modelos" options={options} onSelect={(value) => {}} titleByOption/>
            </div>
        </div>
    )
}