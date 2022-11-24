import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = Partial<T> | T | null;
export type InputMaybe<T> = Partial<T> | T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type TAlbum = {
  __typename?: 'Album';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  idMedium?: Maybe<Scalars['ID']>;
  owner?: Maybe<TUser>;
  title?: Maybe<Scalars['String']>;
};

export type TAlbumInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  idMedium?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
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
  dateCreated?: Maybe<Scalars['String']>;
  dateModified?: Maybe<Scalars['String']>;
  dateModifiedStatus?: Maybe<Scalars['String']>;
  dateTaken?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  filenameDisk?: Maybe<Scalars['String']>;
  filenameDownload?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
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
  addToAlbum?: Maybe<Array<Maybe<TMedium>>>;
  createAlbum?: Maybe<TAlbum>;
  deleteAlbum?: Maybe<Array<Maybe<TAlbum>>>;
  deleteMedia?: Maybe<Array<Maybe<TMedium>>>;
  emptyTrash?: Maybe<Array<Maybe<TMedium>>>;
  login?: Maybe<TToken>;
  removeFromAlbum?: Maybe<TAlbum>;
  rotate?: Maybe<TMedium>;
  setAlbumCover?: Maybe<TAlbum>;
  setMediaStatus?: Maybe<Array<Maybe<TMedium>>>;
  signup?: Maybe<TToken>;
  updateAlbumTitle?: Maybe<TAlbum>;
  upload: Array<Maybe<TFile>>;
};


export type TMutationAddToAlbumArgs = {
  idAlbum: Scalars['ID'];
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
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type TMutationLoginArgs = {
  mail: Scalars['String'];
  password: Scalars['String'];
};


export type TMutationRemoveFromAlbumArgs = {
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']>;
};


export type TMutationRotateArgs = {
  id: Scalars['ID'];
};


export type TMutationSetAlbumCoverArgs = {
  idAlbum: Scalars['ID'];
  idMedium: Scalars['ID'];
};


export type TMutationSetMediaStatusArgs = {
  media: Array<InputMaybe<Scalars['ID']>>;
  status?: InputMaybe<Scalars['String']>;
};


export type TMutationSignupArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  mail: Scalars['String'];
  password: Scalars['String'];
};


export type TMutationUpdateAlbumTitleArgs = {
  id: Scalars['ID'];
  title: Scalars['String'];
};


export type TMutationUploadArgs = {
  file: Array<InputMaybe<Scalars['Upload']>>;
};

export type TQuery = {
  __typename?: 'Query';
  album?: Maybe<TAlbum>;
  albumMedia?: Maybe<Array<Maybe<TMedium>>>;
  albums?: Maybe<Array<Maybe<TAlbum>>>;
  media?: Maybe<Array<Maybe<TMedium>>>;
  medium?: Maybe<TMedium>;
  user?: Maybe<TUser>;
  users?: Maybe<Array<Maybe<TUser>>>;
};


export type TQueryAlbumArgs = {
  id: Scalars['ID'];
};


export type TQueryAlbumMediaArgs = {
  id: Scalars['ID'];
};


export type TQueryMediaArgs = {
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
};

export type TUser = {
  __typename?: 'User';
  dateCreated: Scalars['String'];
  dateModified: Scalars['String'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type TResolversTypes = {
  Album: ResolverTypeWrapper<TAlbum>;
  AlbumInput: TAlbumInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  File: ResolverTypeWrapper<TFile>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImageMeta: ResolverTypeWrapper<TImageMeta>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Medium: ResolverTypeWrapper<Omit<TMedium, 'meta'> & { meta?: Maybe<TResolversTypes['Meta']> }>;
  Meta: TResolversTypes['ImageMeta'] | TResolversTypes['VideoMeta'];
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Token: ResolverTypeWrapper<TToken>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<TUser>;
  VideoMeta: ResolverTypeWrapper<TVideoMeta>;
};

/** Mapping between all available schema types and the resolvers parents */
export type TResolversParentTypes = {
  Album: TAlbum;
  AlbumInput: TAlbumInput;
  Boolean: Scalars['Boolean'];
  File: TFile;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  ImageMeta: TImageMeta;
  Int: Scalars['Int'];
  Medium: Omit<TMedium, 'meta'> & { meta?: Maybe<TResolversParentTypes['Meta']> };
  Meta: TResolversParentTypes['ImageMeta'] | TResolversParentTypes['VideoMeta'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Token: TToken;
  Upload: Scalars['Upload'];
  User: TUser;
  VideoMeta: TVideoMeta;
};

export type TAlbumResolvers<ContextType = any, ParentType extends TResolversParentTypes['Album'] = TResolversParentTypes['Album']> = {
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  idMedium?: Resolver<Maybe<TResolversTypes['ID']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType>;
  title?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TFileResolvers<ContextType = any, ParentType extends TResolversParentTypes['File'] = TResolversParentTypes['File']> = {
  url?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TImageMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['ImageMeta'] = TResolversParentTypes['ImageMeta']> = {
  cameraMake?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  cameraModel?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  fNumber?: Resolver<Maybe<TResolversTypes['Float']>, ParentType, ContextType>;
  flash?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  iso?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMediumResolvers<ContextType = any, ParentType extends TResolversParentTypes['Medium'] = TResolversParentTypes['Medium']> = {
  dateCreated?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  dateModifiedStatus?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  dateTaken?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  filenameDisk?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  filenameDownload?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<TResolversTypes['ID']>, ParentType, ContextType>;
  lat?: Resolver<Maybe<TResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<TResolversTypes['Float']>, ParentType, ContextType>;
  meta?: Resolver<Maybe<TResolversTypes['Meta']>, ParentType, ContextType>;
  mimetype?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType>;
  status?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  uploader?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['Meta'] = TResolversParentTypes['Meta']> = {
  __resolveType: TypeResolveFn<'ImageMeta' | 'VideoMeta', ParentType, ContextType>;
};

export type TMutationResolvers<ContextType = any, ParentType extends TResolversParentTypes['Mutation'] = TResolversParentTypes['Mutation']> = {
  addToAlbum?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType, RequireFields<TMutationAddToAlbumArgs, 'idAlbum' | 'media'>>;
  createAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, Partial<TMutationCreateAlbumArgs>>;
  deleteAlbum?: Resolver<Maybe<Array<Maybe<TResolversTypes['Album']>>>, ParentType, ContextType, RequireFields<TMutationDeleteAlbumArgs, 'ids'>>;
  deleteMedia?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType, RequireFields<TMutationDeleteMediaArgs, 'ids'>>;
  emptyTrash?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType>;
  login?: Resolver<Maybe<TResolversTypes['Token']>, ParentType, ContextType, RequireFields<TMutationLoginArgs, 'mail' | 'password'>>;
  removeFromAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationRemoveFromAlbumArgs, 'idAlbum' | 'media'>>;
  rotate?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationRotateArgs, 'id'>>;
  setAlbumCover?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationSetAlbumCoverArgs, 'idAlbum' | 'idMedium'>>;
  setMediaStatus?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType, RequireFields<TMutationSetMediaStatusArgs, 'media'>>;
  signup?: Resolver<Maybe<TResolversTypes['Token']>, ParentType, ContextType, RequireFields<TMutationSignupArgs, 'firstName' | 'lastName' | 'mail' | 'password'>>;
  updateAlbumTitle?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationUpdateAlbumTitleArgs, 'id' | 'title'>>;
  upload?: Resolver<Array<Maybe<TResolversTypes['File']>>, ParentType, ContextType, RequireFields<TMutationUploadArgs, 'file'>>;
};

export type TQueryResolvers<ContextType = any, ParentType extends TResolversParentTypes['Query'] = TResolversParentTypes['Query']> = {
  album?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TQueryAlbumArgs, 'id'>>;
  albumMedia?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType, RequireFields<TQueryAlbumMediaArgs, 'id'>>;
  albums?: Resolver<Maybe<Array<Maybe<TResolversTypes['Album']>>>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType, Partial<TQueryMediaArgs>>;
  medium?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TQueryMediumArgs, 'id'>>;
  user?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType, RequireFields<TQueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<TResolversTypes['User']>>>, ParentType, ContextType>;
};

export type TTokenResolvers<ContextType = any, ParentType extends TResolversParentTypes['Token'] = TResolversParentTypes['Token']> = {
  accessToken?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TUploadScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type TUserResolvers<ContextType = any, ParentType extends TResolversParentTypes['User'] = TResolversParentTypes['User']> = {
  dateCreated?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  dateModified?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  mail?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TVideoMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['VideoMeta'] = TResolversParentTypes['VideoMeta']> = {
  duration?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TResolvers<ContextType = any> = {
  Album?: TAlbumResolvers<ContextType>;
  File?: TFileResolvers<ContextType>;
  ImageMeta?: TImageMetaResolvers<ContextType>;
  Medium?: TMediumResolvers<ContextType>;
  Meta?: TMetaResolvers<ContextType>;
  Mutation?: TMutationResolvers<ContextType>;
  Query?: TQueryResolvers<ContextType>;
  Token?: TTokenResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: TUserResolvers<ContextType>;
  VideoMeta?: TVideoMetaResolvers<ContextType>;
};


export type TMAddToAlbumVariables = Exact<{
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TMAddToAlbum = (
  { __typename?: 'Mutation' }
  & { addToAlbum?: Maybe<Array<Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )>>> }
);

export type TQAlbumVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TQAlbum = (
  { __typename?: 'Query' }
  & { album?: Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description' | 'idMedium'>
    & { owner?: Maybe<(
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
  & { albumMedia?: Maybe<Array<Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )>>> }
);

export type TQAlbumsVariables = Exact<{ [key: string]: never; }>;


export type TQAlbums = (
  { __typename?: 'Query' }
  & { albums?: Maybe<Array<Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description' | 'idMedium'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )> }
  )>>> }
);

export type TMCreateAlbumVariables = Exact<{
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
  & { deleteAlbum?: Maybe<Array<Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  )>>> }
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

export type TMSetAlbumCoverVariables = Exact<{
  idAlbum: Scalars['ID'];
  idMedium: Scalars['ID'];
}>;


export type TMSetAlbumCover = (
  { __typename?: 'Mutation' }
  & { setAlbumCover?: Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  )> }
);

export type TMUpdateAlbumTitleVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type TMUpdateAlbumTitle = (
  { __typename?: 'Mutation' }
  & { updateAlbumTitle?: Maybe<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  )> }
);

export type TMDeleteMediaVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type TMDeleteMedia = (
  { __typename?: 'Mutation' }
  & { deleteMedia?: Maybe<Array<Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )>>> }
);

export type TMEmptyTrashVariables = Exact<{ [key: string]: never; }>;


export type TMEmptyTrash = (
  { __typename?: 'Mutation' }
  & { emptyTrash?: Maybe<Array<Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )>>> }
);

export type TQMediaVariables = Exact<{
  status?: InputMaybe<Scalars['String']>;
}>;


export type TQMedia = (
  { __typename?: 'Query' }
  & { media?: Maybe<Array<Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { owner?: Maybe<(
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
  )>>> }
);

export type TQMediumVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TQMedium = (
  { __typename?: 'Query' }
  & { medium?: Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'lat' | 'lng' | 'status' | 'mimetype'>
    & { owner?: Maybe<(
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
  & { rotate?: Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TMSetMediaStatusVariables = Exact<{
  media: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Scalars['String']>;
}>;


export type TMSetMediaStatus = (
  { __typename?: 'Mutation' }
  & { setMediaStatus?: Maybe<Array<Maybe<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )>>> }
);

export type TMUploadVariables = Exact<{
  file: Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>;
}>;


export type TMUpload = (
  { __typename?: 'Mutation' }
  & { upload: Array<Maybe<(
    { __typename?: 'File' }
    & Pick<TFile, 'url'>
  )>> }
);

export type TMLoginVariables = Exact<{
  mail: Scalars['String'];
  password: Scalars['String'];
}>;


export type TMLogin = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'Token' }
    & Pick<TToken, 'accessToken'>
  )> }
);

export type TMSignupVariables = Exact<{
  mail: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type TMSignup = (
  { __typename?: 'Mutation' }
  & { signup?: Maybe<(
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
    idMedium
    owner {
      id
    }
  }
}
    `;
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
    idMedium
    owner {
      id
    }
  }
}
    `;
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
    mutation MCreateAlbum($media: [ID]) {
  createAlbum(media: $media) {
    id
  }
}
    `;
export type TMCreateAlbumMutationFn = Apollo.MutationFunction<TMCreateAlbum, TMCreateAlbumVariables>;
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
    id
  }
}
    `;
export type TMDeleteAlbumMutationFn = Apollo.MutationFunction<TMDeleteAlbum, TMDeleteAlbumVariables>;
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
export function useMRemoveFromAlbum(baseOptions?: Apollo.MutationHookOptions<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>(MRemoveFromAlbumDocument, options);
      }
export type MRemoveFromAlbumHookResult = ReturnType<typeof useMRemoveFromAlbum>;
export type MRemoveFromAlbumMutationResult = Apollo.MutationResult<TMRemoveFromAlbum>;
export type MRemoveFromAlbumMutationOptions = Apollo.BaseMutationOptions<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>;
export const MSetAlbumCoverDocument = gql`
    mutation MSetAlbumCover($idAlbum: ID!, $idMedium: ID!) {
  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {
    id
  }
}
    `;
export type TMSetAlbumCoverMutationFn = Apollo.MutationFunction<TMSetAlbumCover, TMSetAlbumCoverVariables>;
export function useMSetAlbumCover(baseOptions?: Apollo.MutationHookOptions<TMSetAlbumCover, TMSetAlbumCoverVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMSetAlbumCover, TMSetAlbumCoverVariables>(MSetAlbumCoverDocument, options);
      }
export type MSetAlbumCoverHookResult = ReturnType<typeof useMSetAlbumCover>;
export type MSetAlbumCoverMutationResult = Apollo.MutationResult<TMSetAlbumCover>;
export type MSetAlbumCoverMutationOptions = Apollo.BaseMutationOptions<TMSetAlbumCover, TMSetAlbumCoverVariables>;
export const MUpdateAlbumTitleDocument = gql`
    mutation MUpdateAlbumTitle($id: ID!, $title: String!) {
  updateAlbumTitle(id: $id, title: $title) {
    id
  }
}
    `;
export type TMUpdateAlbumTitleMutationFn = Apollo.MutationFunction<TMUpdateAlbumTitle, TMUpdateAlbumTitleVariables>;
export function useMUpdateAlbumTitle(baseOptions?: Apollo.MutationHookOptions<TMUpdateAlbumTitle, TMUpdateAlbumTitleVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMUpdateAlbumTitle, TMUpdateAlbumTitleVariables>(MUpdateAlbumTitleDocument, options);
      }
export type MUpdateAlbumTitleHookResult = ReturnType<typeof useMUpdateAlbumTitle>;
export type MUpdateAlbumTitleMutationResult = Apollo.MutationResult<TMUpdateAlbumTitle>;
export type MUpdateAlbumTitleMutationOptions = Apollo.BaseMutationOptions<TMUpdateAlbumTitle, TMUpdateAlbumTitleVariables>;
export const MDeleteMediaDocument = gql`
    mutation MDeleteMedia($ids: [ID]!) {
  deleteMedia(ids: $ids) {
    id
  }
}
    `;
export type TMDeleteMediaMutationFn = Apollo.MutationFunction<TMDeleteMedia, TMDeleteMediaVariables>;
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
export function useMEmptyTrash(baseOptions?: Apollo.MutationHookOptions<TMEmptyTrash, TMEmptyTrashVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMEmptyTrash, TMEmptyTrashVariables>(MEmptyTrashDocument, options);
      }
export type MEmptyTrashHookResult = ReturnType<typeof useMEmptyTrash>;
export type MEmptyTrashMutationResult = Apollo.MutationResult<TMEmptyTrash>;
export type MEmptyTrashMutationOptions = Apollo.BaseMutationOptions<TMEmptyTrash, TMEmptyTrashVariables>;
export const QMediaDocument = gql`
    query QMedia($status: String) {
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
    id
  }
}
    `;
export type TMRotateMutationFn = Apollo.MutationFunction<TMRotate, TMRotateVariables>;
export function useMRotate(baseOptions?: Apollo.MutationHookOptions<TMRotate, TMRotateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMRotate, TMRotateVariables>(MRotateDocument, options);
      }
export type MRotateHookResult = ReturnType<typeof useMRotate>;
export type MRotateMutationResult = Apollo.MutationResult<TMRotate>;
export type MRotateMutationOptions = Apollo.BaseMutationOptions<TMRotate, TMRotateVariables>;
export const MSetMediaStatusDocument = gql`
    mutation MSetMediaStatus($media: [ID]!, $status: String) {
  setMediaStatus(media: $media, status: $status) {
    id
  }
}
    `;
export type TMSetMediaStatusMutationFn = Apollo.MutationFunction<TMSetMediaStatus, TMSetMediaStatusVariables>;
export function useMSetMediaStatus(baseOptions?: Apollo.MutationHookOptions<TMSetMediaStatus, TMSetMediaStatusVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMSetMediaStatus, TMSetMediaStatusVariables>(MSetMediaStatusDocument, options);
      }
export type MSetMediaStatusHookResult = ReturnType<typeof useMSetMediaStatus>;
export type MSetMediaStatusMutationResult = Apollo.MutationResult<TMSetMediaStatus>;
export type MSetMediaStatusMutationOptions = Apollo.BaseMutationOptions<TMSetMediaStatus, TMSetMediaStatusVariables>;
export const MUploadDocument = gql`
    mutation MUpload($file: [Upload]!) {
  upload(file: $file) {
    url
  }
}
    `;
export type TMUploadMutationFn = Apollo.MutationFunction<TMUpload, TMUploadVariables>;
export function useMUpload(baseOptions?: Apollo.MutationHookOptions<TMUpload, TMUploadVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMUpload, TMUploadVariables>(MUploadDocument, options);
      }
export type MUploadHookResult = ReturnType<typeof useMUpload>;
export type MUploadMutationResult = Apollo.MutationResult<TMUpload>;
export type MUploadMutationOptions = Apollo.BaseMutationOptions<TMUpload, TMUploadVariables>;
export const MLoginDocument = gql`
    mutation MLogin($mail: String!, $password: String!) {
  login(mail: $mail, password: $password) {
    accessToken
  }
}
    `;
export type TMLoginMutationFn = Apollo.MutationFunction<TMLogin, TMLoginVariables>;
export function useMLogin(baseOptions?: Apollo.MutationHookOptions<TMLogin, TMLoginVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMLogin, TMLoginVariables>(MLoginDocument, options);
      }
export type MLoginHookResult = ReturnType<typeof useMLogin>;
export type MLoginMutationResult = Apollo.MutationResult<TMLogin>;
export type MLoginMutationOptions = Apollo.BaseMutationOptions<TMLogin, TMLoginVariables>;
export const MSignupDocument = gql`
    mutation MSignup($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signup(
    mail: $mail
    password: $password
    firstName: $firstName
    lastName: $lastName
  ) {
    accessToken
  }
}
    `;
export type TMSignupMutationFn = Apollo.MutationFunction<TMSignup, TMSignupVariables>;
export function useMSignup(baseOptions?: Apollo.MutationHookOptions<TMSignup, TMSignupVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TMSignup, TMSignupVariables>(MSignupDocument, options);
      }
export type MSignupHookResult = ReturnType<typeof useMSignup>;
export type MSignupMutationResult = Apollo.MutationResult<TMSignup>;
export type MSignupMutationOptions = Apollo.BaseMutationOptions<TMSignup, TMSignupVariables>;