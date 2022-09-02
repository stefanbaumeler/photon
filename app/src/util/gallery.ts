import { findShortestPath } from '@/util/dijkstra'
import { GalleryItem } from '@/types/app'

type TGalleryConfig = {
    containerWidth: number
    images: GalleryItem[]
    targetRowHeight: number
    margin: number
}

const getCommonHeight = (row: GalleryItem[], config: TGalleryConfig) => {
    const rowWidth = config.containerWidth - row.length * (config.margin * 2)
    const totalAspectRatio = row.reduce((acc, photo) => acc + photo.ratio, 0)
    return rowWidth / totalAspectRatio
}

const makeGetNeighbors = (limitNodeSearch: number, config: TGalleryConfig) => (start: string) => {
    const results: {[key: string]: number} = {}
    const startNum = +start
    results[+start] = 0

    for (let i = startNum + 1; i < config.images.length + 1; ++i) {
        if (i - startNum > limitNodeSearch) {
            break
        }

        results[i.toString()] = Math.pow(Math.abs(getCommonHeight(config.images.slice(startNum, i), config) - config.targetRowHeight), 2)
    }

    return results
}

export const generateGallery = (config: TGalleryConfig) => {
    const idealNodeSearch = config.containerWidth >= 450 ? Math.round(config.containerWidth / config.targetRowHeight / 1.5 * 100) / 100 + 8 : 2
    const getNeighbors = makeGetNeighbors(idealNodeSearch, config)
    const path = findShortestPath(getNeighbors, '0', config.images.length).map((node) => +node)

    for (let i = 1; i < path.length; ++i) {
        const height = getCommonHeight(config.images.slice(path[i - 1], path[i]), config)

        for (let j = path[i - 1]; j < path[i]; ++j) {
            config.images[j].width = Math.round(height * config.images[j].ratio * 100) / 100
            config.images[j].height = height
        }
    }
}
