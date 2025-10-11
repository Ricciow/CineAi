import { useState, type ChangeEvent } from "react";
import Button from "../Buttons/Button";

export default function ProjetoSidebar({ projeto }: { projeto: string }) {
    const [arquivos, setArquivos] = useState<File[]>([]);

    //Propriamente enviar/deletar arquivos no futuro
    function handleUpload(e : ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        
        if (files) {
            const file = files[0];
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
                <Button
                    to={`/projetos/${projeto}/roteiro`}
                    type="sidebar"
                    iconClass="fi fi-rr-document"
                    text="Roteirização"
                />
                <Button
                    to={`/projetos/${projeto}/imagem`}
                    type="sidebar"
                    iconClass="fi fi-rr-layout-fluid"
                    text="Esboço"
                />
                <Button 
                    to={`/projetos/${projeto}/video`} 
                    type="sidebar" 
                    iconClass="fi fi-rr-video-camera-alt" 
                    text="Geração de vídeo" 
                />
            </nav>
            <div className="sidebar_files">
                <hr className="sidebar_divider"/>
                <h1 className="sidebar_title">Arquivos de Projeto</h1>

                {arquivos && arquivos.map((arquivo, index) => (
                    <Button key={arquivo.name} file={arquivo} onDelete={() => handleDelete(index)} style="sidebar_label"/>
                ))}

                <Button 
                    fileInput 
                    text="Novo Arquivo" 
                    onChange={handleUpload} 
                    style="sidebar_label"
                />
            </div>
        </aside>
    )
}