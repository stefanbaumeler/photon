import { Dispatch, useEffect, useState } from 'react'

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T

export const stateFrom = function<T> (data: T, defaultState: DeepPartial<T> ): T {
    const [dataState, setDataState] = useState<T>(defaultState as T)

    useEffect(() => {
        if (data) {
            setDataState(data)
        }
    }, [data])

    return dataState
}

export const sanitizeId = (id?: string | number) => {
    return `${id}`.split('/').pop()
}
