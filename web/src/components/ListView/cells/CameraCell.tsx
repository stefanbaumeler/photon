import { isMedium } from '@/src/util/is'
import { ListCell } from '../ListCell'
import { useListItemContext } from '../ListItemContext'
import { TImageMeta } from 'packages/schema'
import Tippy from '@tippyjs/react'
import { Ref, forwardRef } from 'react'

export const CameraCell = () => {
    const { element } = useListItemContext()

    const cell = 'camera'

    if (!isMedium(element)) {
        return <></>
    }

    if (!element.mimetype?.startsWith('image')) {
        return <></>
    }

    const Tip = () => {
        return <table>
            <tbody>
                <tr>
                    <td>Camera</td>
                    <td>{meta.cameraMake} {meta.cameraModel}</td>
                </tr>
                <tr>
                    <td>f</td>
                    <td>{meta.fNumber}</td>
                </tr>
                <tr>
                    <td>Flash</td>
                    <td>{meta.flash}</td>
                </tr>
                <tr>
                    <td>Focal Length</td>
                    <td>{meta.focalLength}</td>
                </tr>
                <tr>
                    <td>ISO</td>
                    <td>{meta.iso}</td>
                </tr>
            </tbody>
        </table>
    }


    const meta = element.meta as TImageMeta
    return <ListCell cell={cell}>
        <Tippy
            content={<Tip />}
        >
            <span>{meta.cameraModel}</span>
        </Tippy>
    </ListCell>
}
