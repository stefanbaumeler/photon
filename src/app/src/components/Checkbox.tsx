import Tippy from '@tippyjs/react'
import { forwardRef, ReactElement, Ref } from 'react'
import { Placement } from 'tippy.js'

type Props = {
    id: string
    onClick?: () => void
    hint?: string
    hintPlacement?: Placement
    label?: string
    href?: string
    testId?: string
}

export const Checkbox = ({
    id, onClick, hint, hintPlacement, label, testId
}: Props) => {
    const ConditionalTip = ({ children }: { children: ReactElement }) => {
        if (hint) {
            return <Tippy
                content={hint}
                placement={hintPlacement}
            >
                {children}
            </Tippy>
        }

        return <>
            {children}
        </>
    }

    const Box = (_: { children: ReactElement }, ref: Ref<unknown>) => {
        const Label = () => label ? <label
            htmlFor={id}
            className="checkbox__label"
        >
            {label}
        </label> : <></>

        return <div className="checkbox">
            <Label />
            <input
                id={id}
                type="checkbox"
                ref={ref as Ref<HTMLInputElement>}
                className="checkbox__input"
                onClick={onClick}
                data-testid={testId}
            />
            <div className="checkbox__box"></div>
        </div>
    }

    const CheckboxWithRef = forwardRef(Box)

    return <ConditionalTip>
        <CheckboxWithRef>
            <>
                {label}
            </>
        </CheckboxWithRef>
    </ConditionalTip>
}
