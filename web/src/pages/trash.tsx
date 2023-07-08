import Layout from '../layouts/layout'
import { Details, Dialog, Media, Uploader } from '@/components'
import { DetailsProvider } from '@/providers'
import { useToggleRefinement } from 'react-instantsearch-hooks'
import { useEffect } from 'react'

const TrashPage = () => {
    const trashMenu = useToggleRefinement({
        attribute: 'isTrash',
        on: false,
        off: true
    })

    useEffect(() => {
        trashMenu.refine({
            isRefined: true
        })
    }, [trashMenu])

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

export default TrashPage
