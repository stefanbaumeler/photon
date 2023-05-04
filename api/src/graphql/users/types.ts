import gql from 'graphql-tag'

export default gql`
    type User {
        id: ID!
        dateCreated: Date
        dateModified: Date
        mail: String
        password: String
        firstName: String
        lastName: String
        favorites: [Medium]
    }

    type Query {
        users: [User!]! @auth
        user(id: ID!): User! @auth
    }

    type Token {
        accessToken: String!
        refreshToken: String!
    }

    type Mutation {
        signIn(mail: String!, password: String!): Token
        signOut: Boolean
        signUp(mail: String!, password: String!, firstName: String!, lastName: String!): Token
    }
`
