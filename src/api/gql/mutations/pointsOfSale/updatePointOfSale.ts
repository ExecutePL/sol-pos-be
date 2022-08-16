import { gql } from '@apollo/client';

export const UPDATE_POINT_OF_SALE = gql`
  mutation UpdatePointOfSale($id: ID!, $name: String, $status: Int) {
    updatePointOfSale(id: $id, input: { name: $name, status: $status }) {
      id
      name
      status
      created_at
      updated_at
      # user
      # bills
    }
  }
`;
