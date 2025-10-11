import { useRef, type ChangeEvent } from "react";
import type { buttonStyle } from "./ButtonProps";

type ArquivoInputButtonProps = {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    style?: buttonStyle
    text?: string
}

export default function ArquivoInputButton({ onChange, style, text}: ArquivoInputButtonProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    
        function handleChange(e : ChangeEvent<HTMLInputElement>) {
            if (onChange) {
                onChange(e);
            }

            const files = e.target.files;
            if (files) {
                inputRef.current!.value = '';
            }

        }

    return (
        <>
            <input 
                id="file_upload" 
                type="file" 
                className="sidebar_input"
                ref={inputRef}
                onChange={handleChange}
            />
            <label htmlFor="file_upload" className={style}>{text}</label>
        </>
    )
}