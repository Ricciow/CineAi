import type { buttonStyle } from "./ButtonProps";

export type ArquivoButtonProps = { 
    arquivo: File, 
    onClick?: () => void, 
    onDelete?: () => void
    style: buttonStyle
};

export default function ArquivoButton({ arquivo, onClick, onDelete }: ArquivoButtonProps) {
    return (
        <label htmlFor="arquivo_button" className="arquivo_button sidebar_label">
            <button 
                id="arquivo_button" 
                className="download_arquivo_button"
                onClick={onClick}
            >
                {arquivo.name}
            </button>
            <button 
                className="delete_arquivo_button"
                onClick={onDelete}
            >
                <i className="fi fi-rs-trash delete_arquivo_button_icon"></i>
            </button>
        </label>
    )
}