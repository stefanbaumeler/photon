import { gql } from 'apollo-server-express'

export default gql`
    type ImageMeta {
        width: Int
        height: Int
        cameraMake: String
        cameraModel: String
        flash: Int
        fNumber: Float
        iso: Int
    }

    type VideoMeta {
        width: Int
        height: Int
        duration: Int
    }

    union Meta = VideoMeta | ImageMeta

    type Medium {
        dateCreated: String
        dateModified: String
        dateModifiedStatus: String
        dateTaken: String
        id: ID!
        filenameDisk: String
        filenameDownload: String
        title: String
        description: String
        lat: Float
        lng: Float
        status: String
        mimetype: String
        meta: Meta
        owner: User
        uploader: User
        hash: String
    }

    type Query {
        media(status: String): [Medium]
        medium(id: ID!): Medium
    }

    type Mutation {
        deleteMedia(ids: [ID]!): [ID]
        rotate(id: ID!): Medium
        setMediaStatus(media: [ID]!, status: String): [Medium]
        upload(file: [Upload]!): [File]!
        emptyTrash: [ID]
    }
`
