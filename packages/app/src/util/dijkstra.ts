import BinaryHeap from './binary-heap'

const buildPrecedentsMap = (graph: (start: string) => {[key: number]: number}, startNode: string, endNode: number) => {
    const precedentsMap: { [key: string]: string} = {}

    const visited: { [key: string]: number} = {}

    const storedShortestPaths = {} as { [key: string]: number }

    storedShortestPaths[startNode] = 0

    const pQueue = new BinaryHeap((n) => n.weight)

    pQueue.push({
        id: startNode,
        weight: 0
    })

    while (pQueue.size()) {
        const shortestNode = pQueue.pop()
        const shortestNodeId = shortestNode.id

        if (visited[shortestNodeId]) {continue}

        const neighboringNodes = graph(shortestNodeId) || {}
        visited[shortestNodeId] = 1

        for (const neighbor in neighboringNodes) {
            const newTotalWeight = shortestNode.weight + neighboringNodes[neighbor]

            if (typeof storedShortestPaths[neighbor] === 'undefined' || storedShortestPaths[neighbor] > newTotalWeight) {
                storedShortestPaths[neighbor] = newTotalWeight
                pQueue.push({
                    id: neighbor,
                    weight: newTotalWeight
                })

                precedentsMap[neighbor] = shortestNodeId
            }
        }
    }

    if (typeof storedShortestPaths[endNode] === 'undefined') {
        throw new Error(`There is no path from ${startNode} to ${endNode}`)
    }

    return precedentsMap
}

const getPathFromPrecedentsMap = (precedentsMap: { [key: string]: string}, endNode: number) => {
    const nodes = []
    let n = endNode as string | number | undefined
    while (n) {
        nodes.push(n)
        n = precedentsMap[n]
    }
    return nodes.reverse()
}

export const findShortestPath = (graph: (start: string) => {[key: number]: number}, startNode: string, endNode: number) => {
    const precedentsMap = buildPrecedentsMap(graph, startNode, endNode)
    return getPathFromPrecedentsMap(precedentsMap, endNode)
}
