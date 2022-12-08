"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useMSignUp = exports.MSignUpDocument = exports.useMSignOut = exports.MSignOutDocument = exports.useMSignIn = exports.MSignInDocument = exports.useMUpload = exports.MUploadDocument = exports.useMSetMediaStatus = exports.MSetMediaStatusDocument = exports.useMRotate = exports.MRotateDocument = exports.useQMediumLazyQuery = exports.useQMedium = exports.QMediumDocument = exports.useQMediaLazyQuery = exports.useQMedia = exports.QMediaDocument = exports.useMEmptyTrash = exports.MEmptyTrashDocument = exports.useMDeleteMedia = exports.MDeleteMediaDocument = exports.useMUpdateAlbumTitle = exports.MUpdateAlbumTitleDocument = exports.useMSetAlbumCover = exports.MSetAlbumCoverDocument = exports.useMRemoveFromAlbum = exports.MRemoveFromAlbumDocument = exports.useMDeleteAlbum = exports.MDeleteAlbumDocument = exports.useMCreateAlbum = exports.MCreateAlbumDocument = exports.useQAlbumsLazyQuery = exports.useQAlbums = exports.QAlbumsDocument = exports.useQAlbumMediaLazyQuery = exports.useQAlbumMedia = exports.QAlbumMediaDocument = exports.useQAlbumLazyQuery = exports.useQAlbum = exports.QAlbumDocument = exports.useMAddToAlbum = exports.MAddToAlbumDocument = void 0;
var client_1 = require("@apollo/client");
var Apollo = require("@apollo/client");
var defaultOptions = {};
exports.MAddToAlbumDocument = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation MAddToAlbum($idAlbum: ID!, $media: [ID!]!) {\n  addToAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation MAddToAlbum($idAlbum: ID!, $media: [ID!]!) {\n  addToAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "])));
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
function useMAddToAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MAddToAlbumDocument, options);
}
exports.useMAddToAlbum = useMAddToAlbum;
exports.QAlbumDocument = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query QAlbum($id: ID!) {\n  album(id: $id) {\n    id\n    title\n    description\n    cover {\n      id\n    }\n    owner {\n      id\n    }\n  }\n}\n    "], ["\n    query QAlbum($id: ID!) {\n  album(id: $id) {\n    id\n    title\n    description\n    cover {\n      id\n    }\n    owner {\n      id\n    }\n  }\n}\n    "])));
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
function useQAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.QAlbumDocument, options);
}
exports.useQAlbum = useQAlbum;
function useQAlbumLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.QAlbumDocument, options);
}
exports.useQAlbumLazyQuery = useQAlbumLazyQuery;
exports.QAlbumMediaDocument = (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    query QAlbumMedia($id: ID!) {\n  albumMedia(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "], ["\n    query QAlbumMedia($id: ID!) {\n  albumMedia(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "])));
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
function useQAlbumMedia(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.QAlbumMediaDocument, options);
}
exports.useQAlbumMedia = useQAlbumMedia;
function useQAlbumMediaLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.QAlbumMediaDocument, options);
}
exports.useQAlbumMediaLazyQuery = useQAlbumMediaLazyQuery;
exports.QAlbumsDocument = (0, client_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    query QAlbums {\n  albums {\n    id\n    title\n    description\n    cover {\n      id\n    }\n    owner {\n      id\n    }\n  }\n}\n    "], ["\n    query QAlbums {\n  albums {\n    id\n    title\n    description\n    cover {\n      id\n    }\n    owner {\n      id\n    }\n  }\n}\n    "])));
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
function useQAlbums(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.QAlbumsDocument, options);
}
exports.useQAlbums = useQAlbums;
function useQAlbumsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.QAlbumsDocument, options);
}
exports.useQAlbumsLazyQuery = useQAlbumsLazyQuery;
exports.MCreateAlbumDocument = (0, client_1.gql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    mutation MCreateAlbum($album: AlbumInput, $media: [ID]) {\n  createAlbum(album: $album, media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation MCreateAlbum($album: AlbumInput, $media: [ID]) {\n  createAlbum(album: $album, media: $media) {\n    id\n  }\n}\n    "])));
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
function useMCreateAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MCreateAlbumDocument, options);
}
exports.useMCreateAlbum = useMCreateAlbum;
exports.MDeleteAlbumDocument = (0, client_1.gql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mutation MDeleteAlbum($ids: [ID]!) {\n  deleteAlbum(ids: $ids) {\n    count\n  }\n}\n    "], ["\n    mutation MDeleteAlbum($ids: [ID]!) {\n  deleteAlbum(ids: $ids) {\n    count\n  }\n}\n    "])));
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
function useMDeleteAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MDeleteAlbumDocument, options);
}
exports.useMDeleteAlbum = useMDeleteAlbum;
exports.MRemoveFromAlbumDocument = (0, client_1.gql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation MRemoveFromAlbum($idAlbum: ID!, $media: [ID!]!) {\n  removeFromAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation MRemoveFromAlbum($idAlbum: ID!, $media: [ID!]!) {\n  removeFromAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "])));
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
function useMRemoveFromAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MRemoveFromAlbumDocument, options);
}
exports.useMRemoveFromAlbum = useMRemoveFromAlbum;
exports.MSetAlbumCoverDocument = (0, client_1.gql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    mutation MSetAlbumCover($idAlbum: ID!, $idMedium: ID!) {\n  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {\n    id\n  }\n}\n    "], ["\n    mutation MSetAlbumCover($idAlbum: ID!, $idMedium: ID!) {\n  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {\n    id\n  }\n}\n    "])));
/**
 * __useMSetAlbumCover__
 *
 * To run a mutation, you first call `useMSetAlbumCover` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMSetAlbumCover` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mSetAlbumCover, { data, loading, error }] = useMSetAlbumCover({
 *   variables: {
 *      idAlbum: // value for 'idAlbum'
 *      idMedium: // value for 'idMedium'
 *   },
 * });
 */
function useMSetAlbumCover(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSetAlbumCoverDocument, options);
}
exports.useMSetAlbumCover = useMSetAlbumCover;
exports.MUpdateAlbumTitleDocument = (0, client_1.gql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    mutation MUpdateAlbumTitle($id: ID!, $title: String!) {\n  updateAlbumTitle(id: $id, title: $title) {\n    id\n  }\n}\n    "], ["\n    mutation MUpdateAlbumTitle($id: ID!, $title: String!) {\n  updateAlbumTitle(id: $id, title: $title) {\n    id\n  }\n}\n    "])));
/**
 * __useMUpdateAlbumTitle__
 *
 * To run a mutation, you first call `useMUpdateAlbumTitle` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMUpdateAlbumTitle` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mUpdateAlbumTitle, { data, loading, error }] = useMUpdateAlbumTitle({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
function useMUpdateAlbumTitle(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MUpdateAlbumTitleDocument, options);
}
exports.useMUpdateAlbumTitle = useMUpdateAlbumTitle;
exports.MDeleteMediaDocument = (0, client_1.gql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation MDeleteMedia($ids: [ID]!) {\n  deleteMedia(ids: $ids) {\n    id\n  }\n}\n    "], ["\n    mutation MDeleteMedia($ids: [ID]!) {\n  deleteMedia(ids: $ids) {\n    id\n  }\n}\n    "])));
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
function useMDeleteMedia(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MDeleteMediaDocument, options);
}
exports.useMDeleteMedia = useMDeleteMedia;
exports.MEmptyTrashDocument = (0, client_1.gql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation MEmptyTrash {\n  emptyTrash {\n    id\n  }\n}\n    "], ["\n    mutation MEmptyTrash {\n  emptyTrash {\n    id\n  }\n}\n    "])));
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
function useMEmptyTrash(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MEmptyTrashDocument, options);
}
exports.useMEmptyTrash = useMEmptyTrash;
exports.QMediaDocument = (0, client_1.gql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    query QMedia($status: String) {\n  media(status: $status) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "], ["\n    query QMedia($status: String) {\n  media(status: $status) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "])));
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
 *   },
 * });
 */
function useQMedia(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.QMediaDocument, options);
}
exports.useQMedia = useQMedia;
function useQMediaLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.QMediaDocument, options);
}
exports.useQMediaLazyQuery = useQMediaLazyQuery;
exports.QMediumDocument = (0, client_1.gql)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    query QMedium($id: ID!) {\n  medium(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "], ["\n    query QMedium($id: ID!) {\n  medium(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "])));
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
function useQMedium(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.QMediumDocument, options);
}
exports.useQMedium = useQMedium;
function useQMediumLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.QMediumDocument, options);
}
exports.useQMediumLazyQuery = useQMediumLazyQuery;
exports.MRotateDocument = (0, client_1.gql)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    mutation MRotate($id: ID!) {\n  rotate(id: $id) {\n    id\n  }\n}\n    "], ["\n    mutation MRotate($id: ID!) {\n  rotate(id: $id) {\n    id\n  }\n}\n    "])));
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
function useMRotate(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MRotateDocument, options);
}
exports.useMRotate = useMRotate;
exports.MSetMediaStatusDocument = (0, client_1.gql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    mutation MSetMediaStatus($media: [ID]!, $status: String) {\n  setMediaStatus(media: $media, status: $status) {\n    count\n  }\n}\n    "], ["\n    mutation MSetMediaStatus($media: [ID]!, $status: String) {\n  setMediaStatus(media: $media, status: $status) {\n    count\n  }\n}\n    "])));
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
function useMSetMediaStatus(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSetMediaStatusDocument, options);
}
exports.useMSetMediaStatus = useMSetMediaStatus;
exports.MUploadDocument = (0, client_1.gql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    mutation MUpload($file: [Upload]!) {\n  upload(file: $file) {\n    url\n  }\n}\n    "], ["\n    mutation MUpload($file: [Upload]!) {\n  upload(file: $file) {\n    url\n  }\n}\n    "])));
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
 *      file: // value for 'file'
 *   },
 * });
 */
function useMUpload(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MUploadDocument, options);
}
exports.useMUpload = useMUpload;
exports.MSignInDocument = (0, client_1.gql)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    mutation MSignIn($mail: String!, $password: String!) {\n  signIn(mail: $mail, password: $password) {\n    accessToken\n  }\n}\n    "], ["\n    mutation MSignIn($mail: String!, $password: String!) {\n  signIn(mail: $mail, password: $password) {\n    accessToken\n  }\n}\n    "])));
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
function useMSignIn(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSignInDocument, options);
}
exports.useMSignIn = useMSignIn;
exports.MSignOutDocument = (0, client_1.gql)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    mutation MSignOut {\n  signOut\n}\n    "], ["\n    mutation MSignOut {\n  signOut\n}\n    "])));
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
function useMSignOut(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSignOutDocument, options);
}
exports.useMSignOut = useMSignOut;
exports.MSignUpDocument = (0, client_1.gql)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n    mutation MSignUp($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {\n  signUp(\n    mail: $mail\n    password: $password\n    firstName: $firstName\n    lastName: $lastName\n  ) {\n    accessToken\n  }\n}\n    "], ["\n    mutation MSignUp($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {\n  signUp(\n    mail: $mail\n    password: $password\n    firstName: $firstName\n    lastName: $lastName\n  ) {\n    accessToken\n  }\n}\n    "])));
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
function useMSignUp(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSignUpDocument, options);
}
exports.useMSignUp = useMSignUp;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19;
