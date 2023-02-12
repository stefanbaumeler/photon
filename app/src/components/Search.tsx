import { SearchBox } from 'react-instantsearch-hooks-web'
import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import { IconButton } from '@/components/IconButton'
import * as Icons from '@mdi/js'

export const Search = () => {
    const { t } = useTranslation()

    return <div className="search">
        <SearchBox
            classNames={{
                input: 'search__input',
                submit: 'search__submit',
                reset: 'search__reset'
            }}
            placeholder={t(ETrans.SEARCH)}
        />
        <div className="search__filter">
            <IconButton
                icon={Icons.mdiFilterVariant}
                hint={t(ETrans.FILTER)}
            />
        </div>
    </div>
}
