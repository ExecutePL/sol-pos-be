import { gql } from "@apollo/client";

export const CREATE_POINT_OF_SALE = gql`
  mutation CreatePointOfSale($name: String!, $userId: ID) {
    createPointOfSale(input: { name: $name, user: { connect: $userId } }) {
      id
      name
      status
      created_at
      updated_at
      # user
      # bills
    }
  }
`;
