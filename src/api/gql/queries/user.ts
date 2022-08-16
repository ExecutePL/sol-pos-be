import { gql } from "@apollo/client";

export const USER = gql`
  query User {
    me {
      id
      name
      email
      email_verified_at
      wallet_address
      password
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
      pointsOfSale {
        id
        name
        status
        created_at
        updated_at
      }
      workers {
        id
        name
        remember_token
        created_at
        updated_at
      }
      bills {
        id
        status
        sum
        tip
        total
        created_at
        updated_at
        pointOfSale {
          id
          name
        }
        orderedProducts {
          id
          status
          product {
            id
            name
            price
          }
        }
      }
    }
  }
`;
