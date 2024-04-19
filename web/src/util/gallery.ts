import findShortestPath from './dijkstra'
import { TMedium } from '@photon/schema'

type TGalleryConfig = {
    containerWidth: number
    images: TMedium[]
    targetRowHeight: number
    margin: number
    maxHeight: number
}

const getCommonHeight = (config: TGalleryConfig, row: TMedium[]) => {
    const rowWidth = config.containerWidth - (row.length - 1) * config.margin * 2 - 2
    const totalAspectRatio = row.reduce((acc, photo) => {
        return acc + photo.meta.width / photo.meta.height
    }, 0)

    return rowWidth / totalAspectRatio
}

const cost = (config: TGalleryConfig, i: number, j: number) => {
    const row = config.images.slice(i, j)
    const commonHeight = getCommonHeight(config, row)
    return commonHeight > 0 ? (commonHeight - config.targetRowHeight) ** 2 * row.length : undefined
}

const makeGetRowNeighbors = (config: TGalleryConfig) => (node: number) => {
    const results = new Map<number, number>()
    results.set(node, 0)

    for (let i = node + 1; i < config.images.length + 1; i += 1) {
        if (i - node > 10) {
            break
        }
        const currentCost = cost(config, node, i)

        if (currentCost === undefined) {
            break
        }

        results.set(i, currentCost)
    }

    return results
}
export const generateGallery = (config: TGalleryConfig) => {
    const getNeighbors = makeGetRowNeighbors(config)
    const path = findShortestPath(getNeighbors, 0, config.images.length)?.map((node) => +node)

    const layout = []

    if (!path) {
        return undefined
    }

    for (let i = 1; i < path.length; i += 1) {
        const row = config.images.slice(path[i - 1], path[i])

        const calculatedHeight = getCommonHeight(config, row)

        const height = calculatedHeight > config.maxHeight ? config.maxHeight : calculatedHeight

        layout.push(
            ...row.map((item) => ({
                height,
                width: height * item.meta.width / item.meta.height
            }))
        )
    }

    return layout
}
