import { gql } from "@apollo/client";

export const LOGIN_USER_BY_WORKER = gql`
  mutation LoginUserByWorker($remember_token: String!) {
    loginUserByWorker(remember_token: $remember_token)
  }
`;
