import gql from 'graphql-tag'

export default gql`
    type Album {
        id: ID!
        title: String
        description: String
        cover: Medium
        owner: User
    }

    input AlbumInput {
        id: ID
        title: String
        description: String
    }

    type Query {
        albums: [Album!]! @auth
        album(id: ID!): Album @auth
        albumMedia(id: ID!): [Medium!]! @auth
    }

    type Mutation {
        deleteAlbum(ids: [ID]!): Count @auth
        addToAlbum(idAlbum: ID!, media: [ID!]!): [Medium!]! @auth
        removeFromAlbum(idAlbum: ID!, media: [ID!]!): Album @auth
        updateAlbumTitle(id: ID!, title: String!): Album @auth
        createAlbum(album: AlbumInput, media: [ID]): Album @auth
        setAlbumCover(idAlbum: ID!, idMedium: ID!): Album @auth
    }
`
