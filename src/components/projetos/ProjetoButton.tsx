export default function ProjetoButton({ onClick }: { onClick?: () => void }) {
    return (
        <button 
            className="projeto_button"
            onClick={onClick}
        >
            <i className="fi fi-rr-add"></i>
            <p>Novo Chat de Roteiro</p>
        </button>
    )

}