export {}
// import gql from 'graphql-tag'
//
// export default gql`
//     type ImageMeta {
//         width: Int
//         height: Int
//         cameraMake: String
//         cameraModel: String
//         flash: Int
//         fNumber: Float
//         iso: Int
//         focalLength: String
//     }
//
//     type VideoMeta {
//         width: Int
//         height: Int
//         duration: Int
//     }
//
//     union Meta = VideoMeta | ImageMeta
//
//     type Tag {
//         id: ID!
//         label: String!
//         source: String!
//         idUser: String!
//     }
//
//     type Medium {
//         id: ID!
//         dateCreated: Date
//         dateModified: Date
//         dateModifiedStatus: Date
//         dateTaken: Date
//         filenameDisk: String
//         filenameDownload: String
//         title: String
//         description: String
//         location: [Float]
//         status: String
//         mimetype: String
//         meta: Meta
//         owner: User
//         uploader: User
//         hash: String
//         favoredBy: [User]
//         tags: [Tag]
//         country: String
//         region: String
//         place: String
//         address: String
//     }
//
//     type YearCountMonth {
//         month: Int!
//         count: Int!
//     }
//
//     type YearCountEntry {
//         year: Int!
//         count: Int!
//         months: [YearCountMonth!]!
//     }
//
//     type YearCountResult {
//         years: [YearCountEntry!]!
//         count: Int!
//     }
//
//     type Count {
//         count: Int!
//     }
//
//     type Download {
//         url: String!
//     }
//
//     type Query {
//         media(status: String, sort: String, album: String, favorites: Boolean, q: String): [Medium!] @auth
//         medium(id: ID!): Medium @auth
//         mediaCountByYear: YearCountResult! @auth
//         download(media: [ID!]!): Download! @auth
//     }
//
//     type Mutation {
//         deleteMedia(ids: [ID!]!): [Medium!]! @auth
//         rotate(id: ID!): Medium @auth
//         setMediaStatus(media: [ID!]!, status: String!): [Medium!]! @auth
//         upload(files: [Upload!]!): [Medium!]! @auth
//         emptyTrash: [Medium!]! @auth
//         updateMedium(id: ID!, description: String): Medium! @auth
//     }
// `
