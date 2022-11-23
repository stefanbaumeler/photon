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
exports.useSignup = exports.SignupDocument = exports.useLogin = exports.LoginDocument = exports.useUpload = exports.UploadDocument = exports.useSetMediaStatus = exports.SetMediaStatusDocument = exports.useRotate = exports.RotateDocument = exports.useMediumQueryLazyQuery = exports.useMediumQuery = exports.MediumQueryDocument = exports.useMediaQueryLazyQuery = exports.useMediaQuery = exports.MediaQueryDocument = exports.useEmptyTrash = exports.EmptyTrashDocument = exports.useDeleteMedia = exports.DeleteMediaDocument = exports.useUpdateAlbumTitle = exports.UpdateAlbumTitleDocument = exports.useSetAlbumCover = exports.SetAlbumCoverDocument = exports.useRemoveFromAlbum = exports.RemoveFromAlbumDocument = exports.useDeleteAlbum = exports.DeleteAlbumDocument = exports.useCreateAlbum = exports.CreateAlbumDocument = exports.useAlbumsQueryLazyQuery = exports.useAlbumsQuery = exports.AlbumsQueryDocument = exports.useAlbumMediaQueryLazyQuery = exports.useAlbumMediaQuery = exports.AlbumMediaQueryDocument = exports.useAlbumQueryLazyQuery = exports.useAlbumQuery = exports.AlbumQueryDocument = exports.useAddToAlbum = exports.AddToAlbumDocument = void 0;
var client_1 = require("@apollo/client");
var Apollo = require("@apollo/client");
var defaultOptions = {};
exports.AddToAlbumDocument = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation addToAlbum($idAlbum: ID!, $media: [ID!]!) {\n  addToAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation addToAlbum($idAlbum: ID!, $media: [ID!]!) {\n  addToAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "])));
function useAddToAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.AddToAlbumDocument, options);
}
exports.useAddToAlbum = useAddToAlbum;
exports.AlbumQueryDocument = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query AlbumQuery($id: ID!) {\n  album(id: $id) {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "], ["\n    query AlbumQuery($id: ID!) {\n  album(id: $id) {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "])));
function useAlbumQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.AlbumQueryDocument, options);
}
exports.useAlbumQuery = useAlbumQuery;
function useAlbumQueryLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.AlbumQueryDocument, options);
}
exports.useAlbumQueryLazyQuery = useAlbumQueryLazyQuery;
exports.AlbumMediaQueryDocument = (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    query AlbumMediaQuery($id: ID!) {\n  albumMedia(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "], ["\n    query AlbumMediaQuery($id: ID!) {\n  albumMedia(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "])));
function useAlbumMediaQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.AlbumMediaQueryDocument, options);
}
exports.useAlbumMediaQuery = useAlbumMediaQuery;
function useAlbumMediaQueryLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.AlbumMediaQueryDocument, options);
}
exports.useAlbumMediaQueryLazyQuery = useAlbumMediaQueryLazyQuery;
exports.AlbumsQueryDocument = (0, client_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    query AlbumsQuery {\n  albums {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "], ["\n    query AlbumsQuery {\n  albums {\n    id\n    title\n    description\n    idMedium\n    owner {\n      id\n    }\n  }\n}\n    "])));
function useAlbumsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.AlbumsQueryDocument, options);
}
exports.useAlbumsQuery = useAlbumsQuery;
function useAlbumsQueryLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.AlbumsQueryDocument, options);
}
exports.useAlbumsQueryLazyQuery = useAlbumsQueryLazyQuery;
exports.CreateAlbumDocument = (0, client_1.gql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    mutation createAlbum($media: [ID]) {\n  createAlbum(media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation createAlbum($media: [ID]) {\n  createAlbum(media: $media) {\n    id\n  }\n}\n    "])));
function useCreateAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateAlbumDocument, options);
}
exports.useCreateAlbum = useCreateAlbum;
exports.DeleteAlbumDocument = (0, client_1.gql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mutation deleteAlbum($ids: [ID]!) {\n  deleteAlbum(ids: $ids) {\n    id\n  }\n}\n    "], ["\n    mutation deleteAlbum($ids: [ID]!) {\n  deleteAlbum(ids: $ids) {\n    id\n  }\n}\n    "])));
function useDeleteAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteAlbumDocument, options);
}
exports.useDeleteAlbum = useDeleteAlbum;
exports.RemoveFromAlbumDocument = (0, client_1.gql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation removeFromAlbum($idAlbum: ID!, $media: [ID!]!) {\n  removeFromAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "], ["\n    mutation removeFromAlbum($idAlbum: ID!, $media: [ID!]!) {\n  removeFromAlbum(idAlbum: $idAlbum, media: $media) {\n    id\n  }\n}\n    "])));
function useRemoveFromAlbum(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.RemoveFromAlbumDocument, options);
}
exports.useRemoveFromAlbum = useRemoveFromAlbum;
exports.SetAlbumCoverDocument = (0, client_1.gql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    mutation setAlbumCover($idAlbum: ID!, $idMedium: ID!) {\n  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {\n    id\n  }\n}\n    "], ["\n    mutation setAlbumCover($idAlbum: ID!, $idMedium: ID!) {\n  setAlbumCover(idAlbum: $idAlbum, idMedium: $idMedium) {\n    id\n  }\n}\n    "])));
function useSetAlbumCover(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.SetAlbumCoverDocument, options);
}
exports.useSetAlbumCover = useSetAlbumCover;
exports.UpdateAlbumTitleDocument = (0, client_1.gql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    mutation updateAlbumTitle($id: ID!, $title: String!) {\n  updateAlbumTitle(id: $id, title: $title) {\n    id\n  }\n}\n    "], ["\n    mutation updateAlbumTitle($id: ID!, $title: String!) {\n  updateAlbumTitle(id: $id, title: $title) {\n    id\n  }\n}\n    "])));
function useUpdateAlbumTitle(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.UpdateAlbumTitleDocument, options);
}
exports.useUpdateAlbumTitle = useUpdateAlbumTitle;
exports.DeleteMediaDocument = (0, client_1.gql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation deleteMedia($ids: [ID]!) {\n  deleteMedia(ids: $ids)\n}\n    "], ["\n    mutation deleteMedia($ids: [ID]!) {\n  deleteMedia(ids: $ids)\n}\n    "])));
function useDeleteMedia(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteMediaDocument, options);
}
exports.useDeleteMedia = useDeleteMedia;
exports.EmptyTrashDocument = (0, client_1.gql)(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation emptyTrash {\n  emptyTrash\n}\n    "], ["\n    mutation emptyTrash {\n  emptyTrash\n}\n    "])));
function useEmptyTrash(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.EmptyTrashDocument, options);
}
exports.useEmptyTrash = useEmptyTrash;
exports.MediaQueryDocument = (0, client_1.gql)(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    query MediaQuery($status: String) {\n  media(status: $status) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "], ["\n    query MediaQuery($status: String) {\n  media(status: $status) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "])));
function useMediaQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.MediaQueryDocument, options);
}
exports.useMediaQuery = useMediaQuery;
function useMediaQueryLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.MediaQueryDocument, options);
}
exports.useMediaQueryLazyQuery = useMediaQueryLazyQuery;
exports.MediumQueryDocument = (0, client_1.gql)(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    query MediumQuery($id: ID!) {\n  medium(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "], ["\n    query MediumQuery($id: ID!) {\n  medium(id: $id) {\n    dateCreated\n    dateModified\n    dateTaken\n    id\n    filenameDisk\n    filenameDownload\n    title\n    description\n    lat\n    lng\n    status\n    mimetype\n    owner {\n      id\n    }\n    uploader {\n      id\n    }\n    meta {\n      ... on ImageMeta {\n        width\n        height\n        cameraMake\n        cameraModel\n        flash\n        fNumber\n        iso\n      }\n      ... on VideoMeta {\n        width\n        height\n        duration\n      }\n    }\n  }\n}\n    "])));
function useMediumQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.MediumQueryDocument, options);
}
exports.useMediumQuery = useMediumQuery;
function useMediumQueryLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.MediumQueryDocument, options);
}
exports.useMediumQueryLazyQuery = useMediumQueryLazyQuery;
exports.RotateDocument = (0, client_1.gql)(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    mutation rotate($id: ID!) {\n  rotate(id: $id) {\n    id\n  }\n}\n    "], ["\n    mutation rotate($id: ID!) {\n  rotate(id: $id) {\n    id\n  }\n}\n    "])));
function useRotate(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.RotateDocument, options);
}
exports.useRotate = useRotate;
exports.SetMediaStatusDocument = (0, client_1.gql)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    mutation setMediaStatus($media: [ID]!, $status: String) {\n  setMediaStatus(media: $media, status: $status) {\n    id\n  }\n}\n    "], ["\n    mutation setMediaStatus($media: [ID]!, $status: String) {\n  setMediaStatus(media: $media, status: $status) {\n    id\n  }\n}\n    "])));
function useSetMediaStatus(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.SetMediaStatusDocument, options);
}
exports.useSetMediaStatus = useSetMediaStatus;
exports.UploadDocument = (0, client_1.gql)(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    mutation upload($file: [Upload]!) {\n  upload(file: $file) {\n    url\n  }\n}\n    "], ["\n    mutation upload($file: [Upload]!) {\n  upload(file: $file) {\n    url\n  }\n}\n    "])));
function useUpload(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.UploadDocument, options);
}
exports.useUpload = useUpload;
exports.LoginDocument = (0, client_1.gql)(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    mutation login($mail: String!, $password: String!) {\n  login(mail: $mail, password: $password) {\n    accessToken\n  }\n}\n    "], ["\n    mutation login($mail: String!, $password: String!) {\n  login(mail: $mail, password: $password) {\n    accessToken\n  }\n}\n    "])));
function useLogin(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LoginDocument, options);
}
exports.useLogin = useLogin;
exports.SignupDocument = (0, client_1.gql)(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    mutation signup($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {\n  signup(\n    mail: $mail\n    password: $password\n    firstName: $firstName\n    lastName: $lastName\n  ) {\n    accessToken\n  }\n}\n    "], ["\n    mutation signup($mail: String!, $password: String!, $firstName: String!, $lastName: String!) {\n  signup(\n    mail: $mail\n    password: $password\n    firstName: $firstName\n    lastName: $lastName\n  ) {\n    accessToken\n  }\n}\n    "])));
function useSignup(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.SignupDocument, options);
}
exports.useSignup = useSignup;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18;
