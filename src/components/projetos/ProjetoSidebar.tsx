import { useState } from "react";
import Button from "../Buttons/Button";
import ComingSoonModal from "../Outros/ComingSoonModal";

export default function ProjetoSidebar({ projeto, isOpen, toggleSidebar }: { projeto: string, isOpen: boolean, toggleSidebar: () => void }) {
    const [arquivos, setArquivos] = useState<File[]>([]);
    const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

    function handleDelete(index : number) {
        setArquivos(arquivos.filter((_, i) => i !== index));
    }

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar_header mobile_only">
                <button className="sidebar_close" onClick={toggleSidebar}>
                    <i className="fi fi-br-cross"></i>
                </button>
            </div>
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
                    text="Novo Arquivo"
                    onClick={() => setIsComingSoonOpen(true)}
                    style="sidebar_label"
                />
            </div>
            
            <ComingSoonModal 
                isOpen={isComingSoonOpen} 
                onClose={() => setIsComingSoonOpen(false)} 
            />
        </aside>
    )
}