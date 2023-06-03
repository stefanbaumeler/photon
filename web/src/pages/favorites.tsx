import Layout from '../layouts/layout'
import { Uploader, Details, Dialog, Media } from '@/components'
import { DetailsProvider } from '@/providers'
import { useToggleRefinement } from 'react-instantsearch-hooks'
import { useEffect } from 'react'

const FavoritesPage = () => {
    const favoritesMenu = useToggleRefinement({
        attribute: 'isFavorite',
        on: false,
        off: true
    })

    useEffect(() => {
        favoritesMenu.refine({
            isRefined: true
        })
    }, [favoritesMenu.canRefine])

    const notTrashMenu = useToggleRefinement({
        attribute: 'isTrash',
        on: true,
        off: false
    })

    useEffect(() => {
        notTrashMenu.refine({
            isRefined: true
        })
    }, [notTrashMenu.canRefine])

    return <Layout>
        <section>
            <div>
                <Dialog />
                <Uploader />
                <DetailsProvider>
                    <Details />
                    <Media />
                </DetailsProvider>
            </div>
        </section>
    </Layout>
}

export default FavoritesPage
