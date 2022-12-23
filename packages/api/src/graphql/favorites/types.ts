import gql from 'graphql-tag'

export default gql`
    type Favorite {
        id: ID!
        medium: Medium
        user: User
    }

    type Query {
        favorites: [Medium!]! @auth
    }

    type Mutation {
        addToFavorites(media: [ID!]!): [Favorite!]! @auth
        removeFromFavorites(media: [ID!]!): Count @auth
    }
`
