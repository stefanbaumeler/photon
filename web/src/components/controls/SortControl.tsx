import * as Icons from '@mdi/js'
import { Dropdown, IconButton } from '..'
import { ETrans } from 'web/src/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSortContext } from 'web/src/providers'
import { EMediumSort } from 'web/src/types/app'

export const SortControl = () => {
    const { t } = useTranslation()
    const sort = useSortContext()
    const [sortDropdownActive, setSortDropdownActive] = useState(false)

    const sortItems = [
        {
            label: t(ETrans.NEWEST_FIRST),
            callback: () => {
                sort.setSort(EMediumSort.NEWEST)
                setSortDropdownActive(false)
            }
        },
        {
            label: t(ETrans.OLDEST_FIRST),
            callback: () => {
                sort.setSort(EMediumSort.OLDEST)
                setSortDropdownActive(false)
            }
        },
        {
            label: t(ETrans.MOST_RECENT),
            callback: () => {
                sort.setSort(EMediumSort.RECENT)
                setSortDropdownActive(false)
            }
        }
    ]

    return <Dropdown
        items={sortItems}
        active={sortDropdownActive}
        onClickOutside={() => setSortDropdownActive(false)}
    >
        <IconButton
            hint={t(ETrans.SORT)}
            icon={Icons.mdiSwapVertical}
            onClick={() => setSortDropdownActive(!sortDropdownActive)}
        />
    </Dropdown>
}
