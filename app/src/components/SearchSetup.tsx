import { useEffect, useState } from 'react'
import { useHitsPerPage, useInstantSearch } from 'react-instantsearch-hooks-web'
import { Middleware } from 'instantsearch.js/es/types'

export const SearchSetup = () => {
    const { use } = useInstantSearch()
    const [error, setError] = useState(null)

    useHitsPerPage({
        items: [{
            label: '',
            value: 250,
            default: true
        }]
    })

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
