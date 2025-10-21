import { memo } from "react";
import TextDropdown from "../Dropdown/TextDropdown";

type AgentMessageProps = {
    model?: string
    message: string
    reasoning?: string
}

function AgentMessage({ model, message, reasoning }: AgentMessageProps) {
    const linhasMensagem = message.split("\n");

    return (
        <div className="message agent"> 
            {model && <h2>{model}</h2>}
            {reasoning && <TextDropdown title="Pensamento" text={reasoning} />}
            <p>{linhasMensagem.map((linha, index) => <>{linha}<br key={index}/></>)}</p>
        </div>
    )
}

export default memo(AgentMessage)