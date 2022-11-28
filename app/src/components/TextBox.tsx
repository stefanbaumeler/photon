type Props = {
    id: string
    label?: string
    placeholder?: string
    type?: string
}
const TextBox = ({
    id, label, placeholder = '', type = 'text'
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
        />
    </div>
}

export default TextBox
