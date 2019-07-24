/**
 * @flow
 */
'use strict';
import {ApolloServer, gql} from 'apollo-server-express';
import express, {type $Response, type $Request} from 'express';
import playground from 'graphql-playground-middleware-express';
import {typeDefs} from './schemas/graphql-schema';
import {resolvers} from './resolvers/index';
import mongoose from 'mongoose';
import EntUser from './schemas/EntUserSchema';
import AuthToken from './auth/AuthToken';
import type {ViewerContext} from './types/ViewerContext';
require('dotenv').config();

const run = async (): Promise<void> => {
  const app = express();
  const MONGO_DB = process.env.DB_HOST ?? '';
  mongoose.connect(MONGO_DB, {useNewUrlParser: true});
  mongoose.connection.once(
    'open',
    (): void => console.log('Connected to mongo.')
  );
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}): Promise<ViewerContext> => {
      const authToken = req.headers.authorization;
      let user = await EntUser.genFromToken(authToken);
      if (user != null && !AuthToken.verify(user)) {
        user = null;
      }

      return {currentUser: user};
    },
    engine: {
      apiKey: process.env.ENGINE_API_KEY,
    },
  });
  server.applyMiddleware({app});

  app.get(
    '/',
    (request: $Request, response: $Response): mixed =>
      response.end('Welcome to the API.')
  );
  app.get('/playground', playground({endpoint: '/graphql'}));
  app.listen(
    {port: 4000},
    (): void =>
      console.log(
        `GraphQL server running @http://localhost:4000${
          server.graphqlPath
        }`
      )
  );
};

run();
