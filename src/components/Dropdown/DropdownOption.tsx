type DropDownOptionProps = {
    name: string;
    icon: string;
    image?: boolean;
    selected: boolean;
    index: number;
    onSelect: (index: number) => void;
}

export default function DropdownOption({ name, icon, image, index, onSelect }: DropDownOptionProps) {
    return (
        <button 
            className="dropdown_option"
            onClick={() => onSelect(index)}
        >
            {image ? <img src={icon} alt={name} /> : <i className={icon}></i>}
            <p>{name}</p>
        </button>
    )
}