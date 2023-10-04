import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql/dist/utils";

import { BookResolver } from "./resolvers/book.resolver";
import { AuthorResolver } from "./resolvers/author.resolver";

const logger = console;

export async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [BookResolver, AuthorResolver] }),
    logger,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  return app;
}
