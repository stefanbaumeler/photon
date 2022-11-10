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
        id: ID
        filenameDisk: String
        filenameDownload: String
        title: String
        description: String
        lat: Float
        lng: Float
        status: String
        mimetype: String
        meta: Meta
    }

    type Query {
        media(status: String): [Medium]
        medium(id: ID): [Medium]
    }

    type Mutation {
        deleteMedia(ids: [ID]): String
        rotate(id: ID): ID
        setMediaStatus(media: [ID], status: String): [ID]
        upload(file: [Upload]!): [File]!
        emptyTrash: Boolean
    }
`
