import gql from 'graphql-tag'

export default gql`
    type Album {
        id: ID!
        dateCreated: Date
        dateModified: Date
        title: String
        description: String
        cover: Medium
        owner: User
        media: [Medium]
    }

    input AlbumInput {
        id: ID
        title: String
        description: String
        cover: ID
    }

    type Query {
        albums(idMedium: ID): [Album!]! @auth
        album(id: ID!): Album @auth
        albumMedia(id: ID!): [Medium!]! @auth
    }

    type Mutation {
        deleteAlbum(ids: [ID]!): Count @auth
        addToAlbum(idAlbum: ID!, media: [ID!]!): [Medium!]! @auth
        removeFromAlbum(idAlbum: ID!, media: [ID!]!): Album @auth
        updateAlbum(idAlbum: ID!, fields: AlbumInput!): Album @auth
        createAlbum(album: AlbumInput, media: [ID]): Album @auth
    }
`
