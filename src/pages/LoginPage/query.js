import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginMutation(
    $type: String
    $token: String
    $email: String
    $password: String
  ) {
    login(
      type: $type
      token: $token
      email: $email
      password: $password
    )
  }
`;
