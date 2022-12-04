import { gql } from "apollo-server-azure-functions";
export const typeDefs = gql`
    type Query {
        user(id: String!): User
        observation(id: String!): Observation
    }

    type User {
        id: String
        firstName: String
        lastName: String
        age: Int
        email: String
        birthday: String
        password: String
        username: String
        observations: [Observation]
    }

    type Observation {
        obvId: String
        patientId: String
        weight: Int
        insulinLevel: String
        bloodSugar: String
        date: String
        time: String
    }

    input CreateUserInput {
        id: String!
        username: String!
        firstName: String!
        lastName: String!
        birthday: String!
        password: String!
        age: Int!
    }

    type CreateUserPayload {
        user: User!
    }

    type Mutation { 
        createUser(input: CreateUserInput!): CreateUserPayload
    }
`;

