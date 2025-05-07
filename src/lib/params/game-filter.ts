import {createSearchParamsCache, parseAsString, parseAsStringEnum, parseAsStringLiteral} from 'nuqs/server'

const filters = ['all', 'keyboard', 'mouse', 'mouse-keyboard'] as const

export const gameFilterParams = {
    q: parseAsString.withDefault(''),
    filter: parseAsStringLiteral(filters).withDefault('all'),
}

export const gameFilterParamsCache = createSearchParamsCache(gameFilterParams)
