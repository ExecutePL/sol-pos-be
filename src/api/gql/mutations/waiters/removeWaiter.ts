import { gql } from '@apollo/client';

export const REMOVE_WAITER = gql`
  mutation DeleteWorker($id: ID!) {
    deleteWorker(id: $id) {
        id
        name
        remember_token
        created_at
        updated_at
    }
  }
`;
