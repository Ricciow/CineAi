export default function ProjetoTitle({ title, description}: { title: string, description?: string }) {
    return (
        <div className="projeto_header_title"> 
            <h1 className="projeto_title">{title}</h1>
            {description && <p className="projeto_description">{description}</p>}
        </div>
    )
}