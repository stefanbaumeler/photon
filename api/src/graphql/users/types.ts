export {}
// import gql from 'graphql-tag'
//
// export default gql`
//     type User {
//         id: ID!
//         dateCreated: Date
//         dateModified: Date
//         mail: String
//         firstName: String
//         lastName: String
//         favorites: [Medium]
//         language: String
//     }
//
//     type Token {
//         accessToken: String!
//         refreshToken: String!
//         user: User
//     }
//
//     type Query {
//         users: [User!]! @auth
//         user(id: ID!): User! @auth
//         profile: User! @auth
//     }
//
//     type Mutation {
//         signIn(mail: String!, password: String!): Token
//         signOut: Boolean
//         signUp(mail: String!, password: String!, firstName: String!, lastName: String!, language: String!): Token
//         changeLanguage(language: String!): User!
//     }
// `
