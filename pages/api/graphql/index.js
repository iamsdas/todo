import { ApolloServer, gql } from 'apollo-server-micro';
import { prisma } from '../../../lib/prisma';

const typeDefs = gql`
  type Item {
    id: Int
    body: String
  }
  type List {
    id: Int
    title: String
    listItems: [Item]!
  }
  type Query {
    lists(email: String): [List]!
  }
  type Mutation {
    addList(email: String!, title: String): List
    addItem(id: Int!, body: String): Item
  }
`;

const resolvers = {
  Query: {
    lists: async (_, { email }, __, ___) => {
      const lists = await prisma.todoList.findMany({
        where: {
          userEmail: email,
        },
        include: {
          listItems: true,
        },
      });
      return lists;
    },
  },
  Mutation: {
    addList: async (_, { email, title }, __, ___) => {
      const list = await prisma.todoList.create({
        data: {
          userEmail: email,
          title: title,
          listItems: {
            create: [],
          },
        },
      });
      return list;
    },
    addItem: async (_, { id, body }, __, ___) => {
      const item = await prisma.listItem.create({
        select: {
          id: true,
          body: true,
        },
        data: {
          listId: id,
          body: body,
        },
      });
      return item;
    },
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
