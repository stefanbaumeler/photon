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
  camera_make?: Maybe<Scalars['String']>
  camera_model?: Maybe<Scalars['String']>
  date_created?: Maybe<Scalars['String']>
  date_modified?: Maybe<Scalars['String']>
  date_taken?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  f_number?: Maybe<Scalars['Float']>
  filename_disk?: Maybe<Scalars['String']>
  filename_download?: Maybe<Scalars['String']>
  flash?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['ID']>
  iso?: Maybe<Scalars['Int']>
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
  title?: Maybe<Scalars['String']>
  width?: Maybe<Scalars['Int']>
}

export type TMutation = {
  __typename?: 'Mutation'
  deleteMedia?: Maybe<Scalars['String']>
}

export type TMutationDeleteMediaArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type TQuery = {
  __typename?: 'Query'
  deleteMedia?: Maybe<Scalars['String']>
  media?: Maybe<Array<Maybe<TMedia>>>
}

export type TQueryDeleteMediaArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type TDeleteMediaVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>
}>

export type TDeleteMedia = { __typename?: 'Mutation', deleteMedia?: string | null }

export type TMediaQueryVariables = Exact<{ [key: string]: never }>

export type TMediaQuery = { __typename?: 'Query', media?: Array<{ __typename?: 'Media', date_created?: string | null, date_modified?: string | null, date_taken?: string | null, id?: string | null, filename_disk?: string | null, filename_download?: string | null, title?: string | null, description?: string | null, width?: number | null, height?: number | null, camera_make?: string | null, camera_model?: string | null, flash?: number | null, f_number?: number | null, iso?: number | null, lat?: number | null, lng?: number | null } | null> | null }

export const DeleteMediaDocument = gql`
    mutation deleteMedia($ids: [ID]) {
  deleteMedia(ids: $ids)
}
    `
export type TDeleteMediaMutationFn = Apollo.MutationFunction<TDeleteMedia, TDeleteMediaVariables>
export function useDeleteMedia (baseOptions?: Apollo.MutationHookOptions<TDeleteMedia, TDeleteMediaVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TDeleteMedia, TDeleteMediaVariables>(DeleteMediaDocument, options)
}
export type DeleteMediaHookResult = ReturnType<typeof useDeleteMedia>
export type DeleteMediaMutationResult = Apollo.MutationResult<TDeleteMedia>
export type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<TDeleteMedia, TDeleteMediaVariables>
export const MediaQueryDocument = gql`
    query MediaQuery {
  media {
    date_created
    date_modified
    date_taken
    id
    filename_disk
    filename_download
    title
    description
    width
    height
    camera_make
    camera_model
    flash
    f_number
    iso
    lat
    lng
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