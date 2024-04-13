import * as Icons from '@mdi/js'
import { Dropdown, Button } from '@/components'
import { ETrans } from '@/types/translations'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useSortContext } from '@/providers'
import { EMediumSort } from '@/types/app'

export const SortControl = () => {
    const { t } = useTranslation()
    const sort = useSortContext()
    const [sortDropdownActive, setSortDropdownActive] = useState(false)

    const sortItems = [
        {
            testId: 'sort-newest',
            label: t(ETrans.NEWEST_FIRST),
            callback: () => {
                sort.setSort(EMediumSort.NEWEST)
                setSortDropdownActive(false)
            }
        },
        {
            testId: 'sort-oldest',
            label: t(ETrans.OLDEST_FIRST),
            callback: () => {
                sort.setSort(EMediumSort.OLDEST)
                setSortDropdownActive(false)
            }
        },
        {
            testId: 'sort-recent',
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
        <Button
            testId="sort"
            hint={t(ETrans.SORT)}
            icon={Icons.mdiSwapVertical}
            onClick={() => setSortDropdownActive(!sortDropdownActive)}
        />
    </Dropdown>
}
