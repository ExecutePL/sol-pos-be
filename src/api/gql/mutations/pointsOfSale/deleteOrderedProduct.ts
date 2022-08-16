import { gql } from "@apollo/client";

export const DELETE_ORDERED_PRODUCT = gql`
  mutation DeleteOrderedProduct($id: ID!) {
    deleteOrderedProduct(id: $id) {
      id
    }
  }
`;
