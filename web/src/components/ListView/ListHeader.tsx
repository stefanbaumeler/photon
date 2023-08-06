import { useTranslation } from 'react-i18next'
import { columns } from './columns'

type Props = {
    column: string
}
export const ListHeader = ({ column }: Props) => {
    const { t } = useTranslation('listHeaders')
    return <th
        className="list-view__cell"
        style={{
            width: columns[column].width
        }}
    >
    </th>
}
