import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import redis from "redis";
const client = redis.createClient();
client.connect().then(() => {});

import petfinder from "@petfinder/petfinder-js";
const petFinderClient = new petfinder.Client({
  apiKey: "IHCz0sEfpuHGbKLss4W3XqyWGDI1kZIUat7NHszEHCv4UXWNll",
  secret: "OnfIqHoiNeH9QNPsKZQxmLCHAvLNKtVRahWqo9vJ",
});

//Create the type definitions for the query and our data
const typeDefs = `
  type Pet {
    id: ID!
    name: String
    breed: String
    age: String
    gender: String
    size: String
    description: String
    contact: String
    photos: [Photo]
  }

  type Photo{
    small: String
    medium: String
    large: String
    full: String
  }

  type Query {
    petList(pageNum: Int, petType: String, location: String): [Pet]
  }
`;

const resolvers = {
  Query: {
    petList: async (_, args) => {
      let pageNum = args.pageNum;
      let petType = args.petType;
      let location = args.location;
      let petList = [];
      let apiResult = await petFinderClient.animal.search({
        type: petType,
        page: pageNum,
        location, location,
        limit: 100,
      });
      apiResult.data.animals.forEach((animal) => {
        let copiedPet = {
          id: animal.id,
          name: animal.name,
          breed: animal.breeds.primary,
          age: animal.age,
          gender: animal.gender,
          size: animal.size,
          description: animal.description,
          contact: animal.contact.email,
          photos: animal.photos,
        };
        petList.push(copiedPet);
      });
      return petList;
    },
  },
};

const server = new ApolloServer({
  cors: {
    origin: "*", // allow request from all domains
    credentials: true, // enable CORS response for requests with credentials (cookies, http authentication)
  },
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
