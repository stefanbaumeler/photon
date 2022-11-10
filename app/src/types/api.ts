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
  Upload: any
}

export type TAlbum = {
  __typename?: 'Album'
  description?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  idMedium?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
}

export type TAlbumInput = {
  description?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  idMedium?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type TFile = {
  __typename?: 'File'
  url?: Maybe<Scalars['String']>
}

export type TImageMeta = {
  __typename?: 'ImageMeta'
  cameraMake?: Maybe<Scalars['String']>
  cameraModel?: Maybe<Scalars['String']>
  fNumber?: Maybe<Scalars['Float']>
  flash?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  iso?: Maybe<Scalars['Int']>
  width?: Maybe<Scalars['Int']>
}

export type TMedium = {
  __typename?: 'Medium'
  dateCreated?: Maybe<Scalars['String']>
  dateModified?: Maybe<Scalars['String']>
  dateModifiedStatus?: Maybe<Scalars['String']>
  dateTaken?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  filenameDisk?: Maybe<Scalars['String']>
  filenameDownload?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
  meta?: Maybe<TMeta>
  mimetype?: Maybe<Scalars['String']>
  status?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type TMeta = TImageMeta | TVideoMeta

export type TMutation = {
  __typename?: 'Mutation'
  addToAlbum?: Maybe<Array<Maybe<Scalars['ID']>>>
  createAlbum?: Maybe<Scalars['ID']>
  deleteAlbum?: Maybe<Scalars['String']>
  deleteMedia?: Maybe<Scalars['String']>
  emptyTrash?: Maybe<Scalars['Boolean']>
  removeFromAlbum?: Maybe<Array<Maybe<Scalars['ID']>>>
  rotate?: Maybe<Scalars['ID']>
  setMediaStatus?: Maybe<Array<Maybe<Scalars['ID']>>>
  updateAlbumTitle?: Maybe<Scalars['ID']>
  upload: Array<Maybe<TFile>>
}

export type TMutationAddToAlbumArgs = {
  idAlbum?: InputMaybe<Scalars['ID']>
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type TMutationCreateAlbumArgs = {
  album?: InputMaybe<TAlbumInput>
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type TMutationDeleteAlbumArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type TMutationDeleteMediaArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type TMutationRemoveFromAlbumArgs = {
  idAlbum?: InputMaybe<Scalars['ID']>
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
}

export type TMutationRotateArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type TMutationSetMediaStatusArgs = {
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>
  status?: InputMaybe<Scalars['String']>
}

export type TMutationUpdateAlbumTitleArgs = {
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}

export type TMutationUploadArgs = {
  file: Array<InputMaybe<Scalars['Upload']>>
}

export type TQuery = {
  __typename?: 'Query'
  album?: Maybe<Array<Maybe<TAlbum>>>
  albumMedia?: Maybe<Array<Maybe<TMedium>>>
  albums?: Maybe<Array<Maybe<TAlbum>>>
  media?: Maybe<Array<Maybe<TMedium>>>
  medium?: Maybe<Array<Maybe<TMedium>>>
}

export type TQueryAlbumArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type TQueryAlbumMediaArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type TQueryMediaArgs = {
  status?: InputMaybe<Scalars['String']>
}

export type TQueryMediumArgs = {
  id?: InputMaybe<Scalars['ID']>
}

export type TVideoMeta = {
  __typename?: 'VideoMeta'
  duration?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  width?: Maybe<Scalars['Int']>
}

export type TAddToAlbumVariables = Exact<{
  idAlbum?: InputMaybe<Scalars['ID']>
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>
}>

export type TAddToAlbum = { __typename?: 'Mutation', addToAlbum?: Array<string | null> | null }

export type TAlbumQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type TAlbumQuery = { __typename?: 'Query', album?: Array<{ __typename?: 'Album', id?: string | null, title?: string | null, description?: string | null, idMedium?: string | null } | null> | null }

export type TAlbumMediaQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type TAlbumMediaQuery = { __typename?: 'Query', albumMedia?: Array<{ __typename?: 'Medium', dateCreated?: string | null, dateModified?: string | null, dateTaken?: string | null, id?: string | null, filenameDisk?: string | null, filenameDownload?: string | null, title?: string | null, description?: string | null, lat?: number | null, lng?: number | null, status?: string | null, mimetype?: string | null, meta?: { __typename?: 'ImageMeta', width?: number | null, height?: number | null, cameraMake?: string | null, cameraModel?: string | null, flash?: number | null, fNumber?: number | null, iso?: number | null } | { __typename?: 'VideoMeta', width?: number | null, height?: number | null, duration?: number | null } | null } | null> | null }

export type TAlbumsQueryVariables = Exact<{ [key: string]: never }>

export type TAlbumsQuery = { __typename?: 'Query', albums?: Array<{ __typename?: 'Album', id?: string | null, title?: string | null, description?: string | null, idMedium?: string | null } | null> | null }

export type TCreateAlbumVariables = Exact<{
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>
}>

export type TCreateAlbum = { __typename?: 'Mutation', createAlbum?: string | null }

export type TDeleteAlbumVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>
}>

export type TDeleteAlbum = { __typename?: 'Mutation', deleteAlbum?: string | null }

export type TDeleteMediaVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>
}>

export type TDeleteMedia = { __typename?: 'Mutation', deleteMedia?: string | null }

export type TEmptyTrashVariables = Exact<{ [key: string]: never }>

export type TEmptyTrash = { __typename?: 'Mutation', emptyTrash?: boolean | null }

export type TMediaQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']>
}>

export type TMediaQuery = { __typename?: 'Query', media?: Array<{ __typename?: 'Medium', dateCreated?: string | null, dateModified?: string | null, dateTaken?: string | null, id?: string | null, filenameDisk?: string | null, filenameDownload?: string | null, title?: string | null, description?: string | null, lat?: number | null, lng?: number | null, status?: string | null, mimetype?: string | null, meta?: { __typename?: 'ImageMeta', width?: number | null, height?: number | null, cameraMake?: string | null, cameraModel?: string | null, flash?: number | null, fNumber?: number | null, iso?: number | null } | { __typename?: 'VideoMeta', width?: number | null, height?: number | null, duration?: number | null } | null } | null> | null }

export type TMediumQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type TMediumQuery = { __typename?: 'Query', medium?: Array<{ __typename?: 'Medium', dateCreated?: string | null, dateModified?: string | null, dateTaken?: string | null, id?: string | null, filenameDisk?: string | null, filenameDownload?: string | null, title?: string | null, description?: string | null, lat?: number | null, lng?: number | null, status?: string | null, mimetype?: string | null, meta?: { __typename?: 'ImageMeta', width?: number | null, height?: number | null, cameraMake?: string | null, cameraModel?: string | null, flash?: number | null, fNumber?: number | null, iso?: number | null } | { __typename?: 'VideoMeta', width?: number | null, height?: number | null, duration?: number | null } | null } | null> | null }

export type TRemoveFromAlbumVariables = Exact<{
  idAlbum?: InputMaybe<Scalars['ID']>
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>
}>

export type TRemoveFromAlbum = { __typename?: 'Mutation', removeFromAlbum?: Array<string | null> | null }

export type TRotateVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
}>

export type TRotate = { __typename?: 'Mutation', rotate?: string | null }

export type TSetMediaStatusVariables = Exact<{
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>
  status?: InputMaybe<Scalars['String']>
}>

export type TSetMediaStatus = { __typename?: 'Mutation', setMediaStatus?: Array<string | null> | null }

export type TUpdateAlbumTitleVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>
  title?: InputMaybe<Scalars['String']>
}>

export type TUpdateAlbumTitle = { __typename?: 'Mutation', updateAlbumTitle?: string | null }

export type TUploadVariables = Exact<{
  file: Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>
}>

export type TUpload = { __typename?: 'Mutation', upload: Array<{ __typename?: 'File', url?: string | null } | null> }

export const AddToAlbumDocument = gql`
    mutation addToAlbum($idAlbum: ID, $media: [ID]) {
  addToAlbum(idAlbum: $idAlbum, media: $media)
}
    `
export type TAddToAlbumMutationFn = Apollo.MutationFunction<TAddToAlbum, TAddToAlbumVariables>
export function useAddToAlbum (baseOptions?: Apollo.MutationHookOptions<TAddToAlbum, TAddToAlbumVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TAddToAlbum, TAddToAlbumVariables>(AddToAlbumDocument, options)
}
export type AddToAlbumHookResult = ReturnType<typeof useAddToAlbum>
export type AddToAlbumMutationResult = Apollo.MutationResult<TAddToAlbum>
export type AddToAlbumMutationOptions = Apollo.BaseMutationOptions<TAddToAlbum, TAddToAlbumVariables>
export const AlbumQueryDocument = gql`
    query AlbumQuery($id: ID) {
  album(id: $id) {
    id
    title
    description
    idMedium
  }
}
    `
export function useAlbumQuery (baseOptions?: Apollo.QueryHookOptions<TAlbumQuery, TAlbumQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useQuery<TAlbumQuery, TAlbumQueryVariables>(AlbumQueryDocument, options)
}
export function useAlbumQueryLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<TAlbumQuery, TAlbumQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useLazyQuery<TAlbumQuery, TAlbumQueryVariables>(AlbumQueryDocument, options)
}
export type AlbumQueryHookResult = ReturnType<typeof useAlbumQuery>
export type AlbumQueryLazyQueryHookResult = ReturnType<typeof useAlbumQueryLazyQuery>
export type AlbumQueryQueryResult = Apollo.QueryResult<TAlbumQuery, TAlbumQueryVariables>
export const AlbumMediaQueryDocument = gql`
    query AlbumMediaQuery($id: ID) {
  albumMedia(id: $id) {
    dateCreated
    dateModified
    dateTaken
    id
    filenameDisk
    filenameDownload
    title
    description
    lat
    lng
    status
    mimetype
    meta {
      ... on ImageMeta {
        width
        height
        cameraMake
        cameraModel
        flash
        fNumber
        iso
      }
      ... on VideoMeta {
        width
        height
        duration
      }
    }
  }
}
    `
export function useAlbumMediaQuery (baseOptions?: Apollo.QueryHookOptions<TAlbumMediaQuery, TAlbumMediaQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useQuery<TAlbumMediaQuery, TAlbumMediaQueryVariables>(AlbumMediaQueryDocument, options)
}
export function useAlbumMediaQueryLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<TAlbumMediaQuery, TAlbumMediaQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useLazyQuery<TAlbumMediaQuery, TAlbumMediaQueryVariables>(AlbumMediaQueryDocument, options)
}
export type AlbumMediaQueryHookResult = ReturnType<typeof useAlbumMediaQuery>
export type AlbumMediaQueryLazyQueryHookResult = ReturnType<typeof useAlbumMediaQueryLazyQuery>
export type AlbumMediaQueryQueryResult = Apollo.QueryResult<TAlbumMediaQuery, TAlbumMediaQueryVariables>
export const AlbumsQueryDocument = gql`
    query AlbumsQuery {
  albums {
    id
    title
    description
    idMedium
  }
}
    `
export function useAlbumsQuery (baseOptions?: Apollo.QueryHookOptions<TAlbumsQuery, TAlbumsQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useQuery<TAlbumsQuery, TAlbumsQueryVariables>(AlbumsQueryDocument, options)
}
export function useAlbumsQueryLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<TAlbumsQuery, TAlbumsQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useLazyQuery<TAlbumsQuery, TAlbumsQueryVariables>(AlbumsQueryDocument, options)
}
export type AlbumsQueryHookResult = ReturnType<typeof useAlbumsQuery>
export type AlbumsQueryLazyQueryHookResult = ReturnType<typeof useAlbumsQueryLazyQuery>
export type AlbumsQueryQueryResult = Apollo.QueryResult<TAlbumsQuery, TAlbumsQueryVariables>
export const CreateAlbumDocument = gql`
    mutation createAlbum($media: [ID]) {
  createAlbum(media: $media)
}
    `
export type TCreateAlbumMutationFn = Apollo.MutationFunction<TCreateAlbum, TCreateAlbumVariables>
export function useCreateAlbum (baseOptions?: Apollo.MutationHookOptions<TCreateAlbum, TCreateAlbumVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TCreateAlbum, TCreateAlbumVariables>(CreateAlbumDocument, options)
}
export type CreateAlbumHookResult = ReturnType<typeof useCreateAlbum>
export type CreateAlbumMutationResult = Apollo.MutationResult<TCreateAlbum>
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<TCreateAlbum, TCreateAlbumVariables>
export const DeleteAlbumDocument = gql`
    mutation deleteAlbum($ids: [ID]) {
  deleteAlbum(ids: $ids)
}
    `
export type TDeleteAlbumMutationFn = Apollo.MutationFunction<TDeleteAlbum, TDeleteAlbumVariables>
export function useDeleteAlbum (baseOptions?: Apollo.MutationHookOptions<TDeleteAlbum, TDeleteAlbumVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TDeleteAlbum, TDeleteAlbumVariables>(DeleteAlbumDocument, options)
}
export type DeleteAlbumHookResult = ReturnType<typeof useDeleteAlbum>
export type DeleteAlbumMutationResult = Apollo.MutationResult<TDeleteAlbum>
export type DeleteAlbumMutationOptions = Apollo.BaseMutationOptions<TDeleteAlbum, TDeleteAlbumVariables>
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
export const EmptyTrashDocument = gql`
    mutation emptyTrash {
  emptyTrash
}
    `
export type TEmptyTrashMutationFn = Apollo.MutationFunction<TEmptyTrash, TEmptyTrashVariables>
export function useEmptyTrash (baseOptions?: Apollo.MutationHookOptions<TEmptyTrash, TEmptyTrashVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TEmptyTrash, TEmptyTrashVariables>(EmptyTrashDocument, options)
}
export type EmptyTrashHookResult = ReturnType<typeof useEmptyTrash>
export type EmptyTrashMutationResult = Apollo.MutationResult<TEmptyTrash>
export type EmptyTrashMutationOptions = Apollo.BaseMutationOptions<TEmptyTrash, TEmptyTrashVariables>
export const MediaQueryDocument = gql`
    query MediaQuery($status: String) {
  media(status: $status) {
    dateCreated
    dateModified
    dateTaken
    id
    filenameDisk
    filenameDownload
    title
    description
    lat
    lng
    status
    mimetype
    meta {
      ... on ImageMeta {
        width
        height
        cameraMake
        cameraModel
        flash
        fNumber
        iso
      }
      ... on VideoMeta {
        width
        height
        duration
      }
    }
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
export const MediumQueryDocument = gql`
    query MediumQuery($id: ID) {
  medium(id: $id) {
    dateCreated
    dateModified
    dateTaken
    id
    filenameDisk
    filenameDownload
    title
    description
    lat
    lng
    status
    mimetype
    meta {
      ... on ImageMeta {
        width
        height
        cameraMake
        cameraModel
        flash
        fNumber
        iso
      }
      ... on VideoMeta {
        width
        height
        duration
      }
    }
  }
}
    `
export function useMediumQuery (baseOptions?: Apollo.QueryHookOptions<TMediumQuery, TMediumQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useQuery<TMediumQuery, TMediumQueryVariables>(MediumQueryDocument, options)
}
export function useMediumQueryLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<TMediumQuery, TMediumQueryVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useLazyQuery<TMediumQuery, TMediumQueryVariables>(MediumQueryDocument, options)
}
export type MediumQueryHookResult = ReturnType<typeof useMediumQuery>
export type MediumQueryLazyQueryHookResult = ReturnType<typeof useMediumQueryLazyQuery>
export type MediumQueryQueryResult = Apollo.QueryResult<TMediumQuery, TMediumQueryVariables>
export const RemoveFromAlbumDocument = gql`
    mutation removeFromAlbum($idAlbum: ID, $media: [ID]) {
  removeFromAlbum(idAlbum: $idAlbum, media: $media)
}
    `
export type TRemoveFromAlbumMutationFn = Apollo.MutationFunction<TRemoveFromAlbum, TRemoveFromAlbumVariables>
export function useRemoveFromAlbum (baseOptions?: Apollo.MutationHookOptions<TRemoveFromAlbum, TRemoveFromAlbumVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TRemoveFromAlbum, TRemoveFromAlbumVariables>(RemoveFromAlbumDocument, options)
}
export type RemoveFromAlbumHookResult = ReturnType<typeof useRemoveFromAlbum>
export type RemoveFromAlbumMutationResult = Apollo.MutationResult<TRemoveFromAlbum>
export type RemoveFromAlbumMutationOptions = Apollo.BaseMutationOptions<TRemoveFromAlbum, TRemoveFromAlbumVariables>
export const RotateDocument = gql`
    mutation rotate($id: ID) {
  rotate(id: $id)
}
    `
export type TRotateMutationFn = Apollo.MutationFunction<TRotate, TRotateVariables>
export function useRotate (baseOptions?: Apollo.MutationHookOptions<TRotate, TRotateVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TRotate, TRotateVariables>(RotateDocument, options)
}
export type RotateHookResult = ReturnType<typeof useRotate>
export type RotateMutationResult = Apollo.MutationResult<TRotate>
export type RotateMutationOptions = Apollo.BaseMutationOptions<TRotate, TRotateVariables>
export const SetMediaStatusDocument = gql`
    mutation setMediaStatus($media: [ID], $status: String) {
  setMediaStatus(media: $media, status: $status)
}
    `
export type TSetMediaStatusMutationFn = Apollo.MutationFunction<TSetMediaStatus, TSetMediaStatusVariables>
export function useSetMediaStatus (baseOptions?: Apollo.MutationHookOptions<TSetMediaStatus, TSetMediaStatusVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TSetMediaStatus, TSetMediaStatusVariables>(SetMediaStatusDocument, options)
}
export type SetMediaStatusHookResult = ReturnType<typeof useSetMediaStatus>
export type SetMediaStatusMutationResult = Apollo.MutationResult<TSetMediaStatus>
export type SetMediaStatusMutationOptions = Apollo.BaseMutationOptions<TSetMediaStatus, TSetMediaStatusVariables>
export const UpdateAlbumTitleDocument = gql`
    mutation updateAlbumTitle($id: ID, $title: String) {
  updateAlbumTitle(id: $id, title: $title)
}
    `
export type TUpdateAlbumTitleMutationFn = Apollo.MutationFunction<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>
export function useUpdateAlbumTitle (baseOptions?: Apollo.MutationHookOptions<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>(UpdateAlbumTitleDocument, options)
}
export type UpdateAlbumTitleHookResult = ReturnType<typeof useUpdateAlbumTitle>
export type UpdateAlbumTitleMutationResult = Apollo.MutationResult<TUpdateAlbumTitle>
export type UpdateAlbumTitleMutationOptions = Apollo.BaseMutationOptions<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>
export const UploadDocument = gql`
    mutation upload($file: [Upload]!) {
  upload(file: $file) {
    url
  }
}
    `
export type TUploadMutationFn = Apollo.MutationFunction<TUpload, TUploadVariables>
export function useUpload (baseOptions?: Apollo.MutationHookOptions<TUpload, TUploadVariables>) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    }
    return Apollo.useMutation<TUpload, TUploadVariables>(UploadDocument, options)
}
export type UploadHookResult = ReturnType<typeof useUpload>
export type UploadMutationResult = Apollo.MutationResult<TUpload>
export type UploadMutationOptions = Apollo.BaseMutationOptions<TUpload, TUploadVariables>