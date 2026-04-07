import Button from "../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import "../styles/pages/ErrorPage.css";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="error_page"> 
            <i className="fi fi-rr-search-location error_icon"></i>
            <h1 className="error_title">404</h1>
            <p className="error_description">Página não encontrada</p>
            <Button 
                text="Voltar para o Início" 
                style="projeto_button" 
                fileInput={false} 
                onClick={() => navigate("/")} 
            />
        </div>
    )
}
