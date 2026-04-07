import Button from "../components/Buttons/Button";
import ProjetoTitle from "../components/projetos/ProjetoTitle";
import { useNavigate } from "react-router-dom";
import "../styles/pages/ComingSoonPage.css";

type ComingSoonPageProps = {
    title: string;
    description: string;
};

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
    const navigate = useNavigate();

    return (
        <div className="projeto_main coming_soon_main">
            <div className="projeto_header">
                <ProjetoTitle 
                    title={title} 
                    description={description} 
                />
                <Button 
                    text="Voltar para Roteirização" 
                    style="projeto_button" 
                    iconClass="fi fi-rr-arrow-left" 
                    fileInput={false} 
                    onClick={() => navigate("../roteiro")} 
                />
            </div>
            
            <div className="coming_soon_content">
                <i className="fi fi-rr-time-past coming_soon_icon"></i>
                <h2 className="coming_soon_title">Em Breve</h2>
                <p className="coming_soon_description">
                    Estamos trabalhando arduamente para trazer esta funcionalidade para você. Fique atento às atualizações!
                </p>
                <div className="coming_soon_divider"></div>
            </div>
        </div>
    );
}
