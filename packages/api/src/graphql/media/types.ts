import gql from 'graphql-tag'

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
        id: ID!
        dateCreated: Date
        dateModified: Date
        dateModifiedStatus: Date
        dateTaken: Date
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
        media(status: String): [Medium!] @auth
        medium(id: ID!): Medium! @auth
    }

    type Count {
        count: Int
    }

    type Mutation {
        deleteMedia(ids: [ID]!): [Medium!]! @auth
        rotate(id: ID!): Medium! @auth
        setMediaStatus(media: [ID]!, status: String): Count @auth
        upload(file: [Upload]!): [File]! @auth
        emptyTrash: [Medium!]! @auth
    }
`
