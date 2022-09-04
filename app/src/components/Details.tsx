import { forwardRef, useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext, SelectionContext } from '@/providers'
import * as Icons from '@mdi/js'
import Tippy from '@tippyjs/react'
import { useDeleteMedia } from '@/types/api'
import { useMedia } from '@/api/hooks'
import { Check, IconButton } from '@/components'

const Details = () => {
    const {
        active, medium, collection,
        openDetails, closeDetails,
        openInfos, closeInfos, infos
    } = useContext(DetailsContext)

    const {
        openDialog, closeDialog
    } = useContext(DialogContext)

    const {
        addSelected, removeSelected, isSelected, isInSelectionMode
    } = useContext(SelectionContext)

    const select = () => {
        if (isSelected(medium)) {
            removeSelected(medium)
        }
        else {
            addSelected(medium)
        }
    }

    const { refetch } = useMedia()

    const [deleteMedium] = useDeleteMedia({
        variables: {
            ids: [medium.id]
        }
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const keydown = (event: KeyboardEvent) => {
            const index = collection.indexOf(medium)

            if (event.key === 'Escape') {
                closeDetails()
            }

            if (event.key === 'ArrowLeft') {
                if (collection[index - 1]) {
                    openDetails(collection[index - 1], collection)
                }
            }

            if (event.key === 'ArrowRight') {
                if (collection[index + 1]) {
                    openDetails(collection[index + 1], collection)
                }
            }
        }

        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('keydown', keydown)
        }
    }, [collection, medium])

    const openAskDeleteDialog = () => {
        openDialog('Remove from Picchu and all synced devices?', [
            {
                label: 'Cancel',
                action: closeDialog,
                type: 'secondary'
            },
            {
                label: 'Move to trash',
                action: confirmDeleteMedium
            }
        ])
    }

    const confirmDeleteMedium = () => {
        deleteMedium().then(() => {
            refetch().then(() => {
                closeDetails()
                closeDialog()
            })
        })
    }

    const download = () => {

    }

    const src = medium.filename_disk ? `http://localhost:2000/uploads/${medium.filename_disk}` : '#'

    const OpenInfosButton = () => {
        if (infos) {
            return <></>
        }

        return <IconButton
            hint={'Show Infos'}
            white={true}
            onClick={openInfos}
            icon={Icons.mdiInformation}
        />
    }

    const RightToolbar = () => {
        if (isInSelectionMode) {
            return <Tippy
                content="Select"
            >
                <Check
                    onClick={select}
                    ready={true}
                    checked={isSelected(medium)}
                    boxSize={48}
                    hover={true}
                />
            </Tippy>
        }

        return <>
            <IconButton
                href={src}
                hint={'Download'}
                white={true}
                onClick={download}
                download={medium.filename_download}
                external={true}
                icon={Icons.mdiTrayArrowDown}
            />
            <IconButton
                hint={'Delete'}
                white={true}
                onClick={openAskDeleteDialog}
                icon={Icons.mdiTrashCanOutline}
            />
            <OpenInfosButton />
        </>
    }

    return <div className={`details${active ? ' details--active' : ''}${infos ? ' details--infos' : ''}`}>
        <div className="details__preview">
            <div className="toolbar toolbar--light">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
                        hint={'Back'}
                        white={true}
                        onClick={closeDetails}
                        icon={Icons.mdiArrowLeft}
                    />
                </div>
                <div className="toolbar__section toolbar__section--right">
                    <RightToolbar />
                </div>
            </div>
            <div className="details__container">
                <div className="details__placeholder-container">
                    <img
                        className="details__placeholder"
                        src={`${src}?w=250`}
                        alt=""
                    />
                </div>
                <img
                    className={`details__image${!loading ? ' details__image--loaded' : ''}`}
                    src={src}
                    alt=""
                    onLoad={() => setLoading(false)}
                />
            </div>
        </div>
        <aside className="details__sidebar">
            <div className="toolbar">
                <div className="toolbar__section toolbar__section--left">
                    <IconButton
                        hint={'Hide Infos'}
                        onClick={closeInfos}
                        icon={Icons.mdiArrowRight}
                    />
                </div>
            </div>
        </aside>
    </div>
}

export default Details
