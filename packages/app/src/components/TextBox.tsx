import { ChangeEvent } from 'react'

type Props = {
    id: string
    label?: string
    placeholder?: string
    type?: string
    value?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}
const TextBox = ({
    id, label, placeholder = '', type = 'text', value, onChange
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
            id={id}
            type={type}
            className="input__input"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
}

export default TextBox
