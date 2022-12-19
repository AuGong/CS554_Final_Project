import { gql } from "@apollo/client";

const GET_PET_LIST = gql`
  query getPetList(
    $pageNum: Int!
    $petType: String!
    $location: String
    $currentUserId: String
  ) {
    petList(
      pageNum: $pageNum
      petType: $petType
      location: $location
      currentUserId: $currentUserId
    ) {
      id
      name
      breed
      age
      gender
      size
      description
      contact
      photos {
        small
        medium
        large
        full
      }
      liked
    }
  }
`;

const GET_POST_PETS = gql`
  query postPets(
    $userId: String!
  ){
    getPostPets(userId: $userId){
      id
      name
      breed
      age
      gender
      size
      description
      contact
      photos {
        small
        medium
        large
        full
      }
      liked
    }
  }
  `;
  const GET_LIKE_LIST = gql`
  query likeList(
    $userId: String!
  ){
    getLikes(userId: $userId){
      id
      name
      breed
      age
      gender
      size
      description
      contact
      photos {
        small
        medium
        large
        full
      }
      liked
    }
  }
  `;

const UPLOAD_LIKE = gql`
  mutation uploadLike($symbol: String, $userId: String, $petId: String) {
    updateLike(symbol: $symbol, userId: $userId, petId: $petId)
  }
`;
const POST_PET = gql`
  mutation petPost($image: String, $name: String, $breed:String, $description: String, $age:Int, $size:String, $gender:String, $contact:String){
    postPet(image: $image, name:$name, breed: $breed, description:$description, age:$age, size:$size, gender:$gender, contact:$contact)
  }
`;


let exported = {
  GET_PET_LIST,
  UPLOAD_LIKE,
  POST_PET,
  GET_POST_PETS,
  GET_LIKE_LIST,
};

export default exported;
