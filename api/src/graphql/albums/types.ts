import { gql } from 'apollo-server-express'

export default gql`
    type Album {
        id: ID!
        title: String
        description: String
        idMedium: ID
        owner: User
    }

    input AlbumInput {
        id: ID
        title: String
        description: String
        idMedium: ID
    }

    type Query {
        albums: [Album]
        album(id: ID!): Album
        albumMedia(id: ID!): [Medium]
    }

    type Mutation {
        deleteAlbum(ids: [ID]!): [Album]
        addToAlbum(idAlbum: ID!, media: [ID!]!): [Medium]
        removeFromAlbum(idAlbum: ID!, media: [ID!]!): Album
        updateAlbumTitle(id: ID!, title: String!): Album
        createAlbum(album: AlbumInput, media: [ID]): Album
        setAlbumCover(idAlbum: ID!, idMedium: ID!): Album
    }
`
