import { ChangeEvent, forwardRef, Ref } from 'react'

type Props = {
    id: string
    label?: string
    placeholder?: string
    type?: string
    value?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    testId?: string
}
const TextBoxEl = ({
    id, label, placeholder = '', type = 'text', value, onChange, testId
}: Props, ref: Ref<null>) => {
    return <div className="input">
        {label ? <label
            htmlFor={id}
            className="input__label"
        >
            {label}
        </label> : null}
        <input
            ref={ref}
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

export const TextBox = forwardRef(TextBoxEl)
