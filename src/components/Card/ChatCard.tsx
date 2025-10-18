import { Link } from "react-router-dom"
import Button from "../Buttons/Button"

export type ChatCardProps = {
    title: string
    description: string
    id: string
    onDelete?: (id: string) => void
}

export default function ChatCard({title, description, id, onDelete}: ChatCardProps) {
    return (
        <div className="chat_card">
            <div className="chat_card_header">
                <h2>{title}</h2>
                <Button style="delete_button" iconClass="fi fi-rr-trash" fileInput={false} onClick={() => onDelete && onDelete(id)}/>
            </div>
            <p>{description}</p>
            <Link to={`./${id}`}>Abrir Chat</Link>
        </div>
    )
}