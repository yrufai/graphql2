import { GraphQLServer } from "graphql-yoga";

const users = [
  {
    id: "1",
    name: "rufai",
    email: "yrufai23@gmail.com",
    age: 89,
    sex: "male"
  },
  {
    id: "2",
    name: "amin",
    email: "moamin1234@gmail.com",
    sex: "male"
  },
  {
    id: "3",
    name: "emeline",
    email: "alayoemeline@gmail.com",
    sex: "famale"
  }
];
const posts = [
  {
    id: 101,
    title: "game of thrones",
    body: "daring to play to game of thrones",
    published: true,
    author: "1"
  },
  {
    id: 102,
    title: "Graphql 101",
    body: "This is how to use graphql",
    published: false,
    author: "1"
  },
  {
    id: 103,
    title: "Graphql Basics",
    body: "This is an advance Graphql",
    published: true,
    author: "2"
  }
];
const typeDefs = `
    type Query {
        users(query:String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }
    type User{
      id:ID!
      name: String!
      email: String!
      age: Int
      sex: String!
      posts: [Post!]!
    }
    type Post{
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
    }

`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
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
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author == parent.id;
      });
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
