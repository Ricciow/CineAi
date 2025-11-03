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

export type ChatModel = {
    name: string,
    model: string,
    provider: string
}