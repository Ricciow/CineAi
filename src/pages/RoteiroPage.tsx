import ProjetoButton from "../components/ProjetoButton";

export default function RoteiroPage() {
    return (
        <div className="projeto_main">
            <div className="projeto_header">
                <div className="projeto_header_title">
                    <h1 className="projeto_title">Roteirização</h1>
                    <p className="projeto_description">Crie, analise e refine seu roteiro. Comece um novo chat para gerar uma história, corrija um script ou peça sugestões à IA.</p>
                </div>
                <ProjetoButton />
            </div>
        </div>
    )
}