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

  type PetAndTotal {
    petList: [Pet]
    totalPage: Int
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
    petListAndTotal(pageNum: Int, petType: String, location: String, currentUserId: String): PetAndTotal
    getLikes(userId: String): [Pet]
    getPostPets(userId: String): [Pet]
    orgList: [Organization]
  }

  type Mutation {
    postPet(
      userId: String!
      name: String!
      image: String!
      breed: String!
      age: String!
      description: String!
      size: String! 
      gender: String!
      contact: String!
    ): Pet
    deletePet(
      userId: String
      petId: String
    ): Pet
    updateLike(
      symbol: String
      userId: String
      petId: String
    ): [String]
  }
`;

const resolvers = {
  Query: {
    petListAndTotal: async (_, args) => {
      let pageNum = args.pageNum;
      let petType = args.petType;
      let location = args.location;
      let currentUserId = args.currentUserId;

      if (location) {
        if (currentUserId) {
          let cachePetExists = await client.get(
            currentUserId + "page" + location + petType + pageNum
          );
          if (cachePetExists) {
            const petAndTotal = JSON.parse(cachePetExists);
            const petList = petAndTotal.petList;
            const totalPage = petAndTotal.totalPage;
            const likeList = await client.sMembers(currentUserId);
            for (let pet of petList) {
              pet.liked = false;
            }
            for (let pet of petList) {
              for (let item of likeList) {
                if (String(item) == String(pet.id)) pet.liked = true;
              }
            }
            const newPetAndTotal = {
              petList: petList,
              totalPage: totalPage,
            };
            const jsonNewPetAndTotal = JSON.stringify(newPetAndTotal);
            await client.set(
              currentUserId + "page" + location + petType + pageNum,
              jsonNewPetAndTotal
            );
            return newPetAndTotal;
          } else {
            let petList = [];
            let apiResult = await petFinderClient.animal.search({
              type: petType,
              page: pageNum,
              location: location,
            });
            const likeList = await client.sMembers(currentUserId);
            let totalPage = apiResult.data.pagination["total_pages"];
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
            const petAndTotal = { petList: petList, totalPage: totalPage };
            const jsonPetAndTotal = JSON.stringify(petAndTotal);
            await client.set(
              currentUserId + "page" + location + petType + pageNum,
              jsonPetAndTotal
            );
            return petAndTotal;
          }
        } else {
          let cachePetExists = await client.get(
            "page" + location + petType + pageNum
          );
          if (cachePetExists) {
            const petAndTotal = JSON.parse(cachePetExists);
            return petAndTotal;
          } else {
            let petList = [];
            let apiResult = await petFinderClient.animal.search({
              type: petType,
              page: pageNum,
              location: location,
            });
            let totalPage = apiResult.data.pagination["total_pages"];
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
            const petAndTotal = { petList: petList, totalPage: totalPage };
            const jsonPetAndTotal = JSON.stringify(petAndTotal);
            await client.set(
              "page" + location + petType + pageNum,
              jsonPetAndTotal
            );
            return petAndTotal;
          }
        }
      } else {
        if (currentUserId) {
          let cachePetExists = await client.get(
            currentUserId + "page" + petType + pageNum
          );
          if (cachePetExists) {
            const petAndTotal = JSON.parse(cachePetExists);
            const petList = petAndTotal.petList;
            const totalPage = petAndTotal.totalPage;
            const likeList = await client.sMembers(currentUserId);
            for (let pet of petList) {
              pet.liked = false;
            }
            for (let pet of petList) {
              for (let item of likeList) {
                if (String(item) == String(pet.id)) pet.liked = true;
              }
            }
            const newPetAndTotal = {
              petList: petList,
              totalPage: totalPage,
            };
            const jsonNewPetAndTotal = JSON.stringify(newPetAndTotal);
            await client.set(
              currentUserId + "page" + petType + pageNum,
              jsonNewPetAndTotal
            );
            return newPetAndTotal;
          } else {
            let petList = [];
            let apiResult = await petFinderClient.animal.search({
              type: petType,
              page: pageNum,
              location: null,
            });
            const likeList = await client.sMembers(currentUserId);
            let totalPage = apiResult.data.pagination["total_pages"];
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
            const petAndTotal = { petList: petList, totalPage: totalPage };
            const jsonPetAndTotal = JSON.stringify(petAndTotal);
            await client.set(
              currentUserId + "page" + petType + pageNum,
              jsonPetAndTotal
            );
            return petAndTotal;
          }
        } else {
          let cachePetExists = await client.get("page" + petType + pageNum);
          if (cachePetExists) {
            const petAndTotal = JSON.parse(cachePetExists);
            return petAndTotal;
          } else {
            let petList = [];
            let apiResult = await petFinderClient.animal.search({
              type: petType,
              page: pageNum,
              location: null,
            });
            let totalPage = apiResult.data.pagination["total_pages"];
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
            const petAndTotal = { petList: petList, totalPage: totalPage };
            const jsonPetAndTotal = JSON.stringify(petAndTotal);
            await client.set("page" + petType + pageNum, jsonPetAndTotal);
            return petAndTotal;
          }
        }
      }
    
    },
    getLikes: async (_, args) => {
      let userId = args.userId;
      const petIds = await client.sMembers(userId);
      let petList = [];
      for (let petId of petIds) {
        let apiResult = await petFinderClient.animal.show(petId);
        let animal = apiResult.data.animal;
        let checkResult = petIds.indexOf(String(animal.id)) > -1;
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
      }
      return petList;
    },
    getPostPets: async (_, args) => {
      let userId = args.userId;
      const jsonPets = await client.sMembers("userPosts" + userId);
      let postPets = [];
      for (let jsonPet of jsonPets) {
        const pet = JSON.parse(jsonPet);
        postPets.push(pet);
      }
      return postPets;
    },
    async orgList() {
      let orgs = [];
      let apiResult = await petFinderClient.organization.search();
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
    postPet: async (_, args) => {
      let userId = args.userId;

      if (
        args.name.trim().length === 0 ||
        args.breed.trim().length === 0 ||
        args.description.trim().length === 0 ||
        args.age.trim().length === 0 ||
        args.image.trim().length === 0 ||
        args.size.trim().length === 0 ||
        args.gender.trim().length === 0 ||
        args.contact.trim().length === 0
      ) {
        throw "Input item cannot be empty";
      }
        
      let newPhoto = {
        small: "",
        medium: "",
        large: "",
        full: args.image,
      };
      let newPet = {
        id: uuidv4(),
        name: args.name,
        breed: args.breed,
        description: args.description,
        age: args.age,
        size: args.size,
        gender: args.gender,
        contact: args.contact,
        photos: [newPhoto],
        liked: false,
      };
      let jsonNewPet = JSON.stringify(newPet);
      client.sAdd("userPosts" + userId, jsonNewPet);
      return newPet;
    },
    deletePet: async (_, args) => {
      let userId = args.userId;
      let petId = args.petId;
      const jsonPets = await client.sMembers("userPosts" + userId);
      for (let jsonPet of jsonPets) {
        const pet = JSON.parse(jsonPet);
        if (petId === pet.id) {
          await client.sRem("userPosts" + userId, jsonPet);
          return pet;
        }
      }
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

async function handleApolloServer() {
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

  console.log(`????  Server ready at: ${url}`);
}

handleApolloServer();
