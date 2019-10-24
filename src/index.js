import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
    type Query {
         greeting(name: String!, status: String!): String!
        add(a: Float!, b: Float): Float!
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
    }

`;

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}, you are my dhopest ${args.status}`;
      } else {
        return "Hello";
      }
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
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
