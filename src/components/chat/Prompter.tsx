import { useEffect, useRef, useState } from "react";

type PrompterProps = {
    onSubmit?: (text: string) => void;
    value?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
};

export default function Prompter({ onSubmit = () => {}, value, onValueChange, disabled = false }: PrompterProps) {
    const [localText, setLocalText] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Use controlled value if provided, otherwise use local state
    const text = value !== undefined ? value : localText;

    useEffect(() => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        if (disabled) return;
        const newVal = event.target.value;
        if (onValueChange) {
            onValueChange(newVal);
        } else {
            setLocalText(newVal);
        }
    };

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!disabled) handleSubmit();
        }
    };

    function handleSubmit() {
        if (text.trim().length === 0 || disabled) return;
        onSubmit(text);
        if (!onValueChange) {
            setLocalText("");
        }
    };

    const isButtonDisabled = text.trim().length === 0 || disabled;

    return (
        <div className={`prompter ${disabled ? 'disabled' : ''}`}>
            <textarea
                className="prompter_input"
                id="prompter_input"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={textAreaRef}
                placeholder={disabled ? "Você não tem permissão para enviar mensagens" : "Digite sua mensagem aqui..."}
                disabled={disabled}
            />
            <button 
                className="send_button" 
                onClick={handleSubmit}
                disabled={isButtonDisabled}
            >
                <i className="fi fi-rr-paper-plane-top" />
            </button>
        </div>
    );
}