export const asArray = <T, >(arr: T[] | Set<T> | T) => {
    if (Array.isArray(arr)) {
        return arr
    }

    if (arr instanceof Set) {
        return [...arr]
    }

    return [arr]
}
