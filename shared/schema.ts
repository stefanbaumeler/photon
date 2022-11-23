import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  addToAlbum?: Maybe<Array<Maybe<TMedium>>>;
  createAlbum?: Maybe<TAlbum>;
  deleteAlbum?: Maybe<Array<Maybe<TAlbum>>>;
  deleteMedia?: Maybe<Array<Maybe<Scalars['ID']>>>;
  emptyTrash?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
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
  deleteMedia?: Resolver<Maybe<Array<Maybe<TResolversTypes['ID']>>>, ParentType, ContextType, RequireFields<TMutationDeleteMediaArgs, 'ids'>>;
  emptyTrash?: Resolver<Maybe<Array<Maybe<TResolversTypes['ID']>>>, ParentType, ContextType>;
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


export type TAddToAlbumVariables = Exact<{
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TAddToAlbum = { __typename?: 'Mutation', addToAlbum?: Array<{ __typename?: 'Medium', id: string } | null> | null };

export type TAlbumQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TAlbumQuery = { __typename?: 'Query', album?: { __typename?: 'Album', id: string, title?: string | null, description?: string | null, idMedium?: string | null, owner?: { __typename?: 'User', id: string } | null } | null };

export type TAlbumMediaQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TAlbumMediaQuery = { __typename?: 'Query', albumMedia?: Array<{ __typename?: 'Medium', dateCreated?: string | null, dateModified?: string | null, dateTaken?: string | null, id: string, filenameDisk?: string | null, filenameDownload?: string | null, title?: string | null, description?: string | null, lat?: number | null, lng?: number | null, status?: string | null, mimetype?: string | null, meta?: { __typename?: 'ImageMeta', width?: number | null, height?: number | null, cameraMake?: string | null, cameraModel?: string | null, flash?: number | null, fNumber?: number | null, iso?: number | null } | { __typename?: 'VideoMeta', width?: number | null, height?: number | null, duration?: number | null } | null } | null> | null };

export type TAlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type TAlbumsQuery = { __typename?: 'Query', albums?: Array<{ __typename?: 'Album', id: string, title?: string | null, description?: string | null, idMedium?: string | null, owner?: { __typename?: 'User', id: string } | null } | null> | null };

export type TCreateAlbumVariables = Exact<{
  media?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
}>;


export type TCreateAlbum = { __typename?: 'Mutation', createAlbum?: { __typename?: 'Album', id: string } | null };

export type TDeleteAlbumVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type TDeleteAlbum = { __typename?: 'Mutation', deleteAlbum?: Array<{ __typename?: 'Album', id: string } | null> | null };

export type TRemoveFromAlbumVariables = Exact<{
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TRemoveFromAlbum = { __typename?: 'Mutation', removeFromAlbum?: { __typename?: 'Album', id: string } | null };

export type TSetAlbumCoverVariables = Exact<{
  idAlbum: Scalars['ID'];
  idMedium: Scalars['ID'];
}>;


export type TSetAlbumCover = { __typename?: 'Mutation', setAlbumCover?: { __typename?: 'Album', id: string } | null };

export type TUpdateAlbumTitleVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
}>;


export type TUpdateAlbumTitle = { __typename?: 'Mutation', updateAlbumTitle?: { __typename?: 'Album', id: string } | null };

export type TDeleteMediaVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;


export type TDeleteMedia = { __typename?: 'Mutation', deleteMedia?: Array<string | null> | null };

export type TEmptyTrashVariables = Exact<{ [key: string]: never; }>;


export type TEmptyTrash = { __typename?: 'Mutation', emptyTrash?: Array<string | null> | null };

export type TMediaQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']>;
}>;


export type TMediaQuery = { __typename?: 'Query', media?: Array<{ __typename?: 'Medium', dateCreated?: string | null, dateModified?: string | null, dateTaken?: string | null, id: string, filenameDisk?: string | null, filenameDownload?: string | null, title?: string | null, description?: string | null, lat?: number | null, lng?: number | null, status?: string | null, mimetype?: string | null, owner?: { __typename?: 'User', id: string } | null, uploader?: { __typename?: 'User', id: string } | null, meta?: { __typename?: 'ImageMeta', width?: number | null, height?: number | null, cameraMake?: string | null, cameraModel?: string | null, flash?: number | null, fNumber?: number | null, iso?: number | null } | { __typename?: 'VideoMeta', width?: number | null, height?: number | null, duration?: number | null } | null } | null> | null };

export type TMediumQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TMediumQuery = { __typename?: 'Query', medium?: { __typename?: 'Medium', dateCreated?: string | null, dateModified?: string | null, dateTaken?: string | null, id: string, filenameDisk?: string | null, filenameDownload?: string | null, title?: string | null, description?: string | null, lat?: number | null, lng?: number | null, status?: string | null, mimetype?: string | null, owner?: { __typename?: 'User', id: string } | null, uploader?: { __typename?: 'User', id: string } | null, meta?: { __typename?: 'ImageMeta', width?: number | null, height?: number | null, cameraMake?: string | null, cameraModel?: string | null, flash?: number | null, fNumber?: number | null, iso?: number | null } | { __typename?: 'VideoMeta', width?: number | null, height?: number | null, duration?: number | null } | null } | null };

export type TRotateVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TRotate = { __typename?: 'Mutation', rotate?: { __typename?: 'Medium', id: string } | null };

export type TSetMediaStatusVariables = Exact<{
  media: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
  status?: InputMaybe<Scalars['String']>;
}>;


export type TSetMediaStatus = { __typename?: 'Mutation', setMediaStatus?: Array<{ __typename?: 'Medium', id: string } | null> | null };

export type TUploadVariables = Exact<{
  file: Array<InputMaybe<Scalars['Upload']>> | InputMaybe<Scalars['Upload']>;
}>;


export type TUpload = { __typename?: 'Mutation', upload: Array<{ __typename?: 'File', url?: string | null } | null> };

export type TLoginVariables = Exact<{
  mail: Scalars['String'];
  password: Scalars['String'];
}>;


export type TLogin = { __typename?: 'Mutation', login?: { __typename?: 'Token', accessToken: string } | null };

export type TSignupVariables = Exact<{
  mail: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type TSignup = { __typename?: 'Mutation', signup?: { __typename?: 'Token', accessToken: string } | null };


export const AddToAlbumDocument = gql`
    mutation addToAlbum($idAlbum: ID!, $media: [ID!]!) {
  addToAlbum(idAlbum: $idAlbum, media: $media) {
    id
  }
}
    `;
export type TAddToAlbumMutationFn = Apollo.MutationFunction<TAddToAlbum, TAddToAlbumVariables>;
export function useAddToAlbum(baseOptions?: Apollo.MutationHookOptions<TAddToAlbum, TAddToAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TAddToAlbum, TAddToAlbumVariables>(AddToAlbumDocument, options);
      }
export type AddToAlbumHookResult = ReturnType<typeof useAddToAlbum>;
export type AddToAlbumMutationResult = Apollo.MutationResult<TAddToAlbum>;
export type AddToAlbumMutationOptions = Apollo.BaseMutationOptions<TAddToAlbum, TAddToAlbumVariables>;
export const AlbumQueryDocument = gql`
    query AlbumQuery($id: ID!) {
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
export function useAlbumQuery(baseOptions: Apollo.QueryHookOptions<TAlbumQuery, TAlbumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TAlbumQuery, TAlbumQueryVariables>(AlbumQueryDocument, options);
      }
export function useAlbumQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TAlbumQuery, TAlbumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TAlbumQuery, TAlbumQueryVariables>(AlbumQueryDocument, options);
        }
export type AlbumQueryHookResult = ReturnType<typeof useAlbumQuery>;
export type AlbumQueryLazyQueryHookResult = ReturnType<typeof useAlbumQueryLazyQuery>;
export type AlbumQueryQueryResult = Apollo.QueryResult<TAlbumQuery, TAlbumQueryVariables>;
export const AlbumMediaQueryDocument = gql`
    query AlbumMediaQuery($id: ID!) {
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
export function useAlbumMediaQuery(baseOptions: Apollo.QueryHookOptions<TAlbumMediaQuery, TAlbumMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TAlbumMediaQuery, TAlbumMediaQueryVariables>(AlbumMediaQueryDocument, options);
      }
export function useAlbumMediaQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TAlbumMediaQuery, TAlbumMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TAlbumMediaQuery, TAlbumMediaQueryVariables>(AlbumMediaQueryDocument, options);
        }
export type AlbumMediaQueryHookResult = ReturnType<typeof useAlbumMediaQuery>;
export type AlbumMediaQueryLazyQueryHookResult = ReturnType<typeof useAlbumMediaQueryLazyQuery>;
export type AlbumMediaQueryQueryResult = Apollo.QueryResult<TAlbumMediaQuery, TAlbumMediaQueryVariables>;
export const AlbumsQueryDocument = gql`
    query AlbumsQuery {
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
export function useAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<TAlbumsQuery, TAlbumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TAlbumsQuery, TAlbumsQueryVariables>(AlbumsQueryDocument, options);
      }
export function useAlbumsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TAlbumsQuery, TAlbumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TAlbumsQuery, TAlbumsQueryVariables>(AlbumsQueryDocument, options);
        }
export type AlbumsQueryHookResult = ReturnType<typeof useAlbumsQuery>;
export type AlbumsQueryLazyQueryHookResult = ReturnType<typeof useAlbumsQueryLazyQuery>;
export type AlbumsQueryQueryResult = Apollo.QueryResult<TAlbumsQuery, TAlbumsQueryVariables>;
export const CreateAlbumDocument = gql`
    mutation createAlbum($media: [ID]) {
  createAlbum(media: $media) {
    id
  }
}
    `;
export type TCreateAlbumMutationFn = Apollo.MutationFunction<TCreateAlbum, TCreateAlbumVariables>;
export function useCreateAlbum(baseOptions?: Apollo.MutationHookOptions<TCreateAlbum, TCreateAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TCreateAlbum, TCreateAlbumVariables>(CreateAlbumDocument, options);
      }
export type CreateAlbumHookResult = ReturnType<typeof useCreateAlbum>;
export type CreateAlbumMutationResult = Apollo.MutationResult<TCreateAlbum>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<TCreateAlbum, TCreateAlbumVariables>;
export const DeleteAlbumDocument = gql`
    mutation deleteAlbum($ids: [ID]!) {
  deleteAlbum(ids: $ids) {
    id
  }
}
    `;
export type TDeleteAlbumMutationFn = Apollo.MutationFunction<TDeleteAlbum, TDeleteAlbumVariables>;
export function useDeleteAlbum(baseOptions?: Apollo.MutationHookOptions<TDeleteAlbum, TDeleteAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TDeleteAlbum, TDeleteAlbumVariables>(DeleteAlbumDocument, options);
      }
export type DeleteAlbumHookResult = ReturnType<typeof useDeleteAlbum>;
export type DeleteAlbumMutationResult = Apollo.MutationResult<TDeleteAlbum>;
export type DeleteAlbumMutationOptions = Apollo.BaseMutationOptions<TDeleteAlbum, TDeleteAlbumVariables>;
export const RemoveFromAlbumDocument = gql`
    mutation removeFromAlbum($idAlbum: ID!, $media: [ID!]!) {
  removeFromAlbum(idAlbum: $idAlbum, media: $media) {
    id
  }
}
    `;
export type TRemoveFromAlbumMutationFn = Apollo.MutationFunction<TRemoveFromAlbum, TRemoveFromAlbumVariables>;
export function useRemoveFromAlbum(baseOptions?: Apollo.MutationHookOptions<TRemoveFromAlbum, TRemoveFromAlbumVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TRemoveFromAlbum, TRemoveFromAlbumVariables>(RemoveFromAlbumDocument, options);
      }
export type RemoveFromAlbumHookResult = ReturnType<typeof useRemoveFromAlbum>;
export type RemoveFromAlbumMutationResult = Apollo.MutationResult<TRemoveFromAlbum>;
export type RemoveFromAlbumMutationOptions = Apollo.BaseMutationOptions<TRemoveFromAlbum, TRemoveFromAlbumVariables>;
export const SetAlbumCoverDocument = gql`
    mutation setAlbumCover($idAlbum: ID!, $idMedium: ID!) {
  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {
    id
  }
}
    `;
export type TSetAlbumCoverMutationFn = Apollo.MutationFunction<TSetAlbumCover, TSetAlbumCoverVariables>;
export function useSetAlbumCover(baseOptions?: Apollo.MutationHookOptions<TSetAlbumCover, TSetAlbumCoverVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TSetAlbumCover, TSetAlbumCoverVariables>(SetAlbumCoverDocument, options);
      }
export type SetAlbumCoverHookResult = ReturnType<typeof useSetAlbumCover>;
export type SetAlbumCoverMutationResult = Apollo.MutationResult<TSetAlbumCover>;
export type SetAlbumCoverMutationOptions = Apollo.BaseMutationOptions<TSetAlbumCover, TSetAlbumCoverVariables>;
export const UpdateAlbumTitleDocument = gql`
    mutation updateAlbumTitle($id: ID!, $title: String!) {
  updateAlbumTitle(id: $id, title: $title) {
    id
  }
}
    `;
export type TUpdateAlbumTitleMutationFn = Apollo.MutationFunction<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>;
export function useUpdateAlbumTitle(baseOptions?: Apollo.MutationHookOptions<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>(UpdateAlbumTitleDocument, options);
      }
export type UpdateAlbumTitleHookResult = ReturnType<typeof useUpdateAlbumTitle>;
export type UpdateAlbumTitleMutationResult = Apollo.MutationResult<TUpdateAlbumTitle>;
export type UpdateAlbumTitleMutationOptions = Apollo.BaseMutationOptions<TUpdateAlbumTitle, TUpdateAlbumTitleVariables>;
export const DeleteMediaDocument = gql`
    mutation deleteMedia($ids: [ID]!) {
  deleteMedia(ids: $ids)
}
    `;
export type TDeleteMediaMutationFn = Apollo.MutationFunction<TDeleteMedia, TDeleteMediaVariables>;
export function useDeleteMedia(baseOptions?: Apollo.MutationHookOptions<TDeleteMedia, TDeleteMediaVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TDeleteMedia, TDeleteMediaVariables>(DeleteMediaDocument, options);
      }
export type DeleteMediaHookResult = ReturnType<typeof useDeleteMedia>;
export type DeleteMediaMutationResult = Apollo.MutationResult<TDeleteMedia>;
export type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<TDeleteMedia, TDeleteMediaVariables>;
export const EmptyTrashDocument = gql`
    mutation emptyTrash {
  emptyTrash
}
    `;
export type TEmptyTrashMutationFn = Apollo.MutationFunction<TEmptyTrash, TEmptyTrashVariables>;
export function useEmptyTrash(baseOptions?: Apollo.MutationHookOptions<TEmptyTrash, TEmptyTrashVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TEmptyTrash, TEmptyTrashVariables>(EmptyTrashDocument, options);
      }
export type EmptyTrashHookResult = ReturnType<typeof useEmptyTrash>;
export type EmptyTrashMutationResult = Apollo.MutationResult<TEmptyTrash>;
export type EmptyTrashMutationOptions = Apollo.BaseMutationOptions<TEmptyTrash, TEmptyTrashVariables>;
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
export function useMediaQuery(baseOptions?: Apollo.QueryHookOptions<TMediaQuery, TMediaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TMediaQuery, TMediaQueryVariables>(MediaQueryDocument, options);
      }
export function useMediaQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TMediaQuery, TMediaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TMediaQuery, TMediaQueryVariables>(MediaQueryDocument, options);
        }
export type MediaQueryHookResult = ReturnType<typeof useMediaQuery>;
export type MediaQueryLazyQueryHookResult = ReturnType<typeof useMediaQueryLazyQuery>;
export type MediaQueryQueryResult = Apollo.QueryResult<TMediaQuery, TMediaQueryVariables>;
export const MediumQueryDocument = gql`
    query MediumQuery($id: ID!) {
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
export function useMediumQuery(baseOptions: Apollo.QueryHookOptions<TMediumQuery, TMediumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TMediumQuery, TMediumQueryVariables>(MediumQueryDocument, options);
      }
export function useMediumQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TMediumQuery, TMediumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TMediumQuery, TMediumQueryVariables>(MediumQueryDocument, options);
        }
export type MediumQueryHookResult = ReturnType<typeof useMediumQuery>;
export type MediumQueryLazyQueryHookResult = ReturnType<typeof useMediumQueryLazyQuery>;
export type MediumQueryQueryResult = Apollo.QueryResult<TMediumQuery, TMediumQueryVariables>;
export const RotateDocument = gql`
    mutation rotate($id: ID!) {
  rotate(id: $id) {
    id
  }
}
    `;
export type TRotateMutationFn = Apollo.MutationFunction<TRotate, TRotateVariables>;
export function useRotate(baseOptions?: Apollo.MutationHookOptions<TRotate, TRotateVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TRotate, TRotateVariables>(RotateDocument, options);
      }
export type RotateHookResult = ReturnType<typeof useRotate>;
export type RotateMutationResult = Apollo.MutationResult<TRotate>;
export type RotateMutationOptions = Apollo.BaseMutationOptions<TRotate, TRotateVariables>;
export const SetMediaStatusDocument = gql`
    mutation setMediaStatus($media: [ID]!, $status: String) {
  setMediaStatus(media: $media, status: $status) {
    id
  }
}
    `;
export type TSetMediaStatusMutationFn = Apollo.MutationFunction<TSetMediaStatus, TSetMediaStatusVariables>;
export function useSetMediaStatus(baseOptions?: Apollo.MutationHookOptions<TSetMediaStatus, TSetMediaStatusVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TSetMediaStatus, TSetMediaStatusVariables>(SetMediaStatusDocument, options);
      }
export type SetMediaStatusHookResult = ReturnType<typeof useSetMediaStatus>;
export type SetMediaStatusMutationResult = Apollo.MutationResult<TSetMediaStatus>;
export type SetMediaStatusMutationOptions = Apollo.BaseMutationOptions<TSetMediaStatus, TSetMediaStatusVariables>;
export const UploadDocument = gql`
    mutation upload($file: [Upload]!) {
  upload(file: $file) {
    url
  }
}
    `;
export type TUploadMutationFn = Apollo.MutationFunction<TUpload, TUploadVariables>;
export function useUpload(baseOptions?: Apollo.MutationHookOptions<TUpload, TUploadVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TUpload, TUploadVariables>(UploadDocument, options);
      }
export type UploadHookResult = ReturnType<typeof useUpload>;
export type UploadMutationResult = Apollo.MutationResult<TUpload>;
export type UploadMutationOptions = Apollo.BaseMutationOptions<TUpload, TUploadVariables>;
export const LoginDocument = gql`
    mutation login($mail: String!, $password: String!) {
  login(mail: $mail, password: $password) {
    accessToken
  }
}
    `;
export type TLoginMutationFn = Apollo.MutationFunction<TLogin, TLoginVariables>;
export function useLogin(baseOptions?: Apollo.MutationHookOptions<TLogin, TLoginVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TLogin, TLoginVariables>(LoginDocument, options);
      }
export type LoginHookResult = ReturnType<typeof useLogin>;
export type LoginMutationResult = Apollo.MutationResult<TLogin>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<TLogin, TLoginVariables>;
export const SignupDocument = gql`
    mutation signup($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {
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
export type TSignupMutationFn = Apollo.MutationFunction<TSignup, TSignupVariables>;
export function useSignup(baseOptions?: Apollo.MutationHookOptions<TSignup, TSignupVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TSignup, TSignupVariables>(SignupDocument, options);
      }
export type SignupHookResult = ReturnType<typeof useSignup>;
export type SignupMutationResult = Apollo.MutationResult<TSignup>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<TSignup, TSignupVariables>;