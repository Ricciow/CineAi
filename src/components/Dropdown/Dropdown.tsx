import { useState } from "react";
import DropdownOption from "./DropdownOption";

type Option = {
    name: string;
    icon: string;
    image?: boolean;
    value: any;
}

type DropDownProps = {
    title: string;
    options: Option[];
    selected?: number;
    titleByOption?: boolean;
    onSelect: (value: any) => void;
}

export default function Dropdown({ title, options, selected = 0, titleByOption = false, onSelect }: DropDownProps) {
    const [open, setOpen] = useState(false);

    const [titleUsed, setTitleUsed] = useState(titleByOption ? (options[selected]?.name) ?? title : title);

    function handleClick() {
        setOpen(!open);
    }

    function handleSelect(index: number) {
        onSelect(options[index].value);
        setTitleUsed(titleByOption ? (options[index]?.name) ?? title : title);
        setOpen(false);
    }

    return (
        <div className="dropdown">
            <button
                onClick={handleClick}
                className="dropbtn"
            >
                {titleUsed}
                <i className={`fi fi-br-angle-${open ? "up" : "down"}`}></i>
            </button>
            <div className={`dropdown-content` + (open ? "" : " invisible")}>
                {options.map((option, index) => <DropdownOption key={index} {...option} index={index} selected={index === selected} onSelect={handleSelect} />)}
            </div>
        </div>
    )
}