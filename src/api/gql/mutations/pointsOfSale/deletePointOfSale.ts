import { gql } from "@apollo/client";

export const DELETE_POINT_OF_SALE = gql`
  mutation DeletePointOfSale($id: ID!) {
    deletePointOfSale(id: $id) {
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
