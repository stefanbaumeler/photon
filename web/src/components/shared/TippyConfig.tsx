'use client'

import tippy, { followCursor } from 'tippy.js'

export const TippyConfig = () => {
    tippy.setDefaultProps({
        zIndex: 101,
        plugins: [followCursor]
    })

    return null
}
