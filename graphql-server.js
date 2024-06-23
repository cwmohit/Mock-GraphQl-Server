const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// Define your type definitions (schema)
const typeDefs = gql`
  type Post {
    id: ID!
    content: String
    date: String
    featuredImage: FeaturedImage
    author: Author
    slug: String
    categories: [Category]
    title: String
    excerpt: String
  }

  type FeaturedImage {
    node: ImageNode
  }

  type ImageNode {
    mediaItemUrl: String
    mimeType: String
  }

  type Author {
    node: AuthorNode
  }

  type AuthorNode {
    avatar: Avatar
    firstName: String
    lastName: String
    name: String
  }

  type Avatar {
    url: String
    default: String
    foundAvatar: Boolean
  }

  type Category {
    name: String
    slug: String
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
    categories: [Category]
  }
`;

const baseURL = 'http://localhost:3004'

// Define your resolvers
const resolvers = {
  Query: {
    posts: async () => {
      const response = await axios.get(`${baseURL}/posts`);
      return response.data;
    },
    post: async (_, { id }) => {
      const response = await axios.get(`${baseURL}/posts/${id}`);
      return response.data;
    },
    categories: async () => {
      const response = await axios.get(`${baseURL}/categories`);
      return response.data;
    },
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});