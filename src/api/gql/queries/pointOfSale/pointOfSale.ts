import { gql } from "@apollo/client";

export const POINT_OF_SALE = gql`
  query PointOfSale($id: ID!) {
    pointOfSale(id: $id) {
      id
      name
      status
      created_at
      updated_at
      bills {
        id
        status
        sum
        tip
        total
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
