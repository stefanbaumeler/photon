import { useContext, useEffect, useState } from 'react'
import { DetailsContext } from '@/contexts'
import Icon from '@mdi/react'
import { mdiArrowLeft, mdiClose, mdiInformation } from '@mdi/js'
import Tippy from '@tippyjs/react'

const Details = () => {
    const {
        active, medium, closeDetails
    } = useContext(DetailsContext)

    const keydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeDetails()
        }

        if (event.key === 'LeftArrow') {

        }

        if (event.key === 'RightArrow') {

        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keydown)

        return () => {
            window.removeEventListener('dragover', keydown)
        }
    }, [])

    const [loading, setLoading] = useState(true)

    const src = medium.filename_disk ? `http://localhost:2000/uploads/${medium.filename_disk}` : '#'

    return <div className={`details${active ? ' details--active' : ''}`}>
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
                    <button
                        className="toolbar__button"
                        onClick={closeDetails}
                    >
                        <Icon
                            path={mdiInformation}
                            size={1}
                        />
                    </button>
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
        <aside className="details__sidebar-area">
            <div className="toolbar">
                <div className="toolbar__section toolbar__section--left">
                    <Tippy
                        content="Close"
                    >
                        <button className="toolbar__button">
                            <Icon
                                path={mdiClose}
                                size={1}
                            />
                        </button>
                    </Tippy>
                </div>
            </div>
            <div className="details__sidebar"></div>
        </aside>
        {medium.filename_disk}
    </div>
}

export default Details
