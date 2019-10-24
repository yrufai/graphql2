import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
        greeting(name: String!, position: String!): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        post: Post!
    }
    type User{
      id:ID!
      name: String!
      email: String!
      age: Int
    }
    type Post{
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      sex: String!
    }

`;

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}, you are my dhopest ${args.position}`;
      } else {
        return "Hello";
      }
    },
    add(parent, args, ctx, info) {
      if (args.numbers.length == 0) {
        return 0;
      }
      return args.numbers.reduce((acc, cvalue) => {
        return acc + cvalue;
      });
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 93];
    },
    me() {
      return {
        id: "23456897cdcd",
        name: "mr snaps",
        email: "yrufai23@gmail.com"
      };
    },
    post() {
      return {
        id: "987654321",
        title: "the Game of Thrones",
        body: "hey guys i hope all the kings and queens are doing well",
        published: false,
        sex: "Male"
      };
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
