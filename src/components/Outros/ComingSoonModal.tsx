import AlertCard from "../Card/AlertCard";
import Button from "../Buttons/Button";
import "../../styles/pages/ComingSoonPage.css";

type ComingSoonModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
    if (!isOpen) return null;

    return (
        <AlertCard darken className="chat_card_confirmation">
            <div className="coming_soon_content modal_version">
                <i className="fi fi-rr-time-past coming_soon_icon modal_version"></i>
                <h2 className="coming_soon_title modal_version">Em Breve</h2>
                <p className="coming_soon_description">
                    Estamos trabalhando para permitir o upload de novos arquivos em breve!
                </p>
                <div className="coming_soon_divider modal_version"></div>
            </div>
            <div className="chat_card_delete">
                <Button 
                    style="generic_button" 
                    onClick={onClose} 
                    text="Fechar" 
                    className="w-full"
                />
            </div>
        </AlertCard>
    );
}
