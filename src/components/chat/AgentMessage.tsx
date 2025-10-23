import { memo } from "react";
import TextDropdown from "../Dropdown/TextDropdown";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'

type AgentMessageProps = {
    model?: string
    message: string
    reasoning?: string
}

function AgentMessage({ model, message, reasoning }: AgentMessageProps) {
    console.log(message)

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