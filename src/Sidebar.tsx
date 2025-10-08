import { useRef, useState, type ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import ArquivoButton from "./components/ArquivoButton";

export default function Sidebar({ projeto }: { projeto: string }) {
    const [arquivos, setArquivos] = useState<File[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    //Propriamente enviar/deletar arquivos no futuro
    function handleUpload(e : ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        
        if (files) {
            const file = files[0];
            inputRef.current!.value = '';
            if(arquivos.find(arquivo => arquivo.name === file.name)) {
                alert("Arquivo com mesmo nome já existe!");
                return
            }
            setArquivos([...arquivos, file]);
        }
    }

    function handleDelete(index : number) {
        setArquivos(arquivos.filter((_, i) => i !== index));
    }

    return (
        <aside className="sidebar">
            <h1 className="sidebar_title">Etapas do Projeto</h1>
            <nav className="sidebar_nav">
                <NavLink 
                    to={`/projetos/${projeto}/roteiro`}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                    aria-label="Roteirização"
                >
                    <i className="fi fi-rr-document"></i>
                    <p>Roteirização</p>
                </NavLink>
                <NavLink 
                    to={`/projetos/${projeto}/esboco`}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                    aria-label="Esboço"
                >
                    <i className="fi fi-rr-layout-fluid"></i>
                    <p>Esboço</p>
                </NavLink>
                <NavLink 
                    to={`/projetos/${projeto}/video`}
                    className={({ isActive }) => isActive ? "sidebar_link active" : "sidebar_link"}
                    aria-label="Geração de vídeo"
                >
                    <i className="fi fi-rr-video-camera-alt"></i>
                    <p>Geração de vídeo</p>
                </NavLink>
            </nav>
            <div className="sidebar_files">
                <hr className="sidebar_divider"/>
                <h1 className="sidebar_title">Arquivos de Projeto</h1>

                {arquivos && arquivos.map((arquivo, index) => (
                    <ArquivoButton key={arquivo.name} arquivo={arquivo} onDelete={() => handleDelete(index)}/>
                ))}

                <input 
                    id="file_upload" 
                    type="file" 
                    className="sidebar_input"
                    ref={inputRef}
                    onChange={handleUpload}
                />
                <label htmlFor="file_upload" className="sidebar_label">Novo Arquivo</label>
            </div>
        </aside>
    )
}