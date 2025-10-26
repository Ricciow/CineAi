import { useState, type ChangeEvent } from "react"

type FormFieldProps = {
    type: string,
    name?: string,
    title?: string,
    placeholder?: string,
    required?: boolean,
    value?: string,
    onChange?: (e : ChangeEvent<HTMLInputElement>) => void
}

export default function FormField({ type, name, title, placeholder, required, value, onChange }: FormFieldProps) {
    const [valueState, setValueState] = useState(value);
    
    function handleChange(e : ChangeEvent<HTMLInputElement>) {
        setValueState(e.target.value)
        onChange && onChange(e);
    }

    return (
        <div className="form_input_container">
            {type !== "submit" && title && <p className="form_label">{title}</p>}
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                required={required} 
                value={valueState} 
                onChange={handleChange}
                className="form_input"
            /> 
        </div>
    )
}