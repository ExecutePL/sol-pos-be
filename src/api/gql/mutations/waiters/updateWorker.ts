import { gql } from '@apollo/client';

export const UPDATE_WAITER = gql`
  mutation UpdateWorker(
    $id: ID!
    $name: String
  ) {
    updateWorker(
      id: $id
      input: {
        name: $name
      }
    ) {
      id
      name
    }
  }
`;
