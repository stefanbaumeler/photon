import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = Partial<T> | T | null;
export type InputMaybe<T> = Partial<T> | T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type TAlbum = {
  __typename?: 'Album';
  cover?: Maybe<TMedium>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  owner?: Maybe<TUser>;
  title?: Maybe<Scalars['String']>;
};

export type TAlbumInput = {
  cover?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type TCount = {
  __typename?: 'Count';
  count: Scalars['Int'];
};

export type TDevice = {
  __typename?: 'Device';
  dateCreated: Scalars['DateTime'];
  dateModified: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TDeviceInput = {
  name: Scalars['String'];
  type: Scalars['String'];
};

export type TFile = {
  __typename?: 'File';
  url?: Maybe<Scalars['String']>;
};

export type TImageMeta = {
  __typename?: 'ImageMeta';
  cameraMake?: Maybe<Scalars['String']>;
  cameraModel?: Maybe<Scalars['String']>;
  fNumber?: Maybe<Scalars['Float']>;
  flash?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  iso?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type TMedium = {
  __typename?: 'Medium';
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateModified?: Maybe<Scalars['DateTime']>;
  dateModifiedStatus?: Maybe<Scalars['DateTime']>;
  dateTaken?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  favoredBy?: Maybe<Array<Maybe<TUser>>>;
  filenameDisk: Scalars['String'];
  filenameDownload?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
  meta?: Maybe<TMeta>;
  mimetype?: Maybe<Scalars['String']>;
  owner?: Maybe<TUser>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  uploader?: Maybe<TUser>;
};

export type TMeta = TImageMeta | TVideoMeta;

export type TMutation = {
  __typename?: 'Mutation';
  addToAlbum: Array<TMedium>;
  addToFavorites: Array<TMedium>;
  createAlbum?: Maybe<TAlbum>;
  deleteAlbum?: Maybe<TCount>;
  deleteMedia: Array<TMedium>;
  emptyTrash: Array<TMedium>;
  register: TDevice;
  removeFromAlbum?: Maybe<TAlbum>;
  removeFromFavorites: Array<TMedium>;
  rotate: TMedium;
  setMediaStatus: TCount;
  signIn?: Maybe<TToken>;
  signOut?: Maybe<Scalars['Boolean']>;
  signUp?: Maybe<TToken>;
  updateAlbum?: Maybe<TAlbum>;
  upload: Array<TMedium>;
};


export type TMutationAddToAlbumArgs = {
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']>;
};


export type TMutationAddToFavoritesArgs = {
  media: Array<Scalars['ID']>;
};


export type TMutationCreateAlbumArgs = {
  album?: InputMaybe<TAlbumInput>;
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type TMutationDeleteAlbumArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type TMutationDeleteMediaArgs = {
  ids: Array<Scalars['ID']>;
};


export type TMutationRegisterArgs = {
  device: TDeviceInput;
};


export type TMutationRemoveFromAlbumArgs = {
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']>;
};


export type TMutationRemoveFromFavoritesArgs = {
  media: Array<Scalars['ID']>;
};


export type TMutationRotateArgs = {
  id: Scalars['ID'];
};


export type TMutationSetMediaStatusArgs = {
  media: Array<InputMaybe<Scalars['ID']>>;
  status: Scalars['String'];
};


export type TMutationSignInArgs = {
  mail: Scalars['String'];
  password: Scalars['String'];
};


export type TMutationSignUpArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mail: Scalars['String'];
  password: Scalars['String'];
};


export type TMutationUpdateAlbumArgs = {
  fields?: InputMaybe<TAlbumInput>;
  idAlbum: Scalars['ID'];
};


export type TMutationUploadArgs = {
  files: Array<Scalars['Upload']>;
};

export type TQuery = {
  __typename?: 'Query';
  album?: Maybe<TAlbum>;
  albumMedia: Array<TMedium>;
  albums: Array<TAlbum>;
  devices: Array<TDevice>;
  favorites: Array<TMedium>;
  media?: Maybe<Array<TMedium>>;
  mediaCountByYear: TYearCountResult;
  medium?: Maybe<TMedium>;
  user: TUser;
  users: Array<TUser>;
};


export type TQueryAlbumArgs = {
  id: Scalars['ID'];
};


export type TQueryAlbumMediaArgs = {
  id: Scalars['ID'];
};


export type TQueryMediaArgs = {
  sort?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type TQueryMediumArgs = {
  id: Scalars['ID'];
};


export type TQueryUserArgs = {
  id: Scalars['ID'];
};

export type TToken = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type TUser = {
  __typename?: 'User';
  dateCreated: Scalars['DateTime'];
  dateModified: Scalars['DateTime'];
  favorites?: Maybe<Array<Maybe<TMedium>>>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  mail: Scalars['String'];
  password: Scalars['String'];
};

export type TVideoMeta = {
  __typename?: 'VideoMeta';
  duration?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type TYearCountEntry = {
  __typename?: 'YearCountEntry';
  count: Scalars['Int'];
  months: Array<TYearCountMonth>;
  year: Scalars['Int'];
};

export type TYearCountMonth = {
  __typename?: 'YearCountMonth';
  count: Scalars['Int'];
  month: Scalars['Int'];
};

export type TYearCountResult = {
  __typename?: 'YearCountResult';
  count: Scalars['Int'];
  years: Array<TYearCountEntry>;
};

export type TMAddToAlbumVariables = Exact<{
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TMAddToAlbum = (
  { __typename?: 'Mutation' }
  & { addToAlbum: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TQAlbumVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TQAlbum = (
  { __typename?: 'Query' }
  & { album?: Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description'>
    & { cover?: Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    )>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )> }
  )> }
);

export type TQAlbumMediaVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TQAlbumMedia = (
  { __typename?: 'Query' }
  & { albumMedia: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )> }
);

export type TQAlbumsVariables = Exact<{ [key: string]: never; }>;


export type TQAlbums = (
  { __typename?: 'Query' }
  & { albums: Array<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description'>
    & { cover?: Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    )>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )> }
  )> }
);

export type TMCreateAlbumVariables = Exact<{
  album?: InputMaybe<TAlbumInput>;
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type TMCreateAlbum = (
  { __typename?: 'Mutation' }
  & { createAlbum?: Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  )> }
);

export type TMDeleteAlbumVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type TMDeleteAlbum = (
  { __typename?: 'Mutation' }
  & { deleteAlbum?: Maybe<(
    { __typename?: 'Count' }
    & Pick<TCount, 'count'>
  )> }
);

export type TMRemoveFromAlbumVariables = Exact<{
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TMRemoveFromAlbum = (
  { __typename?: 'Mutation' }
  & { removeFromAlbum?: Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  )> }
);

export type TMUpdateAlbumVariables = Exact<{
  idAlbum: Scalars['ID'];
  fields: TAlbumInput;
}>;


export type TMUpdateAlbum = (
  { __typename?: 'Mutation' }
  & { updateAlbum?: Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  )> }
);

export type TMAddToFavoritesVariables = Exact<{
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TMAddToFavorites = (
  { __typename?: 'Mutation' }
  & { addToFavorites: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TQFavoritesVariables = Exact<{ [key: string]: never; }>;


export type TQFavorites = (
  { __typename?: 'Query' }
  & { favorites: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )> }
);

export type TMRemoveFromFavoritesVariables = Exact<{
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TMRemoveFromFavorites = (
  { __typename?: 'Mutation' }
  & { removeFromFavorites: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TMDeleteMediaVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TMDeleteMedia = (
  { __typename?: 'Mutation' }
  & { deleteMedia: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TMEmptyTrashVariables = Exact<{ [key: string]: never; }>;


export type TMEmptyTrash = (
  { __typename?: 'Mutation' }
  & { emptyTrash: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TQMediaVariables = Exact<{
  status?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
}>;


export type TQMedia = (
  { __typename?: 'Query' }
  & { media?: Maybe<Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )>> }
);

export type TQMediaYearCountVariables = Exact<{ [key: string]: never; }>;


export type TQMediaYearCount = (
  { __typename?: 'Query' }
  & { mediaCountByYear: (
    { __typename?: 'YearCountResult' }
    & Pick<TYearCountResult, 'count'>
    & { years: Array<(
      { __typename?: 'YearCountEntry' }
      & Pick<TYearCountEntry, 'year' | 'count'>
      & { months: Array<(
        { __typename?: 'YearCountMonth' }
        & Pick<TYearCountMonth, 'month' | 'count'>
      )> }
    )> }
  ) }
);

export type TQMediumVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TQMedium = (
  { __typename?: 'Query' }
  & { medium?: Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )> }
);

export type TMRotateVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TMRotate = (
  { __typename?: 'Mutation' }
  & { rotate: (
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  ) }
);

export type TMSetMediaStatusVariables = Exact<{
  media: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
  status: Scalars['String'];
}>;


export type TMSetMediaStatus = (
  { __typename?: 'Mutation' }
  & { setMediaStatus: (
    { __typename?: 'Count' }
    & Pick<TCount, 'count'>
  ) }
);

export type TMUploadVariables = Exact<{
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type TMUpload = (
  { __typename?: 'Mutation' }
  & { upload: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TMSignInVariables = Exact<{
  mail: Scalars['String'];
  password: Scalars['String'];
}>;


export type TMSignIn = (
  { __typename?: 'Mutation' }
  & { signIn?: Maybe<(
    { __typename?: 'Token' }
    & Pick<TToken, 'accessToken'>
  )> }
);

export type TMSignOutVariables = Exact<{ [key: string]: never; }>;


export type TMSignOut = (
  { __typename?: 'Mutation' }
  & Pick<TMutation, 'signOut'>
);

export type TMSignUpVariables = Exact<{
  mail: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type TMSignUp = (
  { __typename?: 'Mutation' }
  & { signUp?: Maybe<(
    { __typename?: 'Token' }
    & Pick<TToken, 'accessToken'>
  )> }
);


export const MAddToAlbumDocument = gql`
    mutation MAddToAlbum($idAlbum: ID!, $media: [ID!]!) {
  addToAlbum(idAlbum: $idAlbum, media: $media) {
    id
  }
}
    `;
export type TMAddToAlbumMutationFn = Apollo.MutationFunction<TMAddToAlbum, TMAddToAlbumVariables>;

/**
 * __useMAddToAlbum__
 *
 * To run a mutation, you first call `useMAddToAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMAddToAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mAddToAlbum, { data, loading, error }] = useMAddToAlbum({
 *   variables: {
 *      idAlbum: // value for 'idAlbum'
 *      media: // value for 'media'
 *   },
 * });
 */
export function useMAddToAlbum(baseOptions?: Apollo.MutationHookOptions<TMAddToAlbum, TMAddToAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMAddToAlbum, TMAddToAlbumVariables>(MAddToAlbumDocument, options);
      }
export type MAddToAlbumHookResult = ReturnType<typeof useMAddToAlbum>;
export type MAddToAlbumMutationResult = Apollo.MutationResult<TMAddToAlbum>;
export type MAddToAlbumMutationOptions = Apollo.BaseMutationOptions<TMAddToAlbum, TMAddToAlbumVariables>;
export const QAlbumDocument = gql`
    query QAlbum($id: ID!) {
  album(id: $id) {
    id
    title
    description
    cover {
      id
    }
    owner {
      id
    }
  }
}
    `;

/**
 * __useQAlbum__
 *
 * To run a query within a React component, call `useQAlbum` and pass it any options that fit your needs.
 * When your component renders, `useQAlbum` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQAlbum({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQAlbum(baseOptions: Apollo.QueryHookOptions<TQAlbum, TQAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TQAlbum, TQAlbumVariables>(QAlbumDocument, options);
      }
export function useQAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TQAlbum, TQAlbumVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TQAlbum, TQAlbumVariables>(QAlbumDocument, options);
        }
export type QAlbumHookResult = ReturnType<typeof useQAlbum>;
export type QAlbumLazyQueryHookResult = ReturnType<typeof useQAlbumLazyQuery>;
export type QAlbumQueryResult = Apollo.QueryResult<TQAlbum, TQAlbumVariables>;
export const QAlbumMediaDocument = gql`
    query QAlbumMedia($id: ID!) {
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
    favoredBy {
      id
    }
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
    `;

/**
 * __useQAlbumMedia__
 *
 * To run a query within a React component, call `useQAlbumMedia` and pass it any options that fit your needs.
 * When your component renders, `useQAlbumMedia` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQAlbumMedia({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQAlbumMedia(baseOptions: Apollo.QueryHookOptions<TQAlbumMedia, TQAlbumMediaVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TQAlbumMedia, TQAlbumMediaVariables>(QAlbumMediaDocument, options);
      }
export function useQAlbumMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TQAlbumMedia, TQAlbumMediaVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TQAlbumMedia, TQAlbumMediaVariables>(QAlbumMediaDocument, options);
        }
export type QAlbumMediaHookResult = ReturnType<typeof useQAlbumMedia>;
export type QAlbumMediaLazyQueryHookResult = ReturnType<typeof useQAlbumMediaLazyQuery>;
export type QAlbumMediaQueryResult = Apollo.QueryResult<TQAlbumMedia, TQAlbumMediaVariables>;
export const QAlbumsDocument = gql`
    query QAlbums {
  albums {
    id
    title
    description
    cover {
      id
    }
    owner {
      id
    }
  }
}
    `;

/**
 * __useQAlbums__
 *
 * To run a query within a React component, call `useQAlbums` and pass it any options that fit your needs.
 * When your component renders, `useQAlbums` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQAlbums({
 *   variables: {
 *   },
 * });
 */
export function useQAlbums(baseOptions?: Apollo.QueryHookOptions<TQAlbums, TQAlbumsVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TQAlbums, TQAlbumsVariables>(QAlbumsDocument, options);
      }
export function useQAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TQAlbums, TQAlbumsVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TQAlbums, TQAlbumsVariables>(QAlbumsDocument, options);
        }
export type QAlbumsHookResult = ReturnType<typeof useQAlbums>;
export type QAlbumsLazyQueryHookResult = ReturnType<typeof useQAlbumsLazyQuery>;
export type QAlbumsQueryResult = Apollo.QueryResult<TQAlbums, TQAlbumsVariables>;
export const MCreateAlbumDocument = gql`
    mutation MCreateAlbum($album: AlbumInput, $media: [ID]) {
  createAlbum(album: $album, media: $media) {
    id
  }
}
    `;
export type TMCreateAlbumMutationFn = Apollo.MutationFunction<TMCreateAlbum, TMCreateAlbumVariables>;

/**
 * __useMCreateAlbum__
 *
 * To run a mutation, you first call `useMCreateAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMCreateAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mCreateAlbum, { data, loading, error }] = useMCreateAlbum({
 *   variables: {
 *      album: // value for 'album'
 *      media: // value for 'media'
 *   },
 * });
 */
export function useMCreateAlbum(baseOptions?: Apollo.MutationHookOptions<TMCreateAlbum, TMCreateAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMCreateAlbum, TMCreateAlbumVariables>(MCreateAlbumDocument, options);
      }
export type MCreateAlbumHookResult = ReturnType<typeof useMCreateAlbum>;
export type MCreateAlbumMutationResult = Apollo.MutationResult<TMCreateAlbum>;
export type MCreateAlbumMutationOptions = Apollo.BaseMutationOptions<TMCreateAlbum, TMCreateAlbumVariables>;
export const MDeleteAlbumDocument = gql`
    mutation MDeleteAlbum($ids: [ID]!) {
  deleteAlbum(ids: $ids) {
    count
  }
}
    `;
export type TMDeleteAlbumMutationFn = Apollo.MutationFunction<TMDeleteAlbum, TMDeleteAlbumVariables>;

/**
 * __useMDeleteAlbum__
 *
 * To run a mutation, you first call `useMDeleteAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMDeleteAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mDeleteAlbum, { data, loading, error }] = useMDeleteAlbum({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMDeleteAlbum(baseOptions?: Apollo.MutationHookOptions<TMDeleteAlbum, TMDeleteAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMDeleteAlbum, TMDeleteAlbumVariables>(MDeleteAlbumDocument, options);
      }
export type MDeleteAlbumHookResult = ReturnType<typeof useMDeleteAlbum>;
export type MDeleteAlbumMutationResult = Apollo.MutationResult<TMDeleteAlbum>;
export type MDeleteAlbumMutationOptions = Apollo.BaseMutationOptions<TMDeleteAlbum, TMDeleteAlbumVariables>;
export const MRemoveFromAlbumDocument = gql`
    mutation MRemoveFromAlbum($idAlbum: ID!, $media: [ID!]!) {
  removeFromAlbum(idAlbum: $idAlbum, media: $media) {
    id
  }
}
    `;
export type TMRemoveFromAlbumMutationFn = Apollo.MutationFunction<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>;

/**
 * __useMRemoveFromAlbum__
 *
 * To run a mutation, you first call `useMRemoveFromAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMRemoveFromAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mRemoveFromAlbum, { data, loading, error }] = useMRemoveFromAlbum({
 *   variables: {
 *      idAlbum: // value for 'idAlbum'
 *      media: // value for 'media'
 *   },
 * });
 */
export function useMRemoveFromAlbum(baseOptions?: Apollo.MutationHookOptions<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>(MRemoveFromAlbumDocument, options);
      }
export type MRemoveFromAlbumHookResult = ReturnType<typeof useMRemoveFromAlbum>;
export type MRemoveFromAlbumMutationResult = Apollo.MutationResult<TMRemoveFromAlbum>;
export type MRemoveFromAlbumMutationOptions = Apollo.BaseMutationOptions<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>;
export const MUpdateAlbumDocument = gql`
    mutation MUpdateAlbum($idAlbum: ID!, $fields: AlbumInput!) {
  updateAlbum(idAlbum: $idAlbum, fields: $fields) {
    id
  }
}
    `;
export type TMUpdateAlbumMutationFn = Apollo.MutationFunction<TMUpdateAlbum, TMUpdateAlbumVariables>;

/**
 * __useMUpdateAlbum__
 *
 * To run a mutation, you first call `useMUpdateAlbum` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMUpdateAlbum` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mUpdateAlbum, { data, loading, error }] = useMUpdateAlbum({
 *   variables: {
 *      idAlbum: // value for 'idAlbum'
 *      fields: // value for 'fields'
 *   },
 * });
 */
export function useMUpdateAlbum(baseOptions?: Apollo.MutationHookOptions<TMUpdateAlbum, TMUpdateAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMUpdateAlbum, TMUpdateAlbumVariables>(MUpdateAlbumDocument, options);
      }
export type MUpdateAlbumHookResult = ReturnType<typeof useMUpdateAlbum>;
export type MUpdateAlbumMutationResult = Apollo.MutationResult<TMUpdateAlbum>;
export type MUpdateAlbumMutationOptions = Apollo.BaseMutationOptions<TMUpdateAlbum, TMUpdateAlbumVariables>;
export const MAddToFavoritesDocument = gql`
    mutation MAddToFavorites($media: [ID!]!) {
  addToFavorites(media: $media) {
    id
  }
}
    `;
export type TMAddToFavoritesMutationFn = Apollo.MutationFunction<TMAddToFavorites, TMAddToFavoritesVariables>;

/**
 * __useMAddToFavorites__
 *
 * To run a mutation, you first call `useMAddToFavorites` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMAddToFavorites` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mAddToFavorites, { data, loading, error }] = useMAddToFavorites({
 *   variables: {
 *      media: // value for 'media'
 *   },
 * });
 */
export function useMAddToFavorites(baseOptions?: Apollo.MutationHookOptions<TMAddToFavorites, TMAddToFavoritesVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMAddToFavorites, TMAddToFavoritesVariables>(MAddToFavoritesDocument, options);
      }
export type MAddToFavoritesHookResult = ReturnType<typeof useMAddToFavorites>;
export type MAddToFavoritesMutationResult = Apollo.MutationResult<TMAddToFavorites>;
export type MAddToFavoritesMutationOptions = Apollo.BaseMutationOptions<TMAddToFavorites, TMAddToFavoritesVariables>;
export const QFavoritesDocument = gql`
    query QFavorites {
  favorites {
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
    favoredBy {
      id
    }
    owner {
      id
    }
    uploader {
      id
    }
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
    `;

/**
 * __useQFavorites__
 *
 * To run a query within a React component, call `useQFavorites` and pass it any options that fit your needs.
 * When your component renders, `useQFavorites` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQFavorites({
 *   variables: {
 *   },
 * });
 */
export function useQFavorites(baseOptions?: Apollo.QueryHookOptions<TQFavorites, TQFavoritesVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TQFavorites, TQFavoritesVariables>(QFavoritesDocument, options);
      }
export function useQFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TQFavorites, TQFavoritesVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TQFavorites, TQFavoritesVariables>(QFavoritesDocument, options);
        }
export type QFavoritesHookResult = ReturnType<typeof useQFavorites>;
export type QFavoritesLazyQueryHookResult = ReturnType<typeof useQFavoritesLazyQuery>;
export type QFavoritesQueryResult = Apollo.QueryResult<TQFavorites, TQFavoritesVariables>;
export const MRemoveFromFavoritesDocument = gql`
    mutation MRemoveFromFavorites($media: [ID!]!) {
  removeFromFavorites(media: $media) {
    id
  }
}
    `;
export type TMRemoveFromFavoritesMutationFn = Apollo.MutationFunction<TMRemoveFromFavorites, TMRemoveFromFavoritesVariables>;

/**
 * __useMRemoveFromFavorites__
 *
 * To run a mutation, you first call `useMRemoveFromFavorites` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMRemoveFromFavorites` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mRemoveFromFavorites, { data, loading, error }] = useMRemoveFromFavorites({
 *   variables: {
 *      media: // value for 'media'
 *   },
 * });
 */
export function useMRemoveFromFavorites(baseOptions?: Apollo.MutationHookOptions<TMRemoveFromFavorites, TMRemoveFromFavoritesVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMRemoveFromFavorites, TMRemoveFromFavoritesVariables>(MRemoveFromFavoritesDocument, options);
      }
export type MRemoveFromFavoritesHookResult = ReturnType<typeof useMRemoveFromFavorites>;
export type MRemoveFromFavoritesMutationResult = Apollo.MutationResult<TMRemoveFromFavorites>;
export type MRemoveFromFavoritesMutationOptions = Apollo.BaseMutationOptions<TMRemoveFromFavorites, TMRemoveFromFavoritesVariables>;
export const MDeleteMediaDocument = gql`
    mutation MDeleteMedia($ids: [ID!]!) {
  deleteMedia(ids: $ids) {
    id
  }
}
    `;
export type TMDeleteMediaMutationFn = Apollo.MutationFunction<TMDeleteMedia, TMDeleteMediaVariables>;

/**
 * __useMDeleteMedia__
 *
 * To run a mutation, you first call `useMDeleteMedia` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMDeleteMedia` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mDeleteMedia, { data, loading, error }] = useMDeleteMedia({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMDeleteMedia(baseOptions?: Apollo.MutationHookOptions<TMDeleteMedia, TMDeleteMediaVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMDeleteMedia, TMDeleteMediaVariables>(MDeleteMediaDocument, options);
      }
export type MDeleteMediaHookResult = ReturnType<typeof useMDeleteMedia>;
export type MDeleteMediaMutationResult = Apollo.MutationResult<TMDeleteMedia>;
export type MDeleteMediaMutationOptions = Apollo.BaseMutationOptions<TMDeleteMedia, TMDeleteMediaVariables>;
export const MEmptyTrashDocument = gql`
    mutation MEmptyTrash {
  emptyTrash {
    id
  }
}
    `;
export type TMEmptyTrashMutationFn = Apollo.MutationFunction<TMEmptyTrash, TMEmptyTrashVariables>;

/**
 * __useMEmptyTrash__
 *
 * To run a mutation, you first call `useMEmptyTrash` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMEmptyTrash` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mEmptyTrash, { data, loading, error }] = useMEmptyTrash({
 *   variables: {
 *   },
 * });
 */
export function useMEmptyTrash(baseOptions?: Apollo.MutationHookOptions<TMEmptyTrash, TMEmptyTrashVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMEmptyTrash, TMEmptyTrashVariables>(MEmptyTrashDocument, options);
      }
export type MEmptyTrashHookResult = ReturnType<typeof useMEmptyTrash>;
export type MEmptyTrashMutationResult = Apollo.MutationResult<TMEmptyTrash>;
export type MEmptyTrashMutationOptions = Apollo.BaseMutationOptions<TMEmptyTrash, TMEmptyTrashVariables>;
export const QMediaDocument = gql`
    query QMedia($status: String, $sort: String) {
  media(status: $status, sort: $sort) {
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
    favoredBy {
      id
    }
    owner {
      id
    }
    uploader {
      id
    }
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
    `;

/**
 * __useQMedia__
 *
 * To run a query within a React component, call `useQMedia` and pass it any options that fit your needs.
 * When your component renders, `useQMedia` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQMedia({
 *   variables: {
 *      status: // value for 'status'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useQMedia(baseOptions?: Apollo.QueryHookOptions<TQMedia, TQMediaVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TQMedia, TQMediaVariables>(QMediaDocument, options);
      }
export function useQMediaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TQMedia, TQMediaVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TQMedia, TQMediaVariables>(QMediaDocument, options);
        }
export type QMediaHookResult = ReturnType<typeof useQMedia>;
export type QMediaLazyQueryHookResult = ReturnType<typeof useQMediaLazyQuery>;
export type QMediaQueryResult = Apollo.QueryResult<TQMedia, TQMediaVariables>;
export const QMediaYearCountDocument = gql`
    query QMediaYearCount {
  mediaCountByYear {
    years {
      months {
        month
        count
      }
      year
      count
    }
    count
  }
}
    `;

/**
 * __useQMediaYearCount__
 *
 * To run a query within a React component, call `useQMediaYearCount` and pass it any options that fit your needs.
 * When your component renders, `useQMediaYearCount` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQMediaYearCount({
 *   variables: {
 *   },
 * });
 */
export function useQMediaYearCount(baseOptions?: Apollo.QueryHookOptions<TQMediaYearCount, TQMediaYearCountVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TQMediaYearCount, TQMediaYearCountVariables>(QMediaYearCountDocument, options);
      }
export function useQMediaYearCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TQMediaYearCount, TQMediaYearCountVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TQMediaYearCount, TQMediaYearCountVariables>(QMediaYearCountDocument, options);
        }
export type QMediaYearCountHookResult = ReturnType<typeof useQMediaYearCount>;
export type QMediaYearCountLazyQueryHookResult = ReturnType<typeof useQMediaYearCountLazyQuery>;
export type QMediaYearCountQueryResult = Apollo.QueryResult<TQMediaYearCount, TQMediaYearCountVariables>;
export const QMediumDocument = gql`
    query QMedium($id: ID!) {
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
    favoredBy {
      id
    }
    owner {
      id
    }
    uploader {
      id
    }
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
    `;

/**
 * __useQMedium__
 *
 * To run a query within a React component, call `useQMedium` and pass it any options that fit your needs.
 * When your component renders, `useQMedium` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQMedium({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQMedium(baseOptions: Apollo.QueryHookOptions<TQMedium, TQMediumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TQMedium, TQMediumVariables>(QMediumDocument, options);
      }
export function useQMediumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TQMedium, TQMediumVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TQMedium, TQMediumVariables>(QMediumDocument, options);
        }
export type QMediumHookResult = ReturnType<typeof useQMedium>;
export type QMediumLazyQueryHookResult = ReturnType<typeof useQMediumLazyQuery>;
export type QMediumQueryResult = Apollo.QueryResult<TQMedium, TQMediumVariables>;
export const MRotateDocument = gql`
    mutation MRotate($id: ID!) {
  rotate(id: $id) {
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
    favoredBy {
      id
    }
    owner {
      id
    }
    uploader {
      id
    }
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
    `;
export type TMRotateMutationFn = Apollo.MutationFunction<TMRotate, TMRotateVariables>;

/**
 * __useMRotate__
 *
 * To run a mutation, you first call `useMRotate` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMRotate` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mRotate, { data, loading, error }] = useMRotate({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMRotate(baseOptions?: Apollo.MutationHookOptions<TMRotate, TMRotateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMRotate, TMRotateVariables>(MRotateDocument, options);
      }
export type MRotateHookResult = ReturnType<typeof useMRotate>;
export type MRotateMutationResult = Apollo.MutationResult<TMRotate>;
export type MRotateMutationOptions = Apollo.BaseMutationOptions<TMRotate, TMRotateVariables>;
export const MSetMediaStatusDocument = gql`
    mutation MSetMediaStatus($media: [ID]!, $status: String!) {
  setMediaStatus(media: $media, status: $status) {
    count
  }
}
    `;
export type TMSetMediaStatusMutationFn = Apollo.MutationFunction<TMSetMediaStatus, TMSetMediaStatusVariables>;

/**
 * __useMSetMediaStatus__
 *
 * To run a mutation, you first call `useMSetMediaStatus` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMSetMediaStatus` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mSetMediaStatus, { data, loading, error }] = useMSetMediaStatus({
 *   variables: {
 *      media: // value for 'media'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useMSetMediaStatus(baseOptions?: Apollo.MutationHookOptions<TMSetMediaStatus, TMSetMediaStatusVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMSetMediaStatus, TMSetMediaStatusVariables>(MSetMediaStatusDocument, options);
      }
export type MSetMediaStatusHookResult = ReturnType<typeof useMSetMediaStatus>;
export type MSetMediaStatusMutationResult = Apollo.MutationResult<TMSetMediaStatus>;
export type MSetMediaStatusMutationOptions = Apollo.BaseMutationOptions<TMSetMediaStatus, TMSetMediaStatusVariables>;
export const MUploadDocument = gql`
    mutation MUpload($files: [Upload!]!) {
  upload(files: $files) {
    id
  }
}
    `;
export type TMUploadMutationFn = Apollo.MutationFunction<TMUpload, TMUploadVariables>;

/**
 * __useMUpload__
 *
 * To run a mutation, you first call `useMUpload` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMUpload` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mUpload, { data, loading, error }] = useMUpload({
 *   variables: {
 *      files: // value for 'files'
 *   },
 * });
 */
export function useMUpload(baseOptions?: Apollo.MutationHookOptions<TMUpload, TMUploadVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMUpload, TMUploadVariables>(MUploadDocument, options);
      }
export type MUploadHookResult = ReturnType<typeof useMUpload>;
export type MUploadMutationResult = Apollo.MutationResult<TMUpload>;
export type MUploadMutationOptions = Apollo.BaseMutationOptions<TMUpload, TMUploadVariables>;
export const MSignInDocument = gql`
    mutation MSignIn($mail: String!, $password: String!) {
  signIn(mail: $mail, password: $password) {
    accessToken
  }
}
    `;
export type TMSignInMutationFn = Apollo.MutationFunction<TMSignIn, TMSignInVariables>;

/**
 * __useMSignIn__
 *
 * To run a mutation, you first call `useMSignIn` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMSignIn` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mSignIn, { data, loading, error }] = useMSignIn({
 *   variables: {
 *      mail: // value for 'mail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useMSignIn(baseOptions?: Apollo.MutationHookOptions<TMSignIn, TMSignInVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMSignIn, TMSignInVariables>(MSignInDocument, options);
      }
export type MSignInHookResult = ReturnType<typeof useMSignIn>;
export type MSignInMutationResult = Apollo.MutationResult<TMSignIn>;
export type MSignInMutationOptions = Apollo.BaseMutationOptions<TMSignIn, TMSignInVariables>;
export const MSignOutDocument = gql`
    mutation MSignOut {
  signOut
}
    `;
export type TMSignOutMutationFn = Apollo.MutationFunction<TMSignOut, TMSignOutVariables>;

/**
 * __useMSignOut__
 *
 * To run a mutation, you first call `useMSignOut` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMSignOut` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mSignOut, { data, loading, error }] = useMSignOut({
 *   variables: {
 *   },
 * });
 */
export function useMSignOut(baseOptions?: Apollo.MutationHookOptions<TMSignOut, TMSignOutVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMSignOut, TMSignOutVariables>(MSignOutDocument, options);
      }
export type MSignOutHookResult = ReturnType<typeof useMSignOut>;
export type MSignOutMutationResult = Apollo.MutationResult<TMSignOut>;
export type MSignOutMutationOptions = Apollo.BaseMutationOptions<TMSignOut, TMSignOutVariables>;
export const MSignUpDocument = gql`
    mutation MSignUp($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signUp(
    mail: $mail
    password: $password
    firstName: $firstName
    lastName: $lastName
  ) {
    accessToken
  }
}
    `;
export type TMSignUpMutationFn = Apollo.MutationFunction<TMSignUp, TMSignUpVariables>;

/**
 * __useMSignUp__
 *
 * To run a mutation, you first call `useMSignUp` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMSignUp` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mSignUp, { data, loading, error }] = useMSignUp({
 *   variables: {
 *      mail: // value for 'mail'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useMSignUp(baseOptions?: Apollo.MutationHookOptions<TMSignUp, TMSignUpVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMSignUp, TMSignUpVariables>(MSignUpDocument, options);
      }
export type MSignUpHookResult = ReturnType<typeof useMSignUp>;
export type MSignUpMutationResult = Apollo.MutationResult<TMSignUp>;
export type MSignUpMutationOptions = Apollo.BaseMutationOptions<TMSignUp, TMSignUpVariables>;