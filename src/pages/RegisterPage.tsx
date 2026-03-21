import { Link } from "react-router-dom";
import FormTitle from "../components/Form/FormTitle";

export default function RegisterPage() {
    return (
        <div className="login_main"> 
            <Link to="/" className="cine_ai_title">CineAI</Link>
            <div className="login_form">
                <FormTitle title="Cadastro Desativado" description="O cadastro de novos usuários está temporariamente desativado."/>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <p className="error" style={{ marginBottom: '20px' }}>
                        No momento, não estamos aceitando novos registros. 
                        Acompanhe nossas redes sociais para saber quando abriremos novas vagas.
                    </p>
                    <Link to="/login" className="register_link" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                        Voltar para o Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
