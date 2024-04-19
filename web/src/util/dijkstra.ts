import MinHeap, { RankingFunctionComparator } from './heap'

type GraphFunction<T> = (node: T) => Map<T, number>

const buildPrecedentsMap = <T>(graph: GraphFunction<T>, startNode: T, endNode: T) => {
    const precedentsMap = new Map<T, T>()
    const visited = new Set<T>()
    const storedShortestPaths = new Map<T, number>()

    storedShortestPaths.set(startNode, 0)

    const pQueue = MinHeap<{ id: T, weight: number }>(RankingFunctionComparator((el) => el.weight))
    pQueue.push({
        id: startNode,
        weight: 0
    })

    while (pQueue.size() > 0) {
        const pQueueValue = pQueue.pop()

        if (!pQueueValue) {
            return undefined
        }

        const {
            id, weight
        } = pQueueValue

        if (!visited.has(id)) {
            const neighboringNodes = graph(id)
            visited.add(id)

            neighboringNodes.forEach((neighborWeight, neighbor) => {
                const newWeight = weight + neighborWeight
                const currentId = precedentsMap.get(neighbor)
                const currentWeight = storedShortestPaths.get(neighbor)

                if (
                    currentWeight === undefined ||
                    currentWeight > newWeight &&
                        (currentWeight / newWeight > 1.005 || currentId !== null && currentId !== undefined && currentId < id)
                ) {
                    storedShortestPaths.set(neighbor, newWeight)
                    pQueue.push({
                        id: neighbor,
                        weight: newWeight
                    })
                    precedentsMap.set(neighbor, id)
                }
            })
        }
    }

    return storedShortestPaths.has(endNode) ? precedentsMap : undefined
}

const getPathFromPrecedentsMap = <T>(precedentsMap: Map<T, T>, endNode: T) => {
    const nodes = []
    for (let node: T | undefined = endNode; node !== undefined; node = precedentsMap.get(node)) {
        nodes.push(node)
    }
    return nodes.reverse()
}

const findShortestPath = <T>(graph: GraphFunction<T>, startNode: T, endNode: T) => {
    const precedentsMap = buildPrecedentsMap(graph, startNode, endNode)
    return precedentsMap ? getPathFromPrecedentsMap(precedentsMap, endNode) : undefined
}

export default findShortestPath
