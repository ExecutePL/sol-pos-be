import { gql } from "@apollo/client";

export const ORDERED_PRODUCTS = gql`
  query OrderedProducts($id: ID!) {
    pointOfSale(id: $id) {
      id
      name
      status
      created_at
      updated_at
      bills {
        id
        status
        orderedProducts{
          product{
            id
            name
          }
        }
      }
    }
  }
  `;
