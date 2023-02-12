import { useEffect, useState } from 'react'
import { useInstantSearch } from 'react-instantsearch-hooks-web'
import { Middleware } from 'instantsearch.js/es/types'

export const SearchError = () => {
    const { use } = useInstantSearch()
    const [error, setError] = useState(null)

    useEffect(() => {
        const middleware: Middleware = ({ instantSearchInstance }) => {
            function handleError (searchError: string) {
                setError(searchError)
            }

            return {
                subscribe () {
                    instantSearchInstance.addListener('error', handleError)
                },
                unsubscribe () {
                    instantSearchInstance.removeListener('error', handleError)
                }
            }
        }

        return use(middleware)
    }, [use])

    return <></>
}
