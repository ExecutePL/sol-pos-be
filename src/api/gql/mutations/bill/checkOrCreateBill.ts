import { gql } from '@apollo/client';

export const CHECK_OR_CREATE_BILL = gql`
  mutation CheckOrCreateBill($posId: ID!) {
    checkOrCreateBill(pos_id: $posId) {
      id
      status
      sum
      tip
      total
      created_at
      updated_at
      products {
        id
        name
        description
        active
        featured
        price
        sort_order
        created_at
        updated_at
      }
      orderedProducts {
        id
        status
        created_at
        updated_at
      }
      user {
        id
        name
        email
        email_verified_at
        wallet_address
        password
        created_at
        updated_at
      }
      worker {
        id
        name
        remember_token
        created_at
        updated_at
      }
      pointOfSale {
        id
        name
        status
        created_at
        updated_at
      }
    }
  }
`;
