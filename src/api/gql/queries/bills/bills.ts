import { gql } from "@apollo/client";

export const BILLS = gql`
  query Bills($first: Int! = 20, $page: Int = 1) {
    bills(first: $first, page: $page) {
      data {
        id
        status
        sum
        createdAt: created_at
        worker {
          id
          name
        }
        pointOfSale {
          id
          name
        }
      }
    }
  }
`;
