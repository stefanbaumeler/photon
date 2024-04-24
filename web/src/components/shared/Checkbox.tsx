import { forwardRef, ReactElement, Ref } from 'react'
import { Placement } from 'tippy.js'
import { Tooltip } from '@/components/shared/Tooltip'

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
    const Box = (_: { children: ReactElement }, ref: Ref<unknown>) => {
        return <div className="checkbox">
            {label ? <label
                htmlFor={id}
                className="checkbox__label"
            >
                {label}
            </label> : null}
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

    return <Tooltip
        hint={hint}
        placement={hintPlacement}
    >
        <CheckboxWithRef>
            <>
                {label}
            </>
        </CheckboxWithRef>
    </Tooltip>
}
