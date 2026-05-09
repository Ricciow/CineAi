import { useEffect, useRef, useState } from "react";

type PrompterProps = {
    onSubmit?: (text: string) => void;
    value?: string;
    onValueChange?: (value: string) => void;
};

export default function Prompter({ onSubmit = () => {}, value, onValueChange }: PrompterProps) {
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
            handleSubmit();
        }
    };

    function handleSubmit() {
        if (text.trim().length === 0) return;
        onSubmit(text);
        if (!onValueChange) {
            setLocalText("");
        }
    };

    const isButtonDisabled = text.trim().length === 0;

    return (
        <label className={`prompter`} htmlFor="prompter_input">
            <textarea
                className="prompter_input"
                id="prompter_input"
                value={text}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                ref={textAreaRef}
                placeholder="Digite sua mensagem aqui..."
            />
            <button 
                className="send_button" 
                onClick={handleSubmit}
                disabled={isButtonDisabled}
            >
                <i className="fi fi-rr-paper-plane-top" />
            </button>
        </label>
    );
}