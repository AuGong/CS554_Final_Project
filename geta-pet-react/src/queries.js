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

const UPLOAD_LIKE = gql`
  mutation uploadLike($symbol: String, $userId: String, $petId: String) {
    updateLike(symbol: $symbol, userId: $userId, petId: $petId)
  }
`;


let exported = {
  GET_PET_LIST,
  UPLOAD_LIKE,
};

export default exported;
