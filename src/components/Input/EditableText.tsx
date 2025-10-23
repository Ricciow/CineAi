import { useEffect, useRef, useState } from "react";
import Button from "../Buttons/Button"

type EditableTextProps = {
    startingText: string,
    onSubmit?: (text: string) => void
    className?: string
    maxLength?: number
    allowEmpty?: boolean
}

export default function EditableText({ startingText, onSubmit, className, maxLength, allowEmpty}: EditableTextProps) {
    const [text, setText] = useState(startingText);
    const [editing, setEditing] = useState(false);
    const [hovered, setHovered] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    function handleEnableEdit() {
        if(editing && text !== startingText) {
            onSubmit && onSubmit(text);
        }
        setEditing(true);
    }

    function handleDisableEdit() {
        if(!allowEmpty && text === "") return;
        setEditing(false);
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if(maxLength && event.target.value.length > maxLength) {
            inputRef.current!.value = text;
            return;
        }
        setText(event.target.value);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event.key == "Enter") {
            handleDisableEdit();
        }
    }

    return (
        <div className={className} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >
            {editing ? <input value={text} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={() => {handleDisableEdit()}} ref={inputRef}/> : <p>{text}</p>}
            {!editing && <Button onClick={handleEnableEdit} className={`editable_text_button ${!hovered ? "invisible" : ""}`} iconClass="fi fi-rr-pencil"/>}
        </div>
    )
}