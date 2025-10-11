import Button from "../components/Buttons/Button";
import ProjetoTitle from "../components/projetos/ProjetoTitle";

export default function RoteiroPage() {
    return (
        <div className="projeto_main">
            <div className="projeto_header">
                <ProjetoTitle title="Roteirização" description="Crie, analise e refine seu roteiro. Comece um novo chat para gerar uma história, corrija um script ou peça sugestões à IA."/>
                <Button text="Novo Chat de Roteiro" style="projeto_button" iconClass="fi fi-rr-add" fileInput={false}/>
            </div>
        </div>
    )
}