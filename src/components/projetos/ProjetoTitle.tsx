import EditableText from "../Input/EditableText";

type ProjetoTitleProps = {
    title: string,
    description?: string
    editable?: boolean
    onSubmit?: (text: string) => void
}

export default function ProjetoTitle({ title, description, editable, onSubmit }: ProjetoTitleProps) {
    return (
        <div className="projeto_header_title"> 
            {editable ? <EditableText startingText={title} onSubmit={onSubmit} className="projeto_title" maxLength={30}/> : <h1 className="projeto_title">{title}</h1>}
            {description && <p className="projeto_description">{description}</p>}
        </div>
    )
}