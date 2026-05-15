import { useEffect, useRef, useState } from "react";
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
    disabled?: boolean;
    onSelect: (value: any, index: number) => void;
}

export default function Dropdown({ title, options, selected = 0, titleByOption = false, onSelect, disabled = false }: DropDownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (open && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    const selectedOption = options[selected];

    function handleClick() {
        if (!disabled) {
            setOpen(!open);
        }
    }

    function handleSelect(index: number) {
        onSelect(options[index].value, index);
        setOpen(false);
    }

    return (
        <div className={`dropdown ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
            <button
                onClick={handleClick}
                className="dropbtn"
                disabled={disabled}
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