import { gql } from 'apollo-server-express'

export default gql`
    type Album {
        id: ID
        title: String
        description: String
        idMedium: ID
    }

    input AlbumInput {
        id: ID
        title: String
        description: String
        idMedium: ID
    }

    type Query {
        albums: [Album]
        album(id: ID): [Album]
        albumMedia(id: ID): [Medium]
    }

    type Mutation {
        deleteAlbum(ids: [ID]): String
        addToAlbum(idAlbum: ID, media: [ID]): [ID]
        removeFromAlbum(idAlbum: ID, media: [ID]): [ID]
        updateAlbumTitle(id: ID, title: String): ID
        createAlbum(album: AlbumInput, media: [ID]): ID
    }
`
