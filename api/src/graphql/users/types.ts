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
    }

    type Mutation {
        login(mail: String!, password: String!): Token
        signup(mail: String!, password: String!, firstName: String!, lastName: String!): Token
    }
`
