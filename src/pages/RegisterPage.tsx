import { Form, Link, useNavigate } from "react-router-dom";
import FormField from "../components/Form/FormField";
import FormTitle from "../components/Form/FormTitle";
import type React from "react";
import { useState } from "react";
import { BackendUrl } from "../constants/env";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(e.currentTarget.password.value !== e.currentTarget.passwordConfirm.value) {
            setError("As senhas devem ser iguais");
            return;
        }

        const response = await fetch(`${BackendUrl}/auth/register`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ 
                username: e.currentTarget.username.value, 
                email: e.currentTarget.email.value, 
                password: e.currentTarget.password.value,
            })
        });

        const data = await response.json();

        if(!response.ok) {
            setError(data.detail);
            return;
        }

        navigate('/login', {
            state: { username: data.username, email: data.email, token: data.token }
        })
    }

    return (
        <div className="login_main"> 
            <Link to="/" className="cine_ai_title">CineAI</Link>
            <Form method="post" className="login_form" onSubmit={handleSubmit}>
                <FormTitle title="Crie sua Conta" description="Comece sua jornada criativa hoje mesmo."/>
                <FormField type="text" name="username" placeholder="Nome" title="Nome de usuário" required value=""/>
                <FormField type="email" name="email" placeholder="Email" title="Email" required value=""/>
                <FormField type="password" name="password" placeholder="Senha" title="Senha" required value=""/>
                <FormField type="password" name="passwordConfirm" placeholder="Repita a senha" title="Confirmar Senha" required value=""/>
                {error && <p className="error">{error}</p>}
                <FormField type="submit" name="submit" placeholder="" required value="Criar Conta"/>
                <p className="register_text">Já possui uma conta? <Link to="/login" className="register_link">Entrar</Link></p>
            </Form>
        </div>
    )
}