import { gql } from "@apollo/client";

export const CREATE_WAITER = gql`
  mutation CreateWorker($name: String!) {
    createWorker(input: { name: $name }) {
      id
      name
      remember_token
    }
  }
`;
