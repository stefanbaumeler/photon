type BinaryHeapElement = {
    id: string
    weight: number
}

class BinaryHeap {
    content: BinaryHeapElement[] = []

    scoreFunction

    constructor (scoreFunction: (n: BinaryHeapElement) => void) {
        this.scoreFunction = scoreFunction
    }

    push (element: BinaryHeapElement) {
        this.content.push(element)
        this.bubbleUp(this.content.length - 1)
    }

    pop () {
        const result = this.content[0]
        const end = this.content.pop()
        if (this.content.length > 0) {
            this.content[0] = end
            this.sinkDown(0)
        }
        return result
    }

    remove (node: BinaryHeapElement) {
        const length = this.content.length
        for (let i = 0; i < length; i++) {
            if (this.content[i] != node) {
                continue
            }
            const end = this.content.pop()
            if (i == length - 1) {
                break
            }
            this.content[i] = end
            this.bubbleUp(i)
            this.sinkDown(i)
            break
        }
    }

    size () {
        return this.content.length
    }

    bubbleUp (n: number) {
        const element = this.content[n]
        const score = this.scoreFunction(element)

        while (n > 0) {
            const parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.content[parentN]
            if (score >= this.scoreFunction(parent)) {
                break
            }
            this.content[parentN] = element
            this.content[n] = parent
            n = parentN
        }
    }

    sinkDown (n: number) {
        const length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element)

        const T = true

        while (T) {
            const child2N = (n + 1) * 2,
                child1N = child2N - 1
            let swap = null
            let child1Score = undefined

            if (child1N < length) {
                const child1 = this.content[child1N]

                child1Score = this.scoreFunction(child1)
                if (child1Score < elemScore) {
                    swap = child1N
                }
            }

            if (child2N < length) {
                const child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2)
                if (child2Score < (swap == null ? elemScore : child1Score)) {
                    swap = child2N
                }
            }

            if (swap == null) {
                break
            }

            this.content[n] = this.content[swap]
            this.content[swap] = element
            n = swap
        }
    }
}

export default BinaryHeap
