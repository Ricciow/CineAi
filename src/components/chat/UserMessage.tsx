import { memo } from "react";

type UserMessageProps = {
    message: string
}

function UserMessage({message} : UserMessageProps) {
    return (
        <div className="message user"> 
            <p>{message}</p>
        </div>
    )
}

export default memo(UserMessage)