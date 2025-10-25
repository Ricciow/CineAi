import { useEffect, useRef } from "react"
import AgentMessage from "./AgentMessage"
import type { ChatMessage } from "./chatTypes"
import UserMessage from "./UserMessage"

type ChatAreaProps = {
    messages: ChatMessage[]
}

export default function ChatArea({ messages } : ChatAreaProps) {

    const chatContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = chatContentRef.current;
        if (node) {
            node.scrollTop = node.scrollHeight;
        }
    })

    return (
        <div className="chat_content" ref={chatContentRef}>
            <div></div>
            {messages.map((message, index) => message.role === "user" ? <UserMessage key={index} message={message.content} /> : <AgentMessage key={index} message={message.content} reasoning={message?.reasoning} />)}
            <div></div>
        </div>
    )
}