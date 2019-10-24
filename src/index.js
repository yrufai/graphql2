import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }

     
`;

const resolvers = {
  Query: {
    title() {
      return "the War of Art";
    },
    price() {
      return 12.99;
    },
    releaseYear() {
      return null;
    },
    rating() {
      return 5;
    },
    inStock() {
      return true;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => {
  console.log("we are live on port 4000");
});
