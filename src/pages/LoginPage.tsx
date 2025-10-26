import { Form, Link, useNavigate } from "react-router-dom";
import FormField from "../components/Form/FormField";
import FormTitle from "../components/Form/FormTitle";
import { useAuth } from "../components/Auth/AuthProvider";
import type React from "react";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const { handleLogin, authToken } = useAuth();  
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await handleLogin(email, password);
            navigate('/projetos');
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
    })

    return (
        <div className="login_main"> 
            <h1 className="cine_ai_title">CineAI</h1>
            <Form method="post" className="login_form" onSubmit={handleSubmit}>
                <FormTitle title="Bem-vindo de volta!" description="Acesse sua conta para continuar"/>
                <FormField type="email" name="email" placeholder="Email" title="Email" required value=""/>
                <FormField type="password" name="password" placeholder="Senha" title="Senha" required value=""/>
                {error && <p className="error">{error}</p>}
                <FormField type="submit" name="submit" placeholder="" required value="Entrar"/>
                <p className="register_text">Ainda não possui uma conta? <Link to="/register" className="register_link">Cadastre-se</Link></p>
            </Form>
        </div>
    )
}