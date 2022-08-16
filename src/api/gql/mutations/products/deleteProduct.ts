import { gql } from '@apollo/client';

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      user {
        products {
          id
          name
          description
          active
          price
          sort_order
        }
      }
    }
  }
`;
