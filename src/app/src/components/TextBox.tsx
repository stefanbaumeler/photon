import { ChangeEvent } from 'react'

type Props = {
    id: string
    label?: string
    placeholder?: string
    type?: string
    value?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    testId?: string
}

export const TextBox = ({
    id, label, placeholder = '', type = 'text', value, onChange, testId
}: Props) => {
    const Label = () => label ? <label
        htmlFor={id}
        className="input__label"
    >
        {label}
    </label> : <></>

    return <div className="input">
        <Label />
        <input
            data-testid={testId}
            id={id}
            type={type}
            className="input__input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
}
