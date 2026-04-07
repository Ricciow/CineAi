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
    onSelect: (value: any, index: number) => void;
}

export default function Dropdown({ title, options, selected = 0, titleByOption = false, onSelect }: DropDownProps) {
    const [open, setOpen] = useState(false);

    const selectedOption = options[selected];

    function handleClick() {
        setOpen(!open);
    }

    function handleSelect(index: number) {
        onSelect(options[index].value, index);
        setOpen(false);
    }

    return (
        <div className="dropdown">
            <button
                onClick={handleClick}
                className="dropbtn"
            >
                <div className="dropbtn_left">
                    {titleByOption && selectedOption && (
                        selectedOption.image ? 
                            <img src={selectedOption.icon} alt={selectedOption.name} className="dropbtn_icon" /> : 
                            selectedOption.icon && <i className={`${selectedOption.icon} dropbtn_icon`}></i>
                    )}
                    <span className="dropbtn_title">
                        {titleByOption ? (selectedOption?.name ?? title) : title}
                    </span>
                </div>
                <i className={`fi fi-br-angle-${open ? "up" : "down"}`}></i>
            </button>
            <div className={`dropdown-content` + (open ? "" : " invisible")}>
                {options.map((option, index) => <DropdownOption key={index} {...option} index={index} selected={index === selected} onSelect={handleSelect} />)}
            </div>
        </div>
    )
}