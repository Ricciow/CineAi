import { Form } from "react-router-dom";
import FormField from "../components/Form/FormField";

export default function LoginPage() {
    return (
        <div className="login_main"> 
            <h1 className="cine_ai_title">CineAI</h1>
            <Form method="post" className="login_form">
                <FormField type="email" name="email" placeholder="Email" title="Email" required value=""/>
                <FormField type="password" name="password" placeholder="Senha" title="Senha" required value=""/>
                <FormField type="submit" name="submit" placeholder="" required value="Entrar"/>
            </Form>
        </div>
    )
}