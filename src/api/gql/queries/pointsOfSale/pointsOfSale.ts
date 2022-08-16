import { gql } from "@apollo/client";

export const POINTS_OF_SALE = gql`
  query PointsOfSale($first: Int! = 20, $page: Int = 1) {
    pointsOfSale(first: $first, page: $page) {
      data {
        id
        name
        status
        created_at
        updated_at
        # user
        # bills
      }
    }
  }
`;
