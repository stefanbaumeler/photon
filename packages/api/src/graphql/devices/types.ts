import gql from 'graphql-tag'

export default gql`
    type Device {
        id: ID!
        dateCreated: Date!
        dateModified: Date!
        name: String!
        type: String!
    }

    type Query {
        devices: [Device!]! @auth
    }

    input DeviceInput {
        name: String!
        type: String!
    }

    type Mutation {
        register(device: DeviceInput!): Device! @auth
    }
`
