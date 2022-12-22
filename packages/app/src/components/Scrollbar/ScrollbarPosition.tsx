import { useEffect, useState } from 'react'

export const ScrollbarPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0)

    const scroll = () => {
        setScrollPosition(document.documentElement.scrollTop)
    }

    useEffect(() => {
        window.addEventListener('scroll', scroll)

        return () => window.removeEventListener('scroll', scroll)
    })

    return <span
        className="scrollbar__position"
        style={{
            translate: `0 ${scrollPosition / (document.documentElement.scrollHeight - window.innerHeight) * (window.innerHeight - 88) - 1}px`
        }}
    ></span>
}
