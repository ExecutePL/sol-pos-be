import { gql } from '@apollo/client';

export const WAITERS = gql`
  query Workers($first: Int! = 20, $page: Int = 1) {
    workers(first: $first, page: $page) {
      data {
        id
        name
      }
    }
  }
`;
