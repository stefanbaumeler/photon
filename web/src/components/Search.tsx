import { useTranslation } from 'react-i18next'
import { ETrans } from 'web/src/types/translations'
import { IconButton } from 'web/src/components/IconButton'
import * as Icons from '@mdi/js'
import { useQTranslate } from '@photon/schema'
import { useEffect, KeyboardEvent, useState, ChangeEvent } from 'react'
import { useSearchBox } from 'react-instantsearch-hooks-web'
import bem from 'web/src/util/bem'

export const Search = () => {
    const { t } = useTranslation()
    const [query, setQuery] = useState('')
    const [text, setText] = useState('')
    const box = useSearchBox()

    const translate = useQTranslate({
        variables: {
            query
        },
        skip: !query.length
    })

    useEffect(() => {
        if (!query.length) {
            box.refine('')
        }
        else if (translate.data) {
            box.refine(translate.data.translate)
        }
    }, [query, translate.data])

    const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setQuery(event.currentTarget.value)
        }
    }

    const onBlur = () => {
        if (!query.length) {
            setText('')
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const clear = () => {
        setQuery('')
        setText('')
    }

    const clearClasses = bem('search__clear', [
        ['active', !!query.length]
    ])

    return <div className="search">
        <div className="search__input-container">
            <input
                type="text"
                className="search__input"
                placeholder={t(ETrans.SEARCH_YOUR_PHOTOS)}
                onKeyUp={onKeyUp}
                onBlur={onBlur}
                onChange={onChange}
                value={text}
            />
            <IconButton
                icon={Icons.mdiClose}
                hint={t(ETrans.CLEAR)}
                className={clearClasses}
                onClick={clear}
            />
            <IconButton
                className="search__filter"
                icon={Icons.mdiFilterVariant}
                hint={t(ETrans.FILTER)}
            />
        </div>
    </div>
}
