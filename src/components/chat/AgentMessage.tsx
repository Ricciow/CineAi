type AgentMessageProps = {
    model?: string
    message: string
}

export default function AgentMessage({ model, message }: AgentMessageProps) {
    return (
        <div className="message agent"> 
            {model && <h2>{model}</h2>}
            <p>{message}</p>
        </div>
    )
}