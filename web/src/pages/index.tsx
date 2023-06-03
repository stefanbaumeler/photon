import Layout from '../layouts/layout'
import { Details, Dialog, Media, Uploader } from 'web/src/components'
import { DetailsProvider } from 'web/src/providers'
import { useToggleRefinement } from 'react-instantsearch-hooks'
import { useEffect } from 'react'

const HomePage = () => {
    const archivedMenu = useToggleRefinement({
        attribute: 'isArchived',
        on: true,
        off: false
    })

    const trashMenu = useToggleRefinement({
        attribute: 'isTrash',
        on: true,
        off: false
    })

    useEffect(() => {
        archivedMenu.refine({
            isRefined: true
        })
    }, [archivedMenu.canRefine])

    useEffect(() => {
        trashMenu.refine({
            isRefined: true
        })
    }, [trashMenu.canRefine])

    return <Layout>
        <Dialog />
        <Uploader />
        <DetailsProvider>
            <Details />
            <Media />
        </DetailsProvider>
    </Layout>
}

export default HomePage
