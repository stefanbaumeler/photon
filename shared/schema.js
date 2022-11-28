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
function useMAddToAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MAddToAlbumDocument, options);
}
exports.useMAddToAlbum = useMAddToAlbum;
exports.QAlbumDocument = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query QAlbum($id: ID!) {\n  album(id: $id) {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "], ["\n    query QAlbum($id: ID!) {\n  album(id: $id) {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "])));
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
exports.QAlbumsDocument = (0, client_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    query QAlbums {\n  albums {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "], ["\n    query QAlbums {\n  albums {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "])));
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
exports.MCreateAlbumDocument = (0, client_1.gql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    mutation MCreateAlbum($media: [ID]) {\n  createAlbum(media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation MCreateAlbum($media: [ID]) {\n  createAlbum(media: $media) {\n    id\n  }\n}\n    "])));
function useMCreateAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MCreateAlbumDocument, options);
}
exports.useMCreateAlbum = useMCreateAlbum;
exports.MDeleteAlbumDocument = (0, client_1.gql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mutation MDeleteAlbum($ids: [ID]!) {\n  deleteAlbum(ids: $ids) {\n    id\n  }\n}\n    "], ["\n    mutation MDeleteAlbum($ids: [ID]!) {\n  deleteAlbum(ids: $ids) {\n    id\n  }\n}\n    "])));
function useMDeleteAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MDeleteAlbumDocument, options);
}
exports.useMDeleteAlbum = useMDeleteAlbum;
exports.MRemoveFromAlbumDocument = (0, client_1.gql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation MRemoveFromAlbum($idAlbum: ID!, $media: [ID!]!) {\n  removeFromAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation MRemoveFromAlbum($idAlbum: ID!, $media: [ID!]!) {\n  removeFromAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "])));
function useMRemoveFromAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MRemoveFromAlbumDocument, options);
}
exports.useMRemoveFromAlbum = useMRemoveFromAlbum;
exports.MSetAlbumCoverDocument = (0, client_1.gql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    mutation MSetAlbumCover($idAlbum: ID!, $idMedium: ID!) {\n  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {\n    id\n  }\n}\n    "], ["\n    mutation MSetAlbumCover($idAlbum: ID!, $idMedium: ID!) {\n  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {\n    id\n  }\n}\n    "])));
function useMSetAlbumCover(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSetAlbumCoverDocument, options);
}
exports.useMSetAlbumCover = useMSetAlbumCover;
exports.MUpdateAlbumTitleDocument = (0, client_1.gql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    mutation MUpdateAlbumTitle($id: ID!, $title: String!) {\n  updateAlbumTitle(id: $id, title: $title) {\n    id\n  }\n}\n    "], ["\n    mutation MUpdateAlbumTitle($id: ID!, $title: String!) {\n  updateAlbumTitle(id: $id, title: $title) {\n    id\n  }\n}\n    "])));
function useMUpdateAlbumTitle(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MUpdateAlbumTitleDocument, options);
}
exports.useMUpdateAlbumTitle = useMUpdateAlbumTitle;
exports.MDeleteMediaDocument = (0, client_1.gql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation MDeleteMedia($ids: [ID]!) {\n  deleteMedia(ids: $ids) {\n    id\n  }\n}\n    "], ["\n    mutation MDeleteMedia($ids: [ID]!) {\n  deleteMedia(ids: $ids) {\n    id\n  }\n}\n    "])));
function useMDeleteMedia(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MDeleteMediaDocument, options);
}
exports.useMDeleteMedia = useMDeleteMedia;
exports.MEmptyTrashDocument = (0, client_1.gql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation MEmptyTrash {\n  emptyTrash {\n    id\n  }\n}\n    "], ["\n    mutation MEmptyTrash {\n  emptyTrash {\n    id\n  }\n}\n    "])));
function useMEmptyTrash(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MEmptyTrashDocument, options);
}
exports.useMEmptyTrash = useMEmptyTrash;
exports.QMediaDocument = (0, client_1.gql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    query QMedia($status: String) {\n  media(status: $status) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "], ["\n    query QMedia($status: String) {\n  media(status: $status) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "])));
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
function useMRotate(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MRotateDocument, options);
}
exports.useMRotate = useMRotate;
exports.MSetMediaStatusDocument = (0, client_1.gql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    mutation MSetMediaStatus($media: [ID]!, $status: String) {\n  setMediaStatus(media: $media, status: $status) {\n    id\n  }\n}\n    "], ["\n    mutation MSetMediaStatus($media: [ID]!, $status: String) {\n  setMediaStatus(media: $media, status: $status) {\n    id\n  }\n}\n    "])));
function useMSetMediaStatus(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSetMediaStatusDocument, options);
}
exports.useMSetMediaStatus = useMSetMediaStatus;
exports.MUploadDocument = (0, client_1.gql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    mutation MUpload($file: [Upload]!) {\n  upload(file: $file) {\n    url\n  }\n}\n    "], ["\n    mutation MUpload($file: [Upload]!) {\n  upload(file: $file) {\n    url\n  }\n}\n    "])));
function useMUpload(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MUploadDocument, options);
}
exports.useMUpload = useMUpload;
exports.MSignInDocument = (0, client_1.gql)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    mutation MSignIn($mail: String!, $password: String!) {\n  signIn(mail: $mail, password: $password) {\n    accessToken\n  }\n}\n    "], ["\n    mutation MSignIn($mail: String!, $password: String!) {\n  signIn(mail: $mail, password: $password) {\n    accessToken\n  }\n}\n    "])));
function useMSignIn(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSignInDocument, options);
}
exports.useMSignIn = useMSignIn;
exports.MSignOutDocument = (0, client_1.gql)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    mutation MSignOut {\n  signOut\n}\n    "], ["\n    mutation MSignOut {\n  signOut\n}\n    "])));
function useMSignOut(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSignOutDocument, options);
}
exports.useMSignOut = useMSignOut;
exports.MSignUpDocument = (0, client_1.gql)(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n    mutation MSignUp($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {\n  signUp(\n    mail: $mail\n    password: $password\n    firstName: $firstName\n    lastName: $lastName\n  ) {\n    accessToken\n  }\n}\n    "], ["\n    mutation MSignUp($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {\n  signUp(\n    mail: $mail\n    password: $password\n    firstName: $firstName\n    lastName: $lastName\n  ) {\n    accessToken\n  }\n}\n    "])));
function useMSignUp(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.MSignUpDocument, options);
}
exports.useMSignUp = useMSignUp;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19;
