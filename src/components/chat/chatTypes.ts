export type Conversation = {
    title: string,
    description: string,
    messages: ChatMessage[],
}

export type ChatMessage = {
    role: string,
    content: string
    reasoning?: string
}
