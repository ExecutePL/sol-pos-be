import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $walletId: String!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      wallet_address: $walletId
    )
  }
`;
