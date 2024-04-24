type Props = {
    earliest: string
    latest: string
}
export const AlbumDetailsDates = ({
    earliest, latest
}: Props) => {
    return earliest === latest ? <div className="album-details__dates">
        <span className="album-details__date">
            {earliest}
        </span>
    </div> : <div className="album-details__dates">
        <span className="album-details__date">
            {earliest}
        </span>
        <span className="album-details__date-separator">
            {' - '}
        </span>
        <span className="album-details__date">
            {latest}
        </span>
    </div>
}
