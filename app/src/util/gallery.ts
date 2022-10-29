import { findShortestPath } from '@/util/dijkstra'
import { GalleryItem } from '@/types/app'

type TGalleryConfig = {
    containerWidth: number
    images: GalleryItem[]
    targetRowHeight: number
    margin: number
    maxHeight: number
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

        results[i.toString()] = Math.pow(Math.abs(getCommonHeight(config.images.slice(startNum, i), config) - Math.sqrt(config.targetRowHeight * window.innerWidth) / 2.5), 2)
    }

    return results
}

export const generateGallery = (config: TGalleryConfig): Promise<GalleryItem[]> => {
    const cfg = {
        ...config
    }

    return new Promise((resolve) => {
        const idealNodeSearch = cfg.containerWidth >= 450 ? Math.round(cfg.containerWidth / cfg.targetRowHeight / 1.5 * 100) / 100 + 8 : 2
        const getNeighbors = makeGetNeighbors(idealNodeSearch, cfg)
        const path = findShortestPath(getNeighbors, '0', cfg.images.length).map((node) => +node)

        for (let i = 1; i < path.length; ++i) {
            const calculatedHeight = getCommonHeight(cfg.images.slice(path[i - 1], path[i]), cfg)
            const height = calculatedHeight > cfg.maxHeight * 2 ? cfg.targetRowHeight : Math.min(calculatedHeight, cfg.maxHeight)
            for (let j = path[i - 1]; j < path[i]; ++j) {
                cfg.images[j].width = Math.round(height * cfg.images[j].ratio * 100) / 100
                cfg.images[j].height = height
            }
        }

        resolve(cfg.images)
    })
}
