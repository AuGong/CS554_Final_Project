import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';


const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type PetPost {
    id: ID!
    image: String!
    name: String
    species: String
    description: String!
    address: String!
    userPosted: Boolean!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    petPosts(pageNum: Int): [PetPost]
    userPostedImages: [PetPost]
  }

  type Mutation {
    uploadPetPost(image: String!, name: String, species: String, description: String, address: String, posterName: String): PetPost
    deletePetPost(id: ID!): PetPost
  }
`;


const resolvers = {
    Query: {
      async petPosts(parent, args, context, info) {
        return await getUnsplash(args.pageNum);
      },
      async binnedImages(){
        return await getCache();
      },
      async userPostedImages(){
        return await getUserPosted();
      }
    },
    Mutation: {
        async uploadPetPost(parent, args, context, info) {
            return await upload(args.image, args.name, args.species, args.description, args.address, args.posterName);
        },
        async deletePetPost(parent, args, context, info){
            return await imageDelete(args.id);
        }
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);