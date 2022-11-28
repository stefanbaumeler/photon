import { gql } from 'apollo-server-express'

export default gql`
    type User {
        id: ID!
        dateCreated: String!
        dateModified: String!
        mail: String!
        password: String!
        firstName: String!
        lastName: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
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
