import { gql } from '@apollo/client';

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $active: Boolean
    $price: String
  ) {
    updateProduct(
      id: $id
      input: {
        name: $name
        description: $description
        active: $active
        price: $price
      }
    ) {
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
