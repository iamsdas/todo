import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Post {
    title: String
    content: String
  }
  type Query {
    getPosts(userId: String): [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: (_, { userId }, __, ___) => ({
      posts: [null],
    }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
