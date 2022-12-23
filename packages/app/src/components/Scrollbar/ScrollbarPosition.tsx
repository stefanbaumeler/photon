import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const SBP = () => {
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

export const ScrollbarPosition = dynamic(() => Promise.resolve(SBP), {
    ssr: false
})
