import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query Products($first: Int! = 5, $page: Int = 1) {
    products(first: $first, page: $page) {
      data {
        id
        name
        description
        active
        price
        sort_order
      }
    }
  }
`;
