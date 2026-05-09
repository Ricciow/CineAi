import { memo, useState } from "react";
import TextDropdown from "../Dropdown/TextDropdown";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Spinner from "../Outros/Spinner";
import { useSmoothStreaming } from "./useSmoothStreaming";

type AgentMessageProps = {
    model?: string
    message: string
    reasoning?: string
}

function AgentMessage({ model, message, reasoning }: AgentMessageProps) {
    const [copied, setCopied] = useState(false);
    const smoothedMessage = useSmoothStreaming(message, 10); 

    if(message == "" && (reasoning == "" || reasoning == undefined)) {
        return (<div className="message agent"><Spinner message="Gerando..."/></div>)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(message);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="message agent"> 
            <div className="agent_message_header">
                {model && <h2>{model}</h2>}
                <button className="copy_button" onClick={handleCopy} title="Copiar resposta">
                    <i className={copied ? "fi fi-rr-check" : "fi fi-rr-copy"}></i>
                </button>
            </div>
            {reasoning && <TextDropdown title="Pensamento" text={reasoning} />}
            <div className="message_area">
                <Markdown remarkPlugins={[remarkGfm]}>{smoothedMessage}</Markdown>
            </div>
        </div>
    )
}

export default memo(AgentMessage)