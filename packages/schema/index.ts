import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileUpload } from 'graphql-upload-minimal'
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: Promise<FileUpload>;
};

export type TAlbum = {
  __typename?: 'Album';
  cover?: Maybe<TMedium>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateModified?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<Array<Maybe<TMedium>>>;
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

export type TDownload = {
  __typename?: 'Download';
  url: Scalars['String'];
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
  focalLength?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  iso?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type TMedium = {
  __typename?: 'Medium';
  address?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateModified?: Maybe<Scalars['DateTime']>;
  dateModifiedStatus?: Maybe<Scalars['DateTime']>;
  dateTaken?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  favoredBy?: Maybe<Array<Maybe<TUser>>>;
  filenameDisk?: Maybe<Scalars['String']>;
  filenameDownload?: Maybe<Scalars['String']>;
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: Maybe<Array<Maybe<Scalars['Float']>>>;
  meta?: Maybe<TMeta>;
  mimetype?: Maybe<Scalars['String']>;
  owner?: Maybe<TUser>;
  place?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<TTag>>>;
  title?: Maybe<Scalars['String']>;
  uploader?: Maybe<TUser>;
};

export type TMeta = TImageMeta | TVideoMeta;

export type TMutation = {
  __typename?: 'Mutation';
  addToAlbum: Array<TMedium>;
  addToFavorites: Array<TMedium>;
  changeLanguage?: Maybe<Scalars['String']>;
  createAlbum?: Maybe<TAlbum>;
  deleteAlbum: Array<TAlbum>;
  deleteMedia: Array<TMedium>;
  emptyTrash: Array<TMedium>;
  register: TDevice;
  removeFromAlbum?: Maybe<TAlbum>;
  removeFromFavorites: Array<TMedium>;
  rotate?: Maybe<TMedium>;
  setMediaStatus: Array<TMedium>;
  signIn?: Maybe<TToken>;
  signOut?: Maybe<Scalars['Boolean']>;
  signUp?: Maybe<TToken>;
  updateAlbum?: Maybe<TAlbum>;
  updateMedium: TMedium;
  upload: Array<TMedium>;
};


export type TMutationAddToAlbumArgs = {
  idAlbum: Scalars['ID'];
  media: Array<Scalars['ID']>;
};


export type TMutationAddToFavoritesArgs = {
  media: Array<Scalars['ID']>;
};


export type TMutationChangeLanguageArgs = {
  language: Scalars['String'];
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
  media: Array<Scalars['ID']>;
  status: Scalars['String'];
};


export type TMutationSignInArgs = {
  mail: Scalars['String'];
  password: Scalars['String'];
};


export type TMutationSignUpArgs = {
  firstName: Scalars['String'];
  language: Scalars['String'];
  lastName: Scalars['String'];
  mail: Scalars['String'];
  password: Scalars['String'];
};


export type TMutationUpdateAlbumArgs = {
  fields: TAlbumInput;
  idAlbum: Scalars['ID'];
};


export type TMutationUpdateMediumArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
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
  download: TDownload;
  favorites: Array<TMedium>;
  media?: Maybe<Array<TMedium>>;
  mediaCountByYear: TYearCountResult;
  medium?: Maybe<TMedium>;
  translate: Scalars['String'];
  user: TUser;
  users: Array<TUser>;
};


export type TQueryAlbumArgs = {
  id: Scalars['ID'];
};


export type TQueryAlbumMediaArgs = {
  id: Scalars['ID'];
};


export type TQueryAlbumsArgs = {
  idMedium?: InputMaybe<Scalars['ID']>;
};


export type TQueryDownloadArgs = {
  media: Array<Scalars['ID']>;
};


export type TQueryMediaArgs = {
  album?: InputMaybe<Scalars['String']>;
  favorites?: InputMaybe<Scalars['Boolean']>;
  q?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type TQueryMediumArgs = {
  id: Scalars['ID'];
};


export type TQueryTranslateArgs = {
  query: Scalars['String'];
};


export type TQueryUserArgs = {
  id: Scalars['ID'];
};

export type TTag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  idUser: Scalars['String'];
  label: Scalars['String'];
  source: Scalars['String'];
};

export type TToken = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type TUser = {
  __typename?: 'User';
  dateCreated?: Maybe<Scalars['DateTime']>;
  dateModified?: Maybe<Scalars['DateTime']>;
  favorites?: Maybe<Array<Maybe<TMedium>>>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  mail?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
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
export type TResolversUnionTypes = {
  Meta: ( TImageMeta ) | ( TVideoMeta );
};

/** Mapping of union parent types */
export type TResolversUnionParentTypes = {
  Meta: ( TImageMeta ) | ( TVideoMeta );
};

/** Mapping between all available schema types and the resolvers types */
export type TResolversTypes = {
  Album: ResolverTypeWrapper<TAlbum>;
  AlbumInput: TAlbumInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Count: ResolverTypeWrapper<TCount>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Device: ResolverTypeWrapper<TDevice>;
  DeviceInput: TDeviceInput;
  Download: ResolverTypeWrapper<TDownload>;
  File: ResolverTypeWrapper<TFile>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImageMeta: ResolverTypeWrapper<TImageMeta>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Medium: ResolverTypeWrapper<Omit<TMedium, 'meta'> & { meta?: Maybe<TResolversTypes['Meta']> }>;
  Meta: ResolverTypeWrapper<TResolversUnionTypes['Meta']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<TTag>;
  Token: ResolverTypeWrapper<TToken>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  User: ResolverTypeWrapper<TUser>;
  VideoMeta: ResolverTypeWrapper<TVideoMeta>;
  YearCountEntry: ResolverTypeWrapper<TYearCountEntry>;
  YearCountMonth: ResolverTypeWrapper<TYearCountMonth>;
  YearCountResult: ResolverTypeWrapper<TYearCountResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type TResolversParentTypes = {
  Album: TAlbum;
  AlbumInput: TAlbumInput;
  Boolean: Scalars['Boolean'];
  Count: TCount;
  DateTime: Scalars['DateTime'];
  Device: TDevice;
  DeviceInput: TDeviceInput;
  Download: TDownload;
  File: TFile;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  ImageMeta: TImageMeta;
  Int: Scalars['Int'];
  Medium: Omit<TMedium, 'meta'> & { meta?: Maybe<TResolversParentTypes['Meta']> };
  Meta: TResolversUnionParentTypes['Meta'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Tag: TTag;
  Token: TToken;
  Upload: Scalars['Upload'];
  User: TUser;
  VideoMeta: TVideoMeta;
  YearCountEntry: TYearCountEntry;
  YearCountMonth: TYearCountMonth;
  YearCountResult: TYearCountResult;
};

export type TAuthDirectiveArgs = { };

export type TAuthDirectiveResolver<Result, Parent, ContextType = any, Args = TAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type TAlbumResolvers<ContextType = any, ParentType extends TResolversParentTypes['Album'] = TResolversParentTypes['Album']> = {
  cover?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  media?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType>;
  owner?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType>;
  title?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TCountResolvers<ContextType = any, ParentType extends TResolversParentTypes['Count'] = TResolversParentTypes['Count']> = {
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TDateTimeScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type TDeviceResolvers<ContextType = any, ParentType extends TResolversParentTypes['Device'] = TResolversParentTypes['Device']> = {
  dateCreated?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  dateModified?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TDownloadResolvers<ContextType = any, ParentType extends TResolversParentTypes['Download'] = TResolversParentTypes['Download']> = {
  url?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
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
  focalLength?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  iso?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMediumResolvers<ContextType = any, ParentType extends TResolversParentTypes['Medium'] = TResolversParentTypes['Medium']> = {
  address?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  dateCreated?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateModifiedStatus?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateTaken?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  favoredBy?: Resolver<Maybe<Array<Maybe<TResolversTypes['User']>>>, ParentType, ContextType>;
  filenameDisk?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  filenameDownload?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  hash?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<Array<Maybe<TResolversTypes['Float']>>>, ParentType, ContextType>;
  meta?: Resolver<Maybe<TResolversTypes['Meta']>, ParentType, ContextType>;
  mimetype?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType>;
  place?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<Maybe<TResolversTypes['Tag']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  uploader?: Resolver<Maybe<TResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['Meta'] = TResolversParentTypes['Meta']> = {
  __resolveType: TypeResolveFn<'ImageMeta' | 'VideoMeta', ParentType, ContextType>;
};

export type TMutationResolvers<ContextType = any, ParentType extends TResolversParentTypes['Mutation'] = TResolversParentTypes['Mutation']> = {
  addToAlbum?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationAddToAlbumArgs, 'idAlbum' | 'media'>>;
  addToFavorites?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationAddToFavoritesArgs, 'media'>>;
  changeLanguage?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType, RequireFields<TMutationChangeLanguageArgs, 'language'>>;
  createAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, Partial<TMutationCreateAlbumArgs>>;
  deleteAlbum?: Resolver<Array<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationDeleteAlbumArgs, 'ids'>>;
  deleteMedia?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationDeleteMediaArgs, 'ids'>>;
  emptyTrash?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
  register?: Resolver<TResolversTypes['Device'], ParentType, ContextType, RequireFields<TMutationRegisterArgs, 'device'>>;
  removeFromAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationRemoveFromAlbumArgs, 'idAlbum' | 'media'>>;
  removeFromFavorites?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationRemoveFromFavoritesArgs, 'media'>>;
  rotate?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationRotateArgs, 'id'>>;
  setMediaStatus?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationSetMediaStatusArgs, 'media' | 'status'>>;
  signIn?: Resolver<Maybe<TResolversTypes['Token']>, ParentType, ContextType, RequireFields<TMutationSignInArgs, 'mail' | 'password'>>;
  signOut?: Resolver<Maybe<TResolversTypes['Boolean']>, ParentType, ContextType>;
  signUp?: Resolver<Maybe<TResolversTypes['Token']>, ParentType, ContextType, RequireFields<TMutationSignUpArgs, 'firstName' | 'language' | 'lastName' | 'mail' | 'password'>>;
  updateAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationUpdateAlbumArgs, 'fields' | 'idAlbum'>>;
  updateMedium?: Resolver<TResolversTypes['Medium'], ParentType, ContextType, RequireFields<TMutationUpdateMediumArgs, 'id'>>;
  upload?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationUploadArgs, 'files'>>;
};

export type TQueryResolvers<ContextType = any, ParentType extends TResolversParentTypes['Query'] = TResolversParentTypes['Query']> = {
  album?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TQueryAlbumArgs, 'id'>>;
  albumMedia?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TQueryAlbumMediaArgs, 'id'>>;
  albums?: Resolver<Array<TResolversTypes['Album']>, ParentType, ContextType, Partial<TQueryAlbumsArgs>>;
  devices?: Resolver<Array<TResolversTypes['Device']>, ParentType, ContextType>;
  download?: Resolver<TResolversTypes['Download'], ParentType, ContextType, RequireFields<TQueryDownloadArgs, 'media'>>;
  favorites?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<TResolversTypes['Medium']>>, ParentType, ContextType, Partial<TQueryMediaArgs>>;
  mediaCountByYear?: Resolver<TResolversTypes['YearCountResult'], ParentType, ContextType>;
  medium?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TQueryMediumArgs, 'id'>>;
  translate?: Resolver<TResolversTypes['String'], ParentType, ContextType, RequireFields<TQueryTranslateArgs, 'query'>>;
  user?: Resolver<TResolversTypes['User'], ParentType, ContextType, RequireFields<TQueryUserArgs, 'id'>>;
  users?: Resolver<Array<TResolversTypes['User']>, ParentType, ContextType>;
};

export type TTagResolvers<ContextType = any, ParentType extends TResolversParentTypes['Tag'] = TResolversParentTypes['Tag']> = {
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  idUser?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TTokenResolvers<ContextType = any, ParentType extends TResolversParentTypes['Token'] = TResolversParentTypes['Token']> = {
  accessToken?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TUploadScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type TUserResolvers<ContextType = any, ParentType extends TResolversParentTypes['User'] = TResolversParentTypes['User']> = {
  dateCreated?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  mail?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TVideoMetaResolvers<ContextType = any, ParentType extends TResolversParentTypes['VideoMeta'] = TResolversParentTypes['VideoMeta']> = {
  duration?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  height?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<TResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TYearCountEntryResolvers<ContextType = any, ParentType extends TResolversParentTypes['YearCountEntry'] = TResolversParentTypes['YearCountEntry']> = {
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  months?: Resolver<Array<TResolversTypes['YearCountMonth']>, ParentType, ContextType>;
  year?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TYearCountMonthResolvers<ContextType = any, ParentType extends TResolversParentTypes['YearCountMonth'] = TResolversParentTypes['YearCountMonth']> = {
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  month?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TYearCountResultResolvers<ContextType = any, ParentType extends TResolversParentTypes['YearCountResult'] = TResolversParentTypes['YearCountResult']> = {
  count?: Resolver<TResolversTypes['Int'], ParentType, ContextType>;
  years?: Resolver<Array<TResolversTypes['YearCountEntry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TResolvers<ContextType = any> = {
  Album?: TAlbumResolvers<ContextType>;
  Count?: TCountResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Device?: TDeviceResolvers<ContextType>;
  Download?: TDownloadResolvers<ContextType>;
  File?: TFileResolvers<ContextType>;
  ImageMeta?: TImageMetaResolvers<ContextType>;
  Medium?: TMediumResolvers<ContextType>;
  Meta?: TMetaResolvers<ContextType>;
  Mutation?: TMutationResolvers<ContextType>;
  Query?: TQueryResolvers<ContextType>;
  Tag?: TTagResolvers<ContextType>;
  Token?: TTokenResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: TUserResolvers<ContextType>;
  VideoMeta?: TVideoMetaResolvers<ContextType>;
  YearCountEntry?: TYearCountEntryResolvers<ContextType>;
  YearCountMonth?: TYearCountMonthResolvers<ContextType>;
  YearCountResult?: TYearCountResultResolvers<ContextType>;
};

export type TDirectiveResolvers<ContextType = any> = {
  auth?: TAuthDirectiveResolver<any, any, ContextType>;
};

export type TFMedia = (
  { __typename?: 'Medium' }
  & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
  & { favoredBy?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id'>
  )>>>, owner?: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'firstName' | 'lastName'>
  )>, uploader?: Maybe<(
    { __typename?: 'User' }
    & Pick<TUser, 'id' | 'firstName' | 'lastName'>
  )>, meta?: Maybe<(
    { __typename?: 'ImageMeta' }
    & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
  ) | (
    { __typename?: 'VideoMeta' }
    & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
  )> }
);

export type TFMediaStatus = (
  { __typename: 'Medium' }
  & Pick<TMedium, 'id' | 'status'>
);

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
    & Pick<TAlbum, 'id' | 'title' | 'description' | 'dateCreated' | 'dateModified'>
    & { cover?: Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    )>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>, media?: Maybe<Array<Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
      & { favoredBy?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id'>
      )>>>, owner?: Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      )>, uploader?: Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      )>, meta?: Maybe<(
        { __typename?: 'ImageMeta' }
        & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
      ) | (
        { __typename?: 'VideoMeta' }
        & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
      )> }
    )>>> }
  )> }
);

export type TQAlbumMediaVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TQAlbumMedia = (
  { __typename?: 'Query' }
  & { albumMedia: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )> }
);

export type TQAlbumsVariables = Exact<{
  idMedium?: InputMaybe<Scalars['ID']>;
}>;


export type TQAlbums = (
  { __typename?: 'Query' }
  & { albums: Array<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id' | 'title' | 'description' | 'dateCreated' | 'dateModified'>
    & { cover?: Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
      & { favoredBy?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id'>
      )>>>, owner?: Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      )>, uploader?: Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      )>, meta?: Maybe<(
        { __typename?: 'ImageMeta' }
        & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
      ) | (
        { __typename?: 'VideoMeta' }
        & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
      )> }
    )>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, media?: Maybe<Array<Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
      & { favoredBy?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id'>
      )>>>, owner?: Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      )>, uploader?: Maybe<(
        { __typename?: 'User' }
        & Pick<TUser, 'id' | 'firstName' | 'lastName'>
      )>, meta?: Maybe<(
        { __typename?: 'ImageMeta' }
        & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
      ) | (
        { __typename?: 'VideoMeta' }
        & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
      )> }
    )>>> }
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
  & { deleteAlbum: Array<(
    { __typename?: 'Album' }
    & Pick<TAlbum, 'id'>
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
    & { media?: Maybe<Array<Maybe<(
      { __typename?: 'Medium' }
      & Pick<TMedium, 'id'>
    )>>> }
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
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
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

export type TQDownloadVariables = Exact<{
  media: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type TQDownload = (
  { __typename?: 'Query' }
  & { download: (
    { __typename?: 'Download' }
    & Pick<TDownload, 'url'>
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
  status?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  album?: InputMaybe<Scalars['String']>;
  favorites?: InputMaybe<Scalars['Boolean']>;
  q?: InputMaybe<Scalars['String']>;
}>;


export type TQMedia = (
  { __typename?: 'Query' }
  & { media?: Maybe<Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
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
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'firstName' | 'lastName' | 'id'>
    )>, favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
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
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )> }
);

export type TMSetMediaStatusVariables = Exact<{
  media: Array<Scalars['ID']> | Scalars['ID'];
  status: Scalars['String'];
}>;


export type TMSetMediaStatus = (
  { __typename?: 'Mutation' }
  & { setMediaStatus: Array<(
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
  )> }
);

export type TMUpdateMediumVariables = Exact<{
  id: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type TMUpdateMedium = (
  { __typename?: 'Mutation' }
  & { updateMedium: (
    { __typename?: 'Medium' }
    & Pick<TMedium, 'dateCreated' | 'dateModified' | 'dateTaken' | 'id' | 'filenameDisk' | 'filenameDownload' | 'title' | 'description' | 'location' | 'country' | 'region' | 'place' | 'address' | 'status' | 'mimetype'>
    & { favoredBy?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id'>
    )>>>, owner?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, uploader?: Maybe<(
      { __typename?: 'User' }
      & Pick<TUser, 'id' | 'firstName' | 'lastName'>
    )>, meta?: Maybe<(
      { __typename?: 'ImageMeta' }
      & Pick<TImageMeta, 'width' | 'height' | 'cameraMake' | 'cameraModel' | 'flash' | 'fNumber' | 'iso'>
    ) | (
      { __typename?: 'VideoMeta' }
      & Pick<TVideoMeta, 'width' | 'height' | 'duration'>
    )> }
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

export type TQTranslateVariables = Exact<{
  query: Scalars['String'];
}>;


export type TQTranslate = (
  { __typename?: 'Query' }
  & Pick<TQuery, 'translate'>
);

export type TMChangeLanguageVariables = Exact<{
  language: Scalars['String'];
}>;


export type TMChangeLanguage = (
  { __typename?: 'Mutation' }
  & Pick<TMutation, 'changeLanguage'>
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

export const FMedia = gql`
    fragment FMedia on Medium {
  dateCreated
  dateModified
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
export const MAddToAlbumDocument = gql`
    mutation MAddToAlbum($idAlbum: ID!, $media: [ID!]!) {
  addToAlbum(idAlbum: $idAlbum, media: $media) {
    id
  }
}
    `;

export function useMAddToAlbum() {
  return Urql.useMutation<TMAddToAlbum, TMAddToAlbumVariables>(MAddToAlbumDocument);
};
export const QAlbumDocument = gql`
    query QAlbum($id: ID!) {
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
    query QAlbumMedia($id: ID!) {
  albumMedia(id: $id) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useQAlbumMedia(options: Omit<Urql.UseQueryArgs<TQAlbumMediaVariables>, 'query'>) {
  return Urql.useQuery<TQAlbumMedia, TQAlbumMediaVariables>({ query: QAlbumMediaDocument, ...options });
};
export const QAlbumsDocument = gql`
    query QAlbums($idMedium: ID) {
  albums(idMedium: $idMedium) {
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

export function useQAlbums(options?: Omit<Urql.UseQueryArgs<TQAlbumsVariables>, 'query'>) {
  return Urql.useQuery<TQAlbums, TQAlbumsVariables>({ query: QAlbumsDocument, ...options });
};
export const MCreateAlbumDocument = gql`
    mutation MCreateAlbum($album: AlbumInput, $media: [ID]) {
  createAlbum(album: $album, media: $media) {
    id
  }
}
    `;

export function useMCreateAlbum() {
  return Urql.useMutation<TMCreateAlbum, TMCreateAlbumVariables>(MCreateAlbumDocument);
};
export const MDeleteAlbumDocument = gql`
    mutation MDeleteAlbum($ids: [ID]!) {
  deleteAlbum(ids: $ids) {
    id
  }
}
    `;

export function useMDeleteAlbum() {
  return Urql.useMutation<TMDeleteAlbum, TMDeleteAlbumVariables>(MDeleteAlbumDocument);
};
export const MRemoveFromAlbumDocument = gql`
    mutation MRemoveFromAlbum($idAlbum: ID!, $media: [ID!]!) {
  removeFromAlbum(idAlbum: $idAlbum, media: $media) {
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
    mutation MUpdateAlbum($idAlbum: ID!, $fields: AlbumInput!) {
  updateAlbum(idAlbum: $idAlbum, fields: $fields) {
    id
  }
}
    `;

export function useMUpdateAlbum() {
  return Urql.useMutation<TMUpdateAlbum, TMUpdateAlbumVariables>(MUpdateAlbumDocument);
};
export const MAddToFavoritesDocument = gql`
    mutation MAddToFavorites($media: [ID!]!) {
  addToFavorites(media: $media) {
    id
  }
}
    `;

export function useMAddToFavorites() {
  return Urql.useMutation<TMAddToFavorites, TMAddToFavoritesVariables>(MAddToFavoritesDocument);
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
export const MRemoveFromFavoritesDocument = gql`
    mutation MRemoveFromFavorites($media: [ID!]!) {
  removeFromFavorites(media: $media) {
    id
  }
}
    `;

export function useMRemoveFromFavorites() {
  return Urql.useMutation<TMRemoveFromFavorites, TMRemoveFromFavoritesVariables>(MRemoveFromFavoritesDocument);
};
export const MDeleteMediaDocument = gql`
    mutation MDeleteMedia($ids: [ID!]!) {
  deleteMedia(ids: $ids) {
    id
  }
}
    `;

export function useMDeleteMedia() {
  return Urql.useMutation<TMDeleteMedia, TMDeleteMediaVariables>(MDeleteMediaDocument);
};
export const QDownloadDocument = gql`
    query QDownload($media: [ID!]!) {
  download(media: $media) {
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
    query QMedia($status: String, $sort: String, $album: String, $favorites: Boolean, $q: String) {
  media(status: $status, sort: $sort, album: $album, favorites: $favorites, q: $q) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useQMedia(options?: Omit<Urql.UseQueryArgs<TQMediaVariables>, 'query'>) {
  return Urql.useQuery<TQMedia, TQMediaVariables>({ query: QMediaDocument, ...options });
};
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

export function useQMediaYearCount(options?: Omit<Urql.UseQueryArgs<TQMediaYearCountVariables>, 'query'>) {
  return Urql.useQuery<TQMediaYearCount, TQMediaYearCountVariables>({ query: QMediaYearCountDocument, ...options });
};
export const QMediumDocument = gql`
    query QMedium($id: ID!) {
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
    mutation MRotate($id: ID!) {
  rotate(id: $id) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useMRotate() {
  return Urql.useMutation<TMRotate, TMRotateVariables>(MRotateDocument);
};
export const MSetMediaStatusDocument = gql`
    mutation MSetMediaStatus($media: [ID!]!, $status: String!) {
  setMediaStatus(media: $media, status: $status) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useMSetMediaStatus() {
  return Urql.useMutation<TMSetMediaStatus, TMSetMediaStatusVariables>(MSetMediaStatusDocument);
};
export const MUpdateMediumDocument = gql`
    mutation MUpdateMedium($id: ID!, $description: String) {
  updateMedium(id: $id, description: $description) {
    ...FMedia
  }
}
    ${FMedia}`;

export function useMUpdateMedium() {
  return Urql.useMutation<TMUpdateMedium, TMUpdateMediumVariables>(MUpdateMediumDocument);
};
export const MUploadDocument = gql`
    mutation MUpload($files: [Upload!]!) {
  upload(files: $files) {
    id
  }
}
    `;

export function useMUpload() {
  return Urql.useMutation<TMUpload, TMUploadVariables>(MUploadDocument);
};
export const QTranslateDocument = gql`
    query QTranslate($query: String!) {
  translate(query: $query)
}
    `;

export function useQTranslate(options: Omit<Urql.UseQueryArgs<TQTranslateVariables>, 'query'>) {
  return Urql.useQuery<TQTranslate, TQTranslateVariables>({ query: QTranslateDocument, ...options });
};
export const MChangeLanguageDocument = gql`
    mutation MChangeLanguage($language: String!) {
  changeLanguage(language: $language)
}
    `;

export function useMChangeLanguage() {
  return Urql.useMutation<TMChangeLanguage, TMChangeLanguageVariables>(MChangeLanguageDocument);
};
export const MSignInDocument = gql`
    mutation MSignIn($mail: String!, $password: String!) {
  signIn(mail: $mail, password: $password) {
    accessToken
  }
}
    `;

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
  }
}
    `;

export function useMSignUp() {
  return Urql.useMutation<TMSignUp, TMSignUpVariables>(MSignUpDocument);
};