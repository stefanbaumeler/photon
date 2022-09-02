import { useContext, useEffect, useState } from 'react'
import { DetailsContext, DialogContext } from '@/contexts'
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiArrowRight,
    mdiInformation,
    mdiTrashCanOutline,
    mdiTrayArrowDown } from '@mdi/js'
import Tippy from '@tippyjs/react'
import { useDeleteMedium } from '@/types/api'
import { useMedia } from '@/api/hooks'

const Details = () => {
    const {
        active, medium, collection,
        openDetails, closeDetails,
        openInfos, closeInfos, infos
    } = useContext(DetailsContext)

    const {
        openDialog, closeDialog
    } = useContext(DialogContext)

    const { refetch } = useMedia()

    const [deleteMedium] = useDeleteMedium({
        variables: {
            id: medium.id
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
        openDialog('Are you sure you want to permanently delete this?', [
            {
                label: 'Cancel',
                action: closeDialog,
                type: 'secondary'
            },
            {
                label: 'Yes',
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

        return <Tippy
            content="Show Infos"
        >
            <button
                className="toolbar__button"
                onClick={openInfos}
            >
                <Icon
                    path={mdiInformation}
                    size={1}
                />
            </button>
        </Tippy>
    }

    return <div className={`details${active ? ' details--active' : ''}${infos ? ' details--infos' : ''}`}>
        <div className="details__preview">
            <div className="toolbar toolbar--light">
                <div className="toolbar__section toolbar__section--left">
                    <Tippy
                        content="Back"
                    >
                        <button
                            className="toolbar__button"
                            onClick={closeDetails}
                        >
                            <Icon
                                path={mdiArrowLeft}
                                size={1}
                            />
                        </button>
                    </Tippy>
                </div>
                <div className="toolbar__section toolbar__section--right">
                    <Tippy
                        content="Download"
                    >
                        <a
                            href={src}
                            target="_blank"
                            download={medium.filename_download}
                            className="toolbar__button"
                            onClick={download}
                            rel="noreferrer"
                        >
                            <Icon
                                path={mdiTrayArrowDown}
                                size={1}
                            />
                        </a>
                    </Tippy>
                    <Tippy
                        content="Delete"
                    >
                        <button
                            className="toolbar__button"
                            onClick={() => openAskDeleteDialog()}
                        >
                            <Icon
                                path={mdiTrashCanOutline}
                                size={1}
                            />
                        </button>
                    </Tippy>
                    <OpenInfosButton />
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
                    <Tippy
                        content="Hide Infos"
                    >
                        <button
                            className="toolbar__button"
                            onClick={closeInfos}
                        >
                            <Icon
                                path={mdiArrowRight}
                                size={1}
                            />
                        </button>
                    </Tippy>
                </div>
            </div>
        </aside>
    </div>
}

export default Details
