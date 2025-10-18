type UserMessageProps = {
    message: string
}

export default function UserMessage({message} : UserMessageProps) {
    return (
        <div className="message user"> 
            <p>{message}</p>
        </div>
    )
}