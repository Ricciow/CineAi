import { memo } from "react";

type AgentMessageProps = {
    model?: string
    message: string
}

function AgentMessage({ model, message }: AgentMessageProps) {
    return (
        <div className="message agent"> 
            {model && <h2>{model}</h2>}
            <p>{message}</p>
        </div>
    )
}

export default memo(AgentMessage)