import { gql } from "@apollo/client";

export const BILL = gql`
  query Bill($id: ID!) {
    bill(id: $id) {
      id
      status
      sum
      tip
      total
      created_at
      updated_at
      products {
        id
        name
        description
        active
        featured
        price
        sort_order
        created_at
        updated_at
      }
      orderedProducts {
        id
        status
        created_at
        updated_at
      }
    }
  }
`;
