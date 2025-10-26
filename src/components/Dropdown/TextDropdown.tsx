import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TextDropdownProps = {
    icon?: string
    title?: string
    text: string
}

export default function TextDropdown({ icon, title, text } : TextDropdownProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="text-dropdown">
            <button className="dropbtn" onClick={() => setOpen(!open)}>
                {icon && <i className={icon}></i>}
                <p>{title}</p>
                <i className={`fi fi-br-angle-${open ? "up" : "down"}`}></i>
            </button>
            <div className={open ? "" : " hidden"}>
                <div className="text-dropdown-content">
                    <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
                </div>
                <hr className="dropdownSplitter"></hr>
            </div>
        </div>
    )
}