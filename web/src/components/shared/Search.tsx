import { useTranslation } from 'react-i18next'
import { ETrans } from '@/types/translations'
import * as Icons from '@mdi/js'
import { useEffect, KeyboardEvent, useState, ChangeEvent } from 'react'
import bem from '@/util/bem'
import { useSearchContext } from '@/providers/SearchProvider'
import { Button } from '@/components/shared/Button'

export const Search = () => {
    const { t } = useTranslation()
    const [query, setQuery] = useState('')
    const [text, setText] = useState('')
    const search = useSearchContext()

    useEffect(() => {
        search.setQuery(query)
    }, [query, search])

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

    return <div
        className="search"
        data-testid="search"
    >
        <div className="search__input-container">
            <input
                data-testid="search-input"
                type="text"
                className="search__input"
                placeholder={t(ETrans.SEARCH_YOUR_PHOTOS)}
                onKeyUp={onKeyUp}
                onBlur={onBlur}
                onChange={onChange}
                value={text}
            />
            <div className="search__buttons">
                <Button
                    icon={Icons.mdiClose}
                    hint={t(ETrans.CLEAR)}
                    appearance={{
                        shape: 'square'
                    }}
                    className={clearClasses}
                    onClick={clear}
                />
                <Button
                    className="search__filter"
                    appearance={{
                        shape: 'square'
                    }}
                    icon={Icons.mdiFilterVariant}
                    hint={t(ETrans.FILTER)}
                />
            </div>
        </div>
    </div>
}
