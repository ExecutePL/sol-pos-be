import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String
    $active: Boolean
    $price: String
  ) {
    createProduct(
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
