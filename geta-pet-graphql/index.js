import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import redis from "redis";
import { v4 as uuidv4 } from 'uuid';
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
    liked: Boolean
  }

  type Photo {
    small: String
    medium: String
    large: String
    full: String
  }

  type Organization {
    id: ID
    name: String
    address: [String]
    email: String
    phone: String
    website: String
    mission_statement: String
  }


  type Query {
    petList(pageNum: Int, petType: String, location: String, currentUserId: String): [Pet]
    orgList(pageNum: Int): [Organization]
  }

  type Mutation {
    postPet(
      name: String, 
      image: String, 
      breed: String, 
      age: Int, 
      description: String, 
      size: String, 
      gender: String, 
      contact: String
    ): Pet
    updateLike(
      symbol: String,
      userId: String,
      petId: String
    ): [String]
  }
`;

const resolvers = {
  Query: {
    petList: async (_, args) => {
      let pageNum = args.pageNum;
      let petType = args.petType;
      let location = args.location;
      let currentUserId = args.currentUserId;

      if (currentUserId) {
        let cachePetExists = await client.get(
          currentUserId + "page" + petType + pageNum
        );
        if (cachePetExists) {
          const petList = JSON.parse(cachePetExists);
          const likeList = await client.sMembers(currentUserId);
          for (let pet of petList) {
            if (likeList.indexOf(pet.id) > -1) pet.liked = true;
          }
          const jsonPetList = JSON.stringify(petList);
          await client.set(
            currentUserId + "page" + petType + pageNum,
            jsonPetList
          );
          return petList;
        } else {
          let petList = [];
          let apiResult = await petFinderClient.animal.search({
            type: petType,
            page: pageNum,
            location: location,
          });
          const likeList = await client.sMembers(currentUserId);
          apiResult.data.animals.forEach((animal) => {
            let checkResult = likeList.indexOf(animal.id) > -1;
            let copiedPet = {
              id: String(animal.id),
              name: animal.name,
              breed: animal.breeds.primary,
              age: animal.age,
              gender: animal.gender,
              size: animal.size,
              description: animal.description,
              contact: animal.contact.email,
              photos: animal.photos,
              liked: checkResult,
            };
            petList.push(copiedPet);
          });
          const jsonPetList = JSON.stringify(petList);
          await client.set(
            currentUserId + "page" + petType + pageNum,
            jsonPetList
          );
          return petList;
        }
      } else {
        let cachePetExists = await client.get("page" + petType + pageNum);
        if (cachePetExists) {
          const petList = JSON.parse(cachePetExists);
          const likeList = await client.sMembers(currentUserId)
          for (let pet of petList) {
            if (likeList.indexOf(pet.id) > -1) pet.liked = true;
          }
          const jsonPetList = JSON.stringify(petList);
          await client.set("page" + petType + pageNum, jsonPetList);
          return petList;
        } else {
          let petList = [];
          let apiResult = await petFinderClient.animal.search({
            type: petType,
            page: pageNum,
            location: location,
          });
          apiResult.data.animals.forEach((animal) => {
            let copiedPet = {
              id: String(animal.id),
              name: animal.name,
              breed: animal.breeds.primary,
              age: animal.age,
              gender: animal.gender,
              size: animal.size,
              description: animal.description,
              contact: animal.contact.email,
              photos: animal.photos,
              liked: false,
            };
            petList.push(copiedPet);
          });
          const jsonPetList = JSON.stringify(petList);
          await client.set("page" + petType + pageNum, jsonPetList);
          return petList;
        }
      }
    },
    async orgList(_, args) {
      let pageNum = args.pageNum;
      let orgs = [];
      let apiResult = await petFinderClient.organization.search({
        page: pageNum,
      });
      apiResult.data.organizations.forEach((organization) => {
        let orgCopy = {
          id: organization.id,
          name: organization.name,
          address: [
            organization.address1,
            organization.address2,
            organization.city,
            organization.state,
            organization.postcode,
            organization.country,
          ],
          email: organization.email,
          phone: organization.phone,
          website: organization.website,
          mission_statement: organization.mission_statement,
        };
        orgs.push(orgCopy);
      });
      return orgs;
    },
  },
  Mutation: {
    async postPet(_, args) {
      let newPhoto = {
        small: "",
        medium: "",
        large: "",
        full: args.image,
      };
      let pet = {
        id: uuidv4(),
        name: args.name,
        breed: args.type,
        description: args.description,
        age: args.age,
        size: args.size,
        gender: args.gender,
        contact: args.contact,
        photos: [newPhoto],
      };
      let stringPet = JSON.stringify(pet);
      client.hSet("userPosts", pet.id, stringPet);
    },
    updateLike: async (_, args) => {
      let symbol = args.symbol;
      let userId = args.userId;
      let petId = String(args.petId);
      if (symbol === "LIKE") {
        await client.sAdd(userId, petId);
      } else if (symbol === "UNLIKE") {
        await client.sRem(userId, petId);
      }
      return await client.sMembers(userId);
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