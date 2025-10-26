type FormTitleProps = {
    title: string;
    description?: string;
}

export default function FormTitle({ title, description }: FormTitleProps) {
    return (
        <div className="form_title_container"> 
            <h1 className="form_title">{title}</h1>
            {description && <p className="form_description">{description}</p>}
        </div>
    )
}