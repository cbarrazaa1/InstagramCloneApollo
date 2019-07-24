import {gql} from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    viewer: User
  }

  type Mutation {
    user_sign_up(username: String!, password: String!): User!
    user_login(username: String!, password: String!): User!
  }
`;
