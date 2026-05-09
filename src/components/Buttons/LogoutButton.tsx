import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import Button from "./Button";
import AlertCard from "../Card/AlertCard";

export default function LogoutButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    async function onConfirmLogout() {
        await handleLogout();
        navigate('/login');
    }

    return (
        <>
            <Button 
                text="Sair" 
                style="delete_button_bg" 
                fileInput={false} 
                onClick={() => setIsModalOpen(true)} 
            />

            {isModalOpen && (
                <AlertCard darken className="chat_card_confirmation">
                    <h2>Confirmar Saída</h2>
                    <p>Você tem certeza que deseja sair da sua conta?</p>
                    <div className="chat_card_delete">
                        <Button 
                            style="generic_button" 
                            onClick={() => setIsModalOpen(false)} 
                            text="Cancelar" 
                            fileInput={false}
                        />
                        <Button 
                            style="delete_button_bg" 
                            onClick={onConfirmLogout} 
                            text="Sair" 
                            fileInput={false}
                        />
                    </div>
                </AlertCard>
            )}
        </>
    );
}
