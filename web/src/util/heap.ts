type Comparator<T> = (a: T, b: T) => number

export const RankingFunctionComparator =
    <T>(rank: (element: T) => number) =>
        (a: T, b: T) =>
            rank(b) - rank(a)

const MinHeap = <T>(comparator: Comparator<T>) => {
    const heap: T[] = []
    const compare = comparator
    let n = 0

    const greater = (i: number, j: number) => compare(heap[i], heap[j]) < 0

    const swap = (i: number, j: number) => {
        const temp = heap[i]
        heap[i] = heap[j]
        heap[j] = temp
    }

    const swim = (i: number) => {
        let k = i
        let k2 = Math.floor(k / 2)
        while (k > 1 && greater(k2, k)) {
            swap(k2, k)
            k = k2
            k2 = Math.floor(k / 2)
        }
    }

    const sink = (i: number) => {
        let k = i
        let k2 = k * 2
        while (k2 <= n) {
            if (k2 < n && greater(k2, k2 + 1)) {k2 += 1}
            if (!greater(k, k2)) {break}
            swap(k, k2)
            k = k2
            k2 = k * 2
        }
    }

    return {
        push: (element: T) => {
            n += 1
            heap[n] = element
            swim(n)
        },

        pop: (): T | undefined => {
            if (n === 0) {return undefined}
            swap(1, n)
            n -= 1
            const max = heap.pop()
            sink(1)
            return max
        },

        size: (): number => n
    }
}

export default MinHeap
