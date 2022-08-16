import { gql } from '@apollo/client';

export const CREATE_WAITER = gql`
  mutation CreateWorker(
    $name: String!
    $userId: ID
  ) {
    createWorker(
      input: {
        name: $name
        user: { connect: $userId }
      }
    ) {
       id
      name
    }
  }
`;
