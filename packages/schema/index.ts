import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileUpload } from 'graphql-upload-minimal'
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: Promise<FileUpload>; output: Promise<FileUpload>; }
};

export type TAlbum = {
  __typename?: 'Album';
  cover?: Maybe<TMedium>;
  dateCreated: Scalars['DateTime']['output'];
  dateModified: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  media?: Maybe<Array<TMedium>>;
  owner?: Maybe<TUser>;
  title?: Maybe<Scalars['String']['output']>;
};

export type TImageMeta = {
  __typename?: 'ImageMeta';
  cameraMake: Scalars['String']['output'];
  cameraModel: Scalars['String']['output'];
  fNumber?: Maybe<Scalars['Float']['output']>;
  flash?: Maybe<Scalars['Float']['output']>;
  focalLength?: Maybe<Scalars['String']['output']>;
  height: Scalars['Float']['output'];
  iso?: Maybe<Scalars['Float']['output']>;
  width: Scalars['Float']['output'];
};

export type TMedium = {
  __typename?: 'Medium';
  address: Scalars['String']['output'];
  country: Scalars['String']['output'];
  dateCreated: Scalars['DateTime']['output'];
  dateModified: Scalars['DateTime']['output'];
  dateModifiedStatus: Scalars['DateTime']['output'];
  dateTaken: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  favoredBy?: Maybe<Array<TUser>>;
  filenameDisk: Scalars['String']['output'];
  filenameDownload: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Array<Scalars['Float']['output']>;
  meta: TMeta;
  mimetype: Scalars['String']['output'];
  owner: TUser;
  place: Scalars['String']['output'];
  region: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tags: Array<TTag>;
  title: Scalars['String']['output'];
  uploader: TUser;
};

export type TMediumCountDto = {
  __typename?: 'MediumCountDto';
  count: Scalars['Int']['output'];
  years: Array<TMediumCountYear>;
};

export type TMediumCountMonth = {
  __typename?: 'MediumCountMonth';
  count: Scalars['Int']['output'];
  month: Scalars['Int']['output'];
};

export type TMediumCountYear = {
  __typename?: 'MediumCountYear';
  count: Scalars['Int']['output'];
  months: Array<TMediumCountMonth>;
  year: Scalars['Int']['output'];
};

export type TMediumDownloadDto = {
  __typename?: 'MediumDownloadDto';
  url: Scalars['String']['output'];
};

export type TMeta = TImageMeta | TVideoMeta;

export type TMutation = {
  __typename?: 'Mutation';
  addMediaToAlbum: TAlbum;
  changeLanguage: TUser;
  createAlbum: TAlbum;
  deleteAlbums: Array<TAlbum>;
  deleteFavorites: TUser;
  deleteMedia: Array<TMedium>;
  emptyTrash: Array<TMedium>;
  insertFavorites: TUser;
  refreshAccessToken: TUserTokenDto;
  removeMediaFromAlbum: TAlbum;
  rotateMedium: TMedium;
  signIn: TUserTokenDto;
  signOut: Scalars['Boolean']['output'];
  signUp: TUserTokenDto;
  updateAlbum: TAlbum;
  updateMedia: Array<TMedium>;
  updateMedium: TMedium;
  upload: Array<TMedium>;
};


export type TMutationAddMediaToAlbumArgs = {
  id: Scalars['String']['input'];
  media: Array<Scalars['String']['input']>;
};


export type TMutationChangeLanguageArgs = {
  language: Scalars['String']['input'];
};


export type TMutationCreateAlbumArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type TMutationDeleteAlbumsArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type TMutationDeleteFavoritesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type TMutationDeleteMediaArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type TMutationInsertFavoritesArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type TMutationRefreshAccessTokenArgs = {
  accessToken: Scalars['String']['input'];
  refreshToken: Scalars['String']['input'];
};


export type TMutationRemoveMediaFromAlbumArgs = {
  id: Scalars['String']['input'];
  media: Array<Scalars['String']['input']>;
};


export type TMutationRotateMediumArgs = {
  id: Scalars['String']['input'];
};


export type TMutationSignInArgs = {
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type TMutationSignUpArgs = {
  firstName: Scalars['String']['input'];
  language: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type TMutationUpdateAlbumArgs = {
  cover?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};


export type TMutationUpdateMediaArgs = {
  ids: Array<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type TMutationUpdateMediumArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};


export type TMutationUploadArgs = {
  filePromises: Scalars['Upload']['input'];
};

export type TQuery = {
  __typename?: 'Query';
  album: TAlbum;
  albumMedia: Array<TMedium>;
  albums: Array<TAlbum>;
  archive: Array<TMedium>;
  countMediaByYear: TMediumCountDto;
  download: TMediumDownloadDto;
  favorites: Array<TMedium>;
  media: Array<TMedium>;
  medium: TMedium;
  mediumAlbums: Array<TAlbum>;
  profile: TUser;
  trash: Array<TMedium>;
};


export type TQueryAlbumArgs = {
  id: Scalars['String']['input'];
};


export type TQueryAlbumMediaArgs = {
  id: Scalars['String']['input'];
};


export type TQueryDownloadArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type TQueryMediaArgs = {
  album?: InputMaybe<Scalars['String']['input']>;
  favorites?: InputMaybe<Scalars['Boolean']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};


export type TQueryMediumArgs = {
  id: Scalars['String']['input'];
};


export type TQueryMediumAlbumsArgs = {
  id: Scalars['String']['input'];
};

export type TTag = {
  __typename?: 'Tag';
  id: Scalars['String']['output'];
  idUser: Scalars['String']['output'];
  label: Scalars['String']['output'];
  source: Scalars['String']['output'];
};

export type TUser = {
  __typename?: 'User';
  dateCreated: Scalars['DateTime']['output'];
  dateModified: Scalars['DateTime']['output'];
  favorites: TMedium;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  language: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  mail: Scalars['String']['output'];
};

export type TUserTokenDto = {
  __typename?: 'UserTokenDto';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  user: TUser;
};

export type TVideoMeta = {
  __typename?: 'VideoMeta';
  duration: Scalars['Float']['output'];
  height: Scalars['Float']['output'];
  width: Scalars['Float']['output'];
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

/** Mapping of union types */
export type TResolversUnionTypes<RefType extends Record<string, unknown>> = {
  Meta: ( TImageMeta ) | ( TVideoMeta );
};


/** Mapping between all available schema types and the resolvers types */
export type TResolversTypes = {
  Album: ResolverTypeWrapper<TAlbum>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ImageMeta: ResolverTypeWrapper<TImageMeta>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Medium: ResolverTypeWrapper<Omit<TMedium, 'meta'> & { meta: TResolversTypes['Meta'] }>;
  MediumCountDto: ResolverTypeWrapper<TMediumCountDto>;
  MediumCountMonth: ResolverTypeWrapper<TMediumCountMonth>;
  MediumCountYear: ResolverTypeWrapper<TMediumCountYear>;
  MediumDownloadDto: ResolverTypeWrapper<TMediumDownloadDto>;
  Meta: ResolverTypeWrapper<TResolversUnionTypes<TResolversTypes>['Meta']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Tag: ResolverTypeWrapper<TTag>;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
  User: ResolverTypeWrapper<TUser>;
  UserTokenDto: ResolverTypeWrapper<TUserTokenDto>;
  VideoMeta: ResolverTypeWrapper<TVideoMeta>;
};

/** Mapping between all available schema types and the resolvers parents */
export type TResolversParentTypes = {
  Album: TAlbum;
  Boolean: Scalars['Boolean']['output'];
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ImageMeta: TImageMeta;
  Int: Scalars['Int']['output'];
  Medium: Omit<TMedium, 'meta'> & { meta: TResolversParentTypes['Meta'] };
  MediumCountDto: TMediumCountDto;
  MediumCountMonth: TMediumCountMonth;
  MediumCountYear: TMediumCountYear;
  MediumDownloadDto: TMediumDownloadDto;
  Meta: TResolversUnionTypes<TResolversParentTypes>['Meta'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Tag: TTag;
  Upload: Scalars['Upload']['output'];
  User: TUser;
  UserTokenDto: TUserTokenDto;
  VideoMeta: TVideoMeta;
};

export type TAlbumResolvers<ContextType = any, ParentType extends TResolversParentTypes['Album'] = TResolversParentTypes['Album']> = {
  cover?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType>;
  dateCreated?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  dateModified?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<TResolversTypes['Medium']>>, ParentType, ContextType>;
  owner?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType>;
  title?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TDateTimeScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type TImageMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['ImageMeta'] = TResolversParentTypes['ImageMeta']> = {
  cameraMake?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  cameraModel?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  fNumber?: Resolver<Maybe<TResolversTypes['Float']>, ParentType, ContextType>;
  flash?: Resolver<Maybe<TResolversTypes['Float']>, ParentType, ContextType>;
  focalLength?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<TResolversTypes['Float'], ParentType, ContextType>;
  iso?: Resolver<Maybe<TResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<TResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMediumResolvers<ContextType = any, ParentType extends TResolversParentTypes['Medium'] = TResolversParentTypes['Medium']> = {
  address?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  country?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  dateCreated?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  dateModified?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  dateModifiedStatus?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  dateTaken?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  favoredBy?: Resolver<Maybe<Array<TResolversTypes['User']>>, ParentType, ContextType>;
  filenameDisk?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  filenameDownload?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<Array<TResolversTypes['Float']>, ParentType, ContextType>;
  meta?: Resolver<TResolversTypes['Meta'], ParentType, ContextType>;
  mimetype?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<TResolversTypes['User'], ParentType, ContextType>;
  place?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<TResolversTypes['Tag']>, ParentType, ContextType>;
  title?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  uploader?: Resolver<TResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMediumCountDtoResolvers<ContextType = any, ParentType extends TResolversParentTypes['MediumCountDto'] = TResolversParentTypes['MediumCountDto']> = {
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  years?: Resolver<Array<TResolversTypes['MediumCountYear']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMediumCountMonthResolvers<ContextType = any, ParentType extends TResolversParentTypes['MediumCountMonth'] = TResolversParentTypes['MediumCountMonth']> = {
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  month?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMediumCountYearResolvers<ContextType = any, ParentType extends TResolversParentTypes['MediumCountYear'] = TResolversParentTypes['MediumCountYear']> = {
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  months?: Resolver<Array<TResolversTypes['MediumCountMonth']>, ParentType, ContextType>;
  year?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMediumDownloadDtoResolvers<ContextType = any, ParentType extends TResolversParentTypes['MediumDownloadDto'] = TResolversParentTypes['MediumDownloadDto']> = {
  url?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['Meta'] = TResolversParentTypes['Meta']> = {
  __resolveType: TypeResolveFn<'ImageMeta' | 'VideoMeta', ParentType, ContextType>;
};

export type TMutationResolvers<ContextType = any, ParentType extends TResolversParentTypes['Mutation'] = TResolversParentTypes['Mutation']> = {
  addMediaToAlbum?: Resolver<TResolversTypes['Album'], ParentType, ContextType, RequireFields<TMutationAddMediaToAlbumArgs, 'id' | 'media'>>;
  changeLanguage?: Resolver<TResolversTypes['User'], ParentType, ContextType, RequireFields<TMutationChangeLanguageArgs, 'language'>>;
  createAlbum?: Resolver<TResolversTypes['Album'], ParentType, ContextType, Partial<TMutationCreateAlbumArgs>>;
  deleteAlbums?: Resolver<Array<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationDeleteAlbumsArgs, 'ids'>>;
  deleteFavorites?: Resolver<TResolversTypes['User'], ParentType, ContextType, RequireFields<TMutationDeleteFavoritesArgs, 'ids'>>;
  deleteMedia?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationDeleteMediaArgs, 'ids'>>;
  emptyTrash?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
  insertFavorites?: Resolver<TResolversTypes['User'], ParentType, ContextType, RequireFields<TMutationInsertFavoritesArgs, 'ids'>>;
  refreshAccessToken?: Resolver<TResolversTypes['UserTokenDto'], ParentType, ContextType, RequireFields<TMutationRefreshAccessTokenArgs, 'accessToken' | 'refreshToken'>>;
  removeMediaFromAlbum?: Resolver<TResolversTypes['Album'], ParentType, ContextType, RequireFields<TMutationRemoveMediaFromAlbumArgs, 'id' | 'media'>>;
  rotateMedium?: Resolver<TResolversTypes['Medium'], ParentType, ContextType, RequireFields<TMutationRotateMediumArgs, 'id'>>;
  signIn?: Resolver<TResolversTypes['UserTokenDto'], ParentType, ContextType, RequireFields<TMutationSignInArgs, 'mail' | 'password'>>;
  signOut?: Resolver<TResolversTypes['Boolean'], ParentType, ContextType>;
  signUp?: Resolver<TResolversTypes['UserTokenDto'], ParentType, ContextType, RequireFields<TMutationSignUpArgs, 'firstName' | 'language' | 'lastName' | 'mail' | 'password'>>;
  updateAlbum?: Resolver<TResolversTypes['Album'], ParentType, ContextType, RequireFields<TMutationUpdateAlbumArgs, 'id'>>;
  updateMedia?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationUpdateMediaArgs, 'ids'>>;
  updateMedium?: Resolver<TResolversTypes['Medium'], ParentType, ContextType, RequireFields<TMutationUpdateMediumArgs, 'id'>>;
  upload?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationUploadArgs, 'filePromises'>>;
};

export type TQueryResolvers<ContextType = any, ParentType extends TResolversParentTypes['Query'] = TResolversParentTypes['Query']> = {
  album?: Resolver<TResolversTypes['Album'], ParentType, ContextType, RequireFields<TQueryAlbumArgs, 'id'>>;
  albumMedia?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TQueryAlbumMediaArgs, 'id'>>;
  albums?: Resolver<Array<TResolversTypes['Album']>, ParentType, ContextType>;
  archive?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
  countMediaByYear?: Resolver<TResolversTypes['MediumCountDto'], ParentType, ContextType>;
  download?: Resolver<TResolversTypes['MediumDownloadDto'], ParentType, ContextType, RequireFields<TQueryDownloadArgs, 'ids'>>;
  favorites?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
  media?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, Partial<TQueryMediaArgs>>;
  medium?: Resolver<TResolversTypes['Medium'], ParentType, ContextType, RequireFields<TQueryMediumArgs, 'id'>>;
  mediumAlbums?: Resolver<Array<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TQueryMediumAlbumsArgs, 'id'>>;
  profile?: Resolver<TResolversTypes['User'], ParentType, ContextType>;
  trash?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
};

export type TTagResolvers<ContextType = any, ParentType extends TResolversParentTypes['Tag'] = TResolversParentTypes['Tag']> = {
  id?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  idUser?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TUploadScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type TUserResolvers<ContextType = any, ParentType extends TResolversParentTypes['User'] = TResolversParentTypes['User']> = {
  dateCreated?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  dateModified?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  favorites?: Resolver<TResolversTypes['Medium'], ParentType, ContextType>;
  firstName?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  language?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  mail?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TUserTokenDtoResolvers<ContextType = any, ParentType extends TResolversParentTypes['UserTokenDto'] = TResolversParentTypes['UserTokenDto']> = {
  accessToken?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<TResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TVideoMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['VideoMeta'] = TResolversParentTypes['VideoMeta']> = {
  duration?: Resolver<TResolversTypes['Float'], ParentType, ContextType>;
  height?: Resolver<TResolversTypes['Float'], ParentType, ContextType>;
  width?: Resolver<TResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TResolvers<ContextType = any> = {
  Album?: TAlbumResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  ImageMeta?: TImageMetaResolvers<ContextType>;
  Medium?: TMediumResolvers<ContextType>;
  MediumCountDto?: TMediumCountDtoResolvers<ContextType>;
  MediumCountMonth?: TMediumCountMonthResolvers<ContextType>;
  MediumCountYear?: TMediumCountYearResolvers<ContextType>;
  MediumDownloadDto?: TMediumDownloadDtoResolvers<ContextType>;
  Meta?: TMetaResolvers<ContextType>;
  Mutation?: TMutationResolvers<ContextType>;
  Query?: TQueryResolvers<ContextType>;
  Tag?: TTagResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: TUserResolvers<ContextType>;
  UserTokenDto?: TUserTokenDtoResolvers<ContextType>;
  VideoMeta?: TVideoMetaResolvers<ContextType>;
};


export type TFMedia = (
  { __typename?: 'Medium' }
  & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & Pick<TTag, 'id'>
  )>, favoredBy?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
  )>>, owner: (
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'firstName' | 'lastName'>
  ), uploader: (
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'firstName' | 'lastName'>
  ), meta: (
    { __typename?: 'ImageMeta' }
    & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
  ) | (
    { __typename?: 'VideoMeta' }
    & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
  ) }
);

export type TFMediaStatus = (
  { __typename: 'Medium' }
  & Pick<TMedium, 'id' | 'status'>
);

export type TFUser = (
  { __typename?: 'User' }
  & Pick<TUser, 'id' | 'dateCreated' | 'dateModified' | 'mail' | 'firstName' | 'lastName' | 'language'>
  & { favorites: (
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  ) }
);

export type TMAddToAlbumVariables = Exact<{
  id: Scalars['String']['input'];
  media: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TMAddToAlbum = (
  { __typename?: 'Mutation' }
  & { addMediaToAlbum: (
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  ) }
);

export type TQAlbumVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TQAlbum = (
  { __typename?: 'Query' }
  & { album: (
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description' | 'dateCreated' | 'dateModified'>
    & { cover?: Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    )>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, media?: Maybe<Array<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<TTag, 'id'>
      )>, favoredBy?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<TUser, 'id'>
      )>>, owner: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), uploader: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), meta: (
        { __typename?: 'ImageMeta' }
        & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
      ) | (
        { __typename?: 'VideoMeta' }
        & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
      ) }
    )>> }
  ) }
);

export type TQAlbumMediaVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TQAlbumMedia = (
  { __typename?: 'Query' }
  & { albumMedia: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  )> }
);

export type TQAlbumsVariables = Exact<{ [key: string]: never; }>;


export type TQAlbums = (
  { __typename?: 'Query' }
  & { albums: Array<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description' | 'dateCreated' | 'dateModified'>
    & { cover?: Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    )>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, media?: Maybe<Array<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<TTag, 'id'>
      )>, favoredBy?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<TUser, 'id'>
      )>>, owner: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), uploader: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), meta: (
        { __typename?: 'ImageMeta' }
        & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
      ) | (
        { __typename?: 'VideoMeta' }
        & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
      ) }
    )>> }
  )> }
);

export type TQAlbumsOfMediumVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TQAlbumsOfMedium = (
  { __typename?: 'Query' }
  & { mediumAlbums: Array<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description' | 'dateCreated' | 'dateModified'>
    & { cover?: Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<TTag, 'id'>
      )>, favoredBy?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<TUser, 'id'>
      )>>, owner: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), uploader: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), meta: (
        { __typename?: 'ImageMeta' }
        & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
      ) | (
        { __typename?: 'VideoMeta' }
        & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
      ) }
    )>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, media?: Maybe<Array<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<TTag, 'id'>
      )>, favoredBy?: Maybe<Array<(
        { __typename?: 'User' }
        & Pick<TUser, 'id'>
      )>>, owner: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), uploader: (
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      ), meta: (
        { __typename?: 'ImageMeta' }
        & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
      ) | (
        { __typename?: 'VideoMeta' }
        & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
      ) }
    )>> }
  )> }
);

export type TMCreateAlbumVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type TMCreateAlbum = (
  { __typename?: 'Mutation' }
  & { createAlbum: (
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  ) }
);

export type TMDeleteAlbumsVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TMDeleteAlbums = (
  { __typename?: 'Mutation' }
  & { deleteAlbums: Array<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  )> }
);

export type TMRemoveFromAlbumVariables = Exact<{
  idAlbum: Scalars['String']['input'];
  media: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TMRemoveFromAlbum = (
  { __typename?: 'Mutation' }
  & { removeMediaFromAlbum: (
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
    & { media?: Maybe<Array<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    )>> }
  ) }
);

export type TMUpdateAlbumVariables = Exact<{
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['String']['input']>;
}>;


export type TMUpdateAlbum = (
  { __typename?: 'Mutation' }
  & { updateAlbum: (
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
  ) }
);

export type TMDeleteFavoritesVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TMDeleteFavorites = (
  { __typename?: 'Mutation' }
  & { deleteFavorites: (
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
  ) }
);

export type TQFavoritesVariables = Exact<{ [key: string]: never; }>;


export type TQFavorites = (
  { __typename?: 'Query' }
  & { favorites: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  )> }
);

export type TMInsertFavoritesVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TMInsertFavorites = (
  { __typename?: 'Mutation' }
  & { insertFavorites: (
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
  ) }
);

export type TQArchiveVariables = Exact<{ [key: string]: never; }>;


export type TQArchive = (
  { __typename?: 'Query' }
  & { archive: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  )> }
);

export type TMDeleteMediaVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TMDeleteMedia = (
  { __typename?: 'Mutation' }
  & { deleteMedia: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TQDownloadVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type TQDownload = (
  { __typename?: 'Query' }
  & { download: (
    { __typename?: 'MediumDownloadDto' }
    & Pick<TMediumDownloadDto, 'url'>
  ) }
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
  album?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  favorites?: InputMaybe<Scalars['Boolean']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type TQMedia = (
  { __typename?: 'Query' }
  & { media: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  )> }
);

export type TQMediaYearCountVariables = Exact<{ [key: string]: never; }>;


export type TQMediaYearCount = (
  { __typename?: 'Query' }
  & { countMediaByYear: (
    { __typename?: 'MediumCountDto' }
    & Pick<TMediumCountDto, 'count'>
    & { years: Array<(
      { __typename?: 'MediumCountYear' }
      & Pick<TMediumCountYear, 'year' | 'count'>
      & { months: Array<(
        { __typename?: 'MediumCountMonth' }
        & Pick<TMediumCountMonth, 'month' | 'count'>
      )> }
    )> }
  ) }
);

export type TQMediumVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TQMedium = (
  { __typename?: 'Query' }
  & { medium: (
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'firstName' | 'lastName' | 'id'>
    ), tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  ) }
);

export type TMRotateVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type TMRotate = (
  { __typename?: 'Mutation' }
  & { rotateMedium: (
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  ) }
);

export type TQTrashVariables = Exact<{ [key: string]: never; }>;


export type TQTrash = (
  { __typename?: 'Query' }
  & { trash: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  )> }
);

export type TMUpdateMediaVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type TMUpdateMedia = (
  { __typename?: 'Mutation' }
  & { updateMedia: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  )> }
);

export type TMUpdateMediumVariables = Exact<{
  id: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type TMUpdateMedium = (
  { __typename?: 'Mutation' }
  & { updateMedium: (
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateModifiedStatus' | 'hash' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<TTag, 'id'>
    )>, favoredBy?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>, owner: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), uploader: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    ), meta: (
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    ) }
  ) }
);

export type TMUploadVariables = Exact<{
  files: Scalars['Upload']['input'];
}>;


export type TMUpload = (
  { __typename?: 'Mutation' }
  & { upload: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'id'>
  )> }
);

export type TMChangeLanguageVariables = Exact<{
  language: Scalars['String']['input'];
}>;


export type TMChangeLanguage = (
  { __typename?: 'Mutation' }
  & { changeLanguage: (
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'dateCreated' | 'dateModified' | 'mail' | 'firstName' | 'lastName' | 'language'>
    & { favorites: (
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    ) }
  ) }
);

export type TQProfileVariables = Exact<{ [key: string]: never; }>;


export type TQProfile = (
  { __typename?: 'Query' }
  & { profile: (
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'dateCreated' | 'dateModified' | 'mail' | 'firstName' | 'lastName' | 'language'>
    & { favorites: (
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    ) }
  ) }
);

export type TMSignInVariables = Exact<{
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type TMSignIn = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'UserTokenDto' }
    & Pick<TUserTokenDto, 'accessToken' | 'refreshToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'dateCreated' | 'dateModified' | 'mail' | 'firstName' | 'lastName' | 'language'>
      & { favorites: (
        { __typename?: 'Medium' }
        & Pick<TMedium, 'id'>
      ) }
    ) }
  ) }
);

export type TMSignOutVariables = Exact<{ [key: string]: never; }>;


export type TMSignOut = (
  { __typename?: 'Mutation' }
  & Pick<TMutation, 'signOut'>
);

export type TMSignUpVariables = Exact<{
  mail: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
}>;


export type TMSignUp = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'UserTokenDto' }
    & Pick<TUserTokenDto, 'accessToken' | 'refreshToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'dateCreated' | 'dateModified' | 'mail' | 'firstName' | 'lastName' | 'language'>
      & { favorites: (
        { __typename?: 'Medium' }
        & Pick<TMedium, 'id'>
      ) }
    ) }
  ) }
);

export const FMedia = gql`
    fragment FMedia on Medium {
  dateCreated
  dateModified
  dateModifiedStatus
  hash
  tags {
    id
  }
  dateTaken
  id
  filenameDisk
  filenameDownload
  title
  description
  location
  country
  region
  place
  address
  status
  mimetype
  favoredBy {
    id
  }
  owner {
    id
    firstName
    lastName
  }
  uploader {
    id
    firstName
    lastName
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
    `;
export const FMediaStatus = gql`
    fragment FMediaStatus on Medium {
  id
  __typename
  status
}
    `;
export const FUser = gql`
    fragment FUser on User {
  id
  dateCreated
  dateModified
  mail
  favorites {
    id
  }
  firstName
  lastName
  language
}
    `;
export const MAddToAlbumDocument = gql`
    mutation MAddToAlbum($id: String!, $media: [String!]!) {
  addMediaToAlbum(id: $id, media: $media) {
    id
  }
}
    `;

export function useMAddToAlbum() {
  return Urql.useMutation<TMAddToAlbum, TMAddToAlbumVariables>(MAddToAlbumDocument);
};
export const QAlbumDocument = gql`
    query QAlbum($id: String!) {
  album(id: $id) {
    id
    title
    description
    dateCreated
    dateModified
    cover {
      id
    }
    owner {
      id
      firstName
      lastName
    }
    media {
      ...FMedia
    }
  }
}
    ${FMedia}`;

export function useQAlbum(options: Omit<Urql.UseQueryArgs<TQAlbumVariables>, 'query'>) {
  return Urql.useQuery<TQAlbum, TQAlbumVariables>({ query: QAlbumDocument, ...options });
};
export const QAlbumMediaDocument = gql`
    query QAlbumMedia($id: String!) {
  albumMedia(id: $id) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useQAlbumMedia(options: Omit<Urql.UseQueryArgs<TQAlbumMediaVariables>, 'query'>) {
  return Urql.useQuery<TQAlbumMedia, TQAlbumMediaVariables>({ query: QAlbumMediaDocument, ...options });
};
export const QAlbumsDocument = gql`
    query QAlbums {
  albums {
    id
    title
    description
    dateCreated
    dateModified
    cover {
      id
    }
    owner {
      id
      firstName
      lastName
    }
    media {
      ...FMedia
    }
  }
}
    ${FMedia}`;

export function useQAlbums(options?: Omit<Urql.UseQueryArgs<TQAlbumsVariables>, 'query'>) {
  return Urql.useQuery<TQAlbums, TQAlbumsVariables>({ query: QAlbumsDocument, ...options });
};
export const QAlbumsOfMediumDocument = gql`
    query QAlbumsOfMedium($id: String!) {
  mediumAlbums(id: $id) {
    id
    title
    description
    dateCreated
    dateModified
    cover {
      ...FMedia
    }
    owner {
      id
      firstName
      lastName
    }
    media {
      ...FMedia
    }
  }
}
    ${FMedia}`;

export function useQAlbumsOfMedium(options: Omit<Urql.UseQueryArgs<TQAlbumsOfMediumVariables>, 'query'>) {
  return Urql.useQuery<TQAlbumsOfMedium, TQAlbumsOfMediumVariables>({ query: QAlbumsOfMediumDocument, ...options });
};
export const MCreateAlbumDocument = gql`
    mutation MCreateAlbum($title: String, $description: String, $media: [String!]) {
  createAlbum(title: $title, description: $description, media: $media) {
    id
  }
}
    `;

export function useMCreateAlbum() {
  return Urql.useMutation<TMCreateAlbum, TMCreateAlbumVariables>(MCreateAlbumDocument);
};
export const MDeleteAlbumsDocument = gql`
    mutation MDeleteAlbums($ids: [String!]!) {
  deleteAlbums(ids: $ids) {
    id
  }
}
    `;

export function useMDeleteAlbums() {
  return Urql.useMutation<TMDeleteAlbums, TMDeleteAlbumsVariables>(MDeleteAlbumsDocument);
};
export const MRemoveFromAlbumDocument = gql`
    mutation MRemoveFromAlbum($idAlbum: String!, $media: [String!]!) {
  removeMediaFromAlbum(id: $idAlbum, media: $media) {
    id
    media {
      id
    }
  }
}
    `;

export function useMRemoveFromAlbum() {
  return Urql.useMutation<TMRemoveFromAlbum, TMRemoveFromAlbumVariables>(MRemoveFromAlbumDocument);
};
export const MUpdateAlbumDocument = gql`
    mutation MUpdateAlbum($id: String!, $title: String, $description: String, $cover: String) {
  updateAlbum(id: $id, title: $title, description: $description, cover: $cover) {
    id
  }
}
    `;

export function useMUpdateAlbum() {
  return Urql.useMutation<TMUpdateAlbum, TMUpdateAlbumVariables>(MUpdateAlbumDocument);
};
export const MDeleteFavoritesDocument = gql`
    mutation MDeleteFavorites($ids: [String!]!) {
  deleteFavorites(ids: $ids) {
    id
  }
}
    `;

export function useMDeleteFavorites() {
  return Urql.useMutation<TMDeleteFavorites, TMDeleteFavoritesVariables>(MDeleteFavoritesDocument);
};
export const QFavoritesDocument = gql`
    query QFavorites {
  favorites {
    ...FMedia
  }
}
    ${FMedia}`;

export function useQFavorites(options?: Omit<Urql.UseQueryArgs<TQFavoritesVariables>, 'query'>) {
  return Urql.useQuery<TQFavorites, TQFavoritesVariables>({ query: QFavoritesDocument, ...options });
};
export const MInsertFavoritesDocument = gql`
    mutation MInsertFavorites($ids: [String!]!) {
  insertFavorites(ids: $ids) {
    id
  }
}
    `;

export function useMInsertFavorites() {
  return Urql.useMutation<TMInsertFavorites, TMInsertFavoritesVariables>(MInsertFavoritesDocument);
};
export const QArchiveDocument = gql`
    query QArchive {
  archive {
    ...FMedia
  }
}
    ${FMedia}`;

export function useQArchive(options?: Omit<Urql.UseQueryArgs<TQArchiveVariables>, 'query'>) {
  return Urql.useQuery<TQArchive, TQArchiveVariables>({ query: QArchiveDocument, ...options });
};
export const MDeleteMediaDocument = gql`
    mutation MDeleteMedia($ids: [String!]!) {
  deleteMedia(ids: $ids) {
    id
  }
}
    `;

export function useMDeleteMedia() {
  return Urql.useMutation<TMDeleteMedia, TMDeleteMediaVariables>(MDeleteMediaDocument);
};
export const QDownloadDocument = gql`
    query QDownload($ids: [String!]!) {
  download(ids: $ids) {
    url
  }
}
    `;

export function useQDownload(options: Omit<Urql.UseQueryArgs<TQDownloadVariables>, 'query'>) {
  return Urql.useQuery<TQDownload, TQDownloadVariables>({ query: QDownloadDocument, ...options });
};
export const MEmptyTrashDocument = gql`
    mutation MEmptyTrash {
  emptyTrash {
    id
  }
}
    `;

export function useMEmptyTrash() {
  return Urql.useMutation<TMEmptyTrash, TMEmptyTrashVariables>(MEmptyTrashDocument);
};
export const QMediaDocument = gql`
    query QMedia($album: String, $status: String, $q: String, $favorites: Boolean, $sort: String) {
  media(album: $album, status: $status, q: $q, favorites: $favorites, sort: $sort) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useQMedia(options?: Omit<Urql.UseQueryArgs<TQMediaVariables>, 'query'>) {
  return Urql.useQuery<TQMedia, TQMediaVariables>({ query: QMediaDocument, ...options });
};
export const QMediaYearCountDocument = gql`
    query QMediaYearCount {
  countMediaByYear {
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

export function useQMediaYearCount(options?: Omit<Urql.UseQueryArgs<TQMediaYearCountVariables>, 'query'>) {
  return Urql.useQuery<TQMediaYearCount, TQMediaYearCountVariables>({ query: QMediaYearCountDocument, ...options });
};
export const QMediumDocument = gql`
    query QMedium($id: String!) {
  medium(id: $id) {
    ...FMedia
    owner {
      firstName
      lastName
    }
  }
}
    ${FMedia}`;

export function useQMedium(options: Omit<Urql.UseQueryArgs<TQMediumVariables>, 'query'>) {
  return Urql.useQuery<TQMedium, TQMediumVariables>({ query: QMediumDocument, ...options });
};
export const MRotateDocument = gql`
    mutation MRotate($id: String!) {
  rotateMedium(id: $id) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useMRotate() {
  return Urql.useMutation<TMRotate, TMRotateVariables>(MRotateDocument);
};
export const QTrashDocument = gql`
    query QTrash {
  trash {
    ...FMedia
  }
}
    ${FMedia}`;

export function useQTrash(options?: Omit<Urql.UseQueryArgs<TQTrashVariables>, 'query'>) {
  return Urql.useQuery<TQTrash, TQTrashVariables>({ query: QTrashDocument, ...options });
};
export const MUpdateMediaDocument = gql`
    mutation MUpdateMedia($ids: [String!]!, $status: String!) {
  updateMedia(ids: $ids, status: $status) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useMUpdateMedia() {
  return Urql.useMutation<TMUpdateMedia, TMUpdateMediaVariables>(MUpdateMediaDocument);
};
export const MUpdateMediumDocument = gql`
    mutation MUpdateMedium($id: String!, $description: String) {
  updateMedium(id: $id, description: $description) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useMUpdateMedium() {
  return Urql.useMutation<TMUpdateMedium, TMUpdateMediumVariables>(MUpdateMediumDocument);
};
export const MUploadDocument = gql`
    mutation MUpload($files: Upload!) {
  upload(filePromises: $files) {
    id
  }
}
    `;

export function useMUpload() {
  return Urql.useMutation<TMUpload, TMUploadVariables>(MUploadDocument);
};
export const MChangeLanguageDocument = gql`
    mutation MChangeLanguage($language: String!) {
  changeLanguage(language: $language) {
    ...FUser
  }
}
    ${FUser}`;

export function useMChangeLanguage() {
  return Urql.useMutation<TMChangeLanguage, TMChangeLanguageVariables>(MChangeLanguageDocument);
};
export const QProfileDocument = gql`
    query QProfile {
  profile {
    ...FUser
  }
}
    ${FUser}`;

export function useQProfile(options?: Omit<Urql.UseQueryArgs<TQProfileVariables>, 'query'>) {
  return Urql.useQuery<TQProfile, TQProfileVariables>({ query: QProfileDocument, ...options });
};
export const MSignInDocument = gql`
    mutation MSignIn($mail: String!, $password: String!) {
  signIn(mail: $mail, password: $password) {
    accessToken
    refreshToken
    user {
      ...FUser
    }
  }
}
    ${FUser}`;

export function useMSignIn() {
  return Urql.useMutation<TMSignIn, TMSignInVariables>(MSignInDocument);
};
export const MSignOutDocument = gql`
    mutation MSignOut {
  signOut
}
    `;

export function useMSignOut() {
  return Urql.useMutation<TMSignOut, TMSignOutVariables>(MSignOutDocument);
};
export const MSignUpDocument = gql`
    mutation MSignUp($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {
  signUp(
    mail: $mail
    password: $password
    firstName: $firstName
    lastName: $lastName
    language: "en-US"
  ) {
    accessToken
    refreshToken
    user {
      ...FUser
    }
  }
}
    ${FUser}`;

export function useMSignUp() {
  return Urql.useMutation<TMSignUp, TMSignUpVariables>(MSignUpDocument);
};