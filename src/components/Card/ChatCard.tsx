import { Link } from "react-router-dom"
import Button from "../Buttons/Button"
import { useState } from "react"
import AlertCard from "./AlertCard"

export type ChatCardProps = {
    title: string
    description: string
    id: string
    onDelete?: (id: string) => void
}

export default function ChatCard({title, description, id, onDelete}: ChatCardProps) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    function handleDelete() {
        if(!confirmDelete) return setConfirmDelete(true);
        
        onDelete && onDelete(id)
    }

    return (
        <>
            <div className="chat_card">
                <div className="chat_card_header">
                    <h2>{title}</h2>
                    <div className="chat_card_delete">
                        <Button 
                            style="delete_button" 
                            iconClass="fi fi-rr-trash" 
                            fileInput={false}
                            onClick={handleDelete}
                        />
                    </div>
                </div>
                <p>{description}</p>
                <Link to={`./${id}`}>Abrir Chat</Link>
            </div>
            {confirmDelete && 
                <AlertCard className="chat_card_confirmation" darken>
                    <h2>{title}</h2>
                    <p>Tem certeza que deseja deletar esse chat?</p>
                    <div className="chat_card_delete">
                        <Button style="generic_button" onClick={() => setConfirmDelete(false)} text="Cancelar" fileInput={false}/>
                        <Button style="delete_button_bg" onClick={handleDelete} text="Deletar" fileInput={false}/>
                    </div>
                </AlertCard>
            }
        </>
    )
}