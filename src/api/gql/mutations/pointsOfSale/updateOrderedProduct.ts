import { gql } from '@apollo/client';

export const UPDATE_ORDERED_PRODUCTS = gql`
  mutation UpdateOrderedProduct($id: ID!, $status: Int) {
    updateOrderedProduct(id: $id, status: $status ) {
      id
      status
    }
  }
`;
