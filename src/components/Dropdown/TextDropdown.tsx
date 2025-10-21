import { useState } from "react";

type TextDropdownProps = {
    icon?: string
    title?: string
    text: string
}

export default function TextDropdown({ icon, title, text } : TextDropdownProps) {
    const [open, setOpen] = useState(false);
    const linhasText = text.split("\n");

    return (
        <div className="text-dropdown">
            <button className="dropbtn" onClick={() => setOpen(!open)}>
                {icon && <i className={icon}></i>}
                <p>{title}</p>
                <i className={`fi fi-br-angle-${open ? "up" : "down"}`}></i>
            </button>
            <div className={open ? "" : " hidden"}>
                <p>{linhasText.map((linha, index) => <>{linha}<br key={index}/></>)}</p>
                <hr className="dropdownSplitter"></hr>
            </div>
        </div>
    )
}