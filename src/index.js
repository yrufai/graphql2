import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
        id:ID!,
        name: String!,
        age: Int!,
        employed: Boolean!,
        gpa: Float
    }

`;

const resolvers = {
  Query: {
    id() {
      return "abcd123";
    },
    name() {
      return "Rufai";
    },
    age() {
      return 58;
    },
    employed() {
      return true;
    },
    gpa() {
      return null;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("the server is up and doing");
});
