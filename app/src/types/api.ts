import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type TMedia = {
  __typename?: 'Media'
  description?: Maybe<Scalars['String']>
  filename_disk?: Maybe<Scalars['String']>
  filename_download?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
}

export type TQuery = {
  __typename?: 'Query'
  media?: Maybe<Array<Maybe<TMedia>>>
}

export type TMediaQueryVariables = Exact<{ [key: string]: never }>

export type TMediaQuery = { __typename?: 'Query', media?: Array<{ __typename?: 'Media', id?: string | null, title?: string | null, filename_disk?: string | null, width?: number | null, height?: number | null } | null> | null }

export const MediaQueryDocument = gql`
    query MediaQuery {
  media {
    id
    title
    filename_disk
    width
    height
  }
}
    `
export function useMediaQuery (baseOptions?: Apollo.QueryHookOptions<TMediaQuery, TMediaQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useQuery<TMediaQuery, TMediaQueryVariables>(MediaQueryDocument, options)
}
export function useMediaQueryLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<TMediaQuery, TMediaQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useLazyQuery<TMediaQuery, TMediaQueryVariables>(MediaQueryDocument, options)
}
export type MediaQueryHookResult = ReturnType<typeof useMediaQuery>
export type MediaQueryLazyQueryHookResult = ReturnType<typeof useMediaQueryLazyQuery>
export type MediaQueryQueryResult = Apollo.QueryResult<TMediaQuery, TMediaQueryVariables>