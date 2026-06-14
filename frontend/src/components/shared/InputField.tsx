import type { ChangeEvent } from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputFieldCheckboxProps {
    label: string;
    type: string;
    value: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ label, type, value, onChange }: InputFieldProps) {
    return (
        <div>
            <label>{label} :</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export function InputFieldCheckbox({ label, type, value, onChange }: InputFieldCheckboxProps) {
    return (
        <div>
            <label>{label} :</label>
            <input
                type={type}
                checked={value}
                onChange={onChange}
            />
        </div>
    );
}