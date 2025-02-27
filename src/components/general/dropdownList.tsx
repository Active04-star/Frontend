import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
    label: string;
    options: string[];
    onSelect: (value: string) => void;
    replaceLabel: boolean;
}

export default function DropdownList({ label, options, onSelect, replaceLabel }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const clickOut = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOut);

        return () => {
            setSelected(null);
            document.removeEventListener("mousedown", clickOut);
        }
    }, []);

    const handleSelected = (option: string) => {
        onSelect(option);
        setSelected(option);
    };

    return (
        <div ref={divRef} className="relative inline-block text-left w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={"flex w-full items-center justify-between px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none " + (selected === null && replaceLabel ? "text-gray-500" : "text-black")}
            >
                {replaceLabel ? selected || label : label}
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute left-0 w-48 mt-2 bg-gray-200 border border-gray-400 rounded-lg shadow-lg z-20">
                    <ul className="py-2">
                        {options.map((option) => (
                            <li key={option}>
                                <button
                                    onClick={() => {
                                        handleSelected(option);
                                        setIsOpen(false);
                                    }}
                                    className="block w-full px-4 py-2 text-left text-black hover:bg-gray-300"
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}