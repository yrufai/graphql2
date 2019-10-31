import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

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
    id: "101",
    title: "game of thrones",
    body: "daring to play to game of thrones",
    published: true,
    author: "1"
  },
  {
    id: "102",
    title: "Graphql 101",
    body: "This is how to use graphql",
    published: false,
    author: "1"
  },
  {
    id: "103",
    title: "Graphql Basics",
    body: "This is an advance Graphql",
    published: true,
    author: "2"
  }
];

const comments = [
  {
    id: "101",
    body: "really, then its nice",
    author: "1"
  },
  {
    id: "102",
    body: "really, then its nice",
    author: "3"
  },
  {
    id: "101",
    body: "ok then i have to do this on my own",
    author: "2"
  },
  {
    id: "103",
    body: "graphql is really fun to learn",
    author: "1"
  }
];
const typeDefs = `
    type Query {
        users(query:String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type Mutation{
      createUser(data: CreateUserInput): User!
      createPost(data: CreatePostInput): Post!
      createComment(data: CreateCommentInput): Comment!
    }

    input CreateUserInput{
      name: String!
      email:String!
      age: Int
    }

    input CreatePostInput{
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput {
      body: String!
      author: ID!
      post: ID!
    }
    
    type User{
      id:ID!
      name: String!
      email: String!
      age: Int
      sex: String!
      posts: [Post!]!
      comments: [Comment!]!
    }
    type Post{
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments: [Comment!]!
    }
    type Comment{
      id: ID!
      body: String!
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
    comments(parent, args, ctx, info) {
      return comments;
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

  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => {
        return user.email === args.data.email;
      });
      if (emailTaken) {
        throw new Error("Email already exist");
      }
      const user = {
        id: uuidv4(),
        ...args.data
      };
      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExist = users.some(user => user.id === args.data.author);
      if (!userExist) {
        throw new Error("User not Found");
      }
      const post = {
        id: uuidv4(),
        ...args.data
      };
      posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExist = users.some(user => user.id === args.data.author);
      const postExist = posts.some(
        post => post.id === args.data.post && post.published
      );
      if (!userExist || !postExist) {
        throw new Error("Unable ot find user or post");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(comment);
      return comment;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.id === parent.id;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
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
