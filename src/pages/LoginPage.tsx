import { Form } from "react-router-dom";
import FormField from "../components/Form/FormField";
import FormTitle from "../components/Form/FormTitle";

export default function LoginPage() {
    return (
        <div className="login_main"> 
            <h1 className="cine_ai_title">CineAI</h1>
            <Form method="post" className="login_form">
                <FormTitle title="Bem-vindo de volta!" description="Acesse sua conta para continuar"/>
                <FormField type="email" name="email" placeholder="Email" title="Email" required value=""/>
                <FormField type="password" name="password" placeholder="Senha" title="Senha" required value=""/>
                <FormField type="submit" name="submit" placeholder="" required value="Entrar"/>
            </Form>
        </div>
    )
}