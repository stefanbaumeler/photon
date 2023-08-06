import {
    CheckCell,
    PreviewCell,
    TitleCell,
    OwnerCell,
    ControlsCell,
    MediaCountCell,
    MimetypeCell,
    DateTakenCell,
    FavoriteCell,
    CameraCell
} from './cells'

const ListItem = () => {
    return <tr
        className="list-view__row"
    >
        <CheckCell />
        <ControlsCell />
        <DateTakenCell />
        <FavoriteCell />
        <MediaCountCell />
        <MimetypeCell />
        <OwnerCell />
        <PreviewCell />
        <TitleCell />
        <CameraCell />
    </tr>
}

export default ListItem
