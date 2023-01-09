import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileUpload } from 'graphql-upload-minimal'
export type Maybe<T> = Partial<T> | T | null;
export type InputMaybe<T> = Partial<T> | T | null;
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
  Count: ResolverTypeWrapper<TCount>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Device: ResolverTypeWrapper<TDevice>;
  DeviceInput: TDeviceInput;
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
  YearCountEntry: TYearCountEntry;
  YearCountMonth: TYearCountMonth;
  YearCountResult: TYearCountResult;
};

export type TAuthDirectiveArgs = { };

export type TAuthDirectiveResolver<Result, Parent, ContextType = any, Args = TAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type TAlbumResolvers<ContextType = any, ParentType extends TResolversParentTypes['Album'] = TResolversParentTypes['Album']> = {
  cover?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType>;
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<TResolversTypes['ID'], ParentType, ContextType>;
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
  dateCreated?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateModified?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateModifiedStatus?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  dateTaken?: Resolver<Maybe<TResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<Maybe<TResolversTypes['String']>, ParentType, ContextType>;
  favoredBy?: Resolver<Maybe<Array<Maybe<TResolversTypes['User']>>>, ParentType, ContextType>;
  filenameDisk?: Resolver<TResolversTypes['String'], ParentType, ContextType>;
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
  addToAlbum?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationAddToAlbumArgs, 'idAlbum' | 'media'>>;
  addToFavorites?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationAddToFavoritesArgs, 'media'>>;
  createAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, Partial<TMutationCreateAlbumArgs>>;
  deleteAlbum?: Resolver<Maybe<TResolversTypes['Count']>, ParentType, ContextType, RequireFields<TMutationDeleteAlbumArgs, 'ids'>>;
  deleteMedia?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationDeleteMediaArgs, 'ids'>>;
  emptyTrash?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
  register?: Resolver<TResolversTypes['Device'], ParentType, ContextType, RequireFields<TMutationRegisterArgs, 'device'>>;
  removeFromAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationRemoveFromAlbumArgs, 'idAlbum' | 'media'>>;
  removeFromFavorites?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationRemoveFromFavoritesArgs, 'media'>>;
  rotate?: Resolver<TResolversTypes['Medium'], ParentType, ContextType, RequireFields<TMutationRotateArgs, 'id'>>;
  setMediaStatus?: Resolver<TResolversTypes['Count'], ParentType, ContextType, RequireFields<TMutationSetMediaStatusArgs, 'media' | 'status'>>;
  signIn?: Resolver<Maybe<TResolversTypes['Token']>, ParentType, ContextType, RequireFields<TMutationSignInArgs, 'mail' | 'password'>>;
  signOut?: Resolver<Maybe<TResolversTypes['Boolean']>, ParentType, ContextType>;
  signUp?: Resolver<Maybe<TResolversTypes['Token']>, ParentType, ContextType, RequireFields<TMutationSignUpArgs, 'firstName' | 'lastName' | 'mail' | 'password'>>;
  updateAlbum?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TMutationUpdateAlbumArgs, 'idAlbum'>>;
  upload?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TMutationUploadArgs, 'files'>>;
};

export type TQueryResolvers<ContextType = any, ParentType extends TResolversParentTypes['Query'] = TResolversParentTypes['Query']> = {
  album?: Resolver<Maybe<TResolversTypes['Album']>, ParentType, ContextType, RequireFields<TQueryAlbumArgs, 'id'>>;
  albumMedia?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TQueryAlbumMediaArgs, 'id'>>;
  albums?: Resolver<Array<TResolversTypes['Album']>, ParentType, ContextType>;
  devices?: Resolver<Array<TResolversTypes['Device']>, ParentType, ContextType>;
  favorites?: Resolver<Array<TResolversTypes['Medium']>, ParentType, ContextType>;
  media?: Resolver<Maybe<Array<TResolversTypes['Medium']>>, ParentType, ContextType, Partial<TQueryMediaArgs>>;
  mediaCountByYear?: Resolver<TResolversTypes['YearCountResult'], ParentType, ContextType>;
  medium?: Resolver<Maybe<TResolversTypes['Medium']>, ParentType, ContextType, RequireFields<TQueryMediumArgs, 'id'>>;
  user?: Resolver<TResolversTypes['User'], ParentType, ContextType, RequireFields<TQueryUserArgs, 'id'>>;
  users?: Resolver<Array<TResolversTypes['User']>, ParentType, ContextType>;
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
  dateCreated?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  dateModified?: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<Maybe<TResolversTypes['Medium']>>>, ParentType, ContextType>;
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
  YearCountEntry?: TYearCountEntryResolvers<ContextType>;
  YearCountMonth?: TYearCountMonthResolvers<ContextType>;
  YearCountResult?: TYearCountResultResolvers<ContextType>;
};

export type TDirectiveResolvers<ContextType = any> = {
  auth?: TAuthDirectiveResolver<any, any, ContextType>;
};
