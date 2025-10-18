import { useEffect, useRef, useState } from "react";

type PrompterProps = {
    onSubmit?: (text: string) => void;
};

export default function Prompter({ onSubmit = () => {} }: PrompterProps) {
    const [text, setText] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [text]);

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setText(event.target.value);
    };

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    function handleSubmit() {
        onSubmit(text);
        setText("");
    };

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
            <button className="send_button" onClick={handleSubmit}>
                <i className="fi fi-rr-paper-plane-top" />
            </button>
        </label>
    );
}