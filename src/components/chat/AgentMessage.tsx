import { memo } from "react";
import TextDropdown from "../Dropdown/TextDropdown";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Spinner from "../Outros/Spinner";

type AgentMessageProps = {
    model?: string
    message: string
    reasoning?: string
}

function AgentMessage({ model, message, reasoning }: AgentMessageProps) {
    if(message == "" && reasoning == "") {
        return (<div className="message agent"><Spinner message="Gerando..."/></div>)
    }

    return (
        <div className="message agent"> 
            {model && <h2>{model}</h2>}
            {reasoning && <TextDropdown title="Pensamento" text={reasoning} />}
            <div className="message_area">
                <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
            </div>
        </div>
    )
}

export default memo(AgentMessage)