import { gql } from "@apollo/client";

const GET_PET_LIST = gql`
  query getPetList($pageNum: Int!, $petType: String!, $location: String) {
    petList(pageNum: $pageNum, petType: $petType, location: $location) {
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
    }
  }
`;

let exported = {
  GET_PET_LIST,
};

export default exported;
