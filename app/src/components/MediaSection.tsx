import { TMedia } from '@/types/api'
import { Medium } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { findShortestPath } from '@/util/dijkstra'

type GalleryItem = {
    medium: TMedia
    ratio: number
    width?: number
    height?: number
}

type Props = {
    media: TMedia[]
}

const MediaSection = ({ media }: Props) => {
    const galleryEl = useRef(null)
    const [containerWidth, setContainerWidth] = useState(0)
    const [images, setImages] = useState<GalleryItem[]>([])
    const targetRowHeight = 300
    const margin = 2

    useEffect(() => {
        setImages(media
            .map((medium) => ({
                medium,
                ratio: medium.height > medium.width ? 1 / (medium.height / medium.width) : medium.width / medium.height
            }))
        )
    }, [media])

    useEffect(() => {
        let animationFrameID: number = null

        const observer = new ResizeObserver((entries) => {
            const newWidth = entries[0].contentRect.width

            if (containerWidth !== newWidth) {
                animationFrameID = window.requestAnimationFrame(() => {
                    setContainerWidth(Math.floor(newWidth))
                })
            }
        })

        observer.observe(galleryEl.current)

        return () => {
            observer.disconnect()
            window.cancelAnimationFrame(animationFrameID)
        }
    })

    const getCommonHeight = (row: GalleryItem[]) => {
        const rowWidth = containerWidth - row.length * (margin * 2)
        const totalAspectRatio = row.reduce((acc, photo) => acc + photo.ratio, 0)
        return rowWidth / totalAspectRatio
    }

    const makeGetNeighbors = (limitNodeSearch: number) => (start: string) => {
        const results: {[key: string]: number} = {}
        const startNum = +start
        results[+start] = 0

        for (let i = startNum + 1; i < images.length + 1; ++i) {
            if (i - startNum > limitNodeSearch) {
                break
            }

            results[i.toString()] = Math.pow(Math.abs(getCommonHeight(images.slice(startNum, i)) - targetRowHeight), 2)
        }

        return results
    }

    const generateGallery = () => {
        const idealNodeSearch = containerWidth >= 450 ? Math.round(containerWidth / targetRowHeight / 1.5 * 100) / 100 + 8 : 2
        const getNeighbors = makeGetNeighbors(idealNodeSearch)
        const path = findShortestPath(getNeighbors, '0', images.length).map((node) => +node)

        for (let i = 1; i < path.length; ++i) {
            const height = getCommonHeight(images.slice(path[i - 1], path[i]))

            for (let j = path[i - 1]; j < path[i]; ++j) {
                images[j].width = Math.round(height * images[j].ratio * 100) / 100
                images[j].height = height
            }
        }
    }

    generateGallery()

    return <div
        className="media-section"
        ref={galleryEl}
    >
        <div
            className="media-section__container"
            style={{
                width: containerWidth || 'auto'
            }}
        >
            {images.map((galleryItem, k) => <Medium
                collection={media}
                medium={galleryItem.medium}
                width={galleryItem.width}
                height={galleryItem.height}
                key={k}
            />)}
        </div>
    </div>
}

export default MediaSection
