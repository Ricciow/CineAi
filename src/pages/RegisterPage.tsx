import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/Form/FormField";
import FormTitle from "../components/Form/FormTitle";
import { useAuth } from "../components/Auth/AuthProvider";
import type React from "react";
import { useEffect, useState } from "react";

export default function RegisterPage() {
    const { handleRegister, authToken } = useAuth();  
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const username = formData.get('username') as string;

        try {
            await handleRegister(email, password, username);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        catch(e) {
            if(e instanceof Error) {
                setError(e.message);
            }
        }
    }

    useEffect(() => {
        if(authToken) {
            navigate('/projetos')
        }
    }, [])

    if (success) {
        return (
            <div className="login_main"> 
                <Link to="/" className="cine_ai_title">CineAI</Link>
                <div className="login_form">
                    <FormTitle title="Cadastro realizado!" description="Sua conta foi criada com sucesso."/>
                    <div className="auth_success_container">
                        <p className="auth_success_text">
                            Você será redirecionado para a página de login em instantes...
                        </p>
                        <Link to="/login" className="register_link auth_success_link">
                            Ir para o Login agora
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="login_main"> 
            <Link to="/" className="cine_ai_title">CineAI</Link>
            <form className="login_form" onSubmit={handleSubmit}>
                <FormTitle title="Crie sua conta" description="Preencha os dados abaixo para começar"/>
                <FormField type="text" name="username" placeholder="Nome de usuário" title="Usuário" required value=""/>
                <FormField type="email" name="email" placeholder="Email" title="Email" required value=""/>
                <FormField type="password" name="password" placeholder="Senha" title="Senha" required value=""/>
                {error && <p className="error">{error}</p>}
                <FormField type="submit" name="submit" placeholder="" required value="Cadastrar"/>
                <div className="register_container auth_footer">
                    <span className="register_text">Já tem uma conta? </span>
                    <Link to="/login" className="register_link">Entrar</Link>
                </div>
            </form>
        </div>
    )
}
