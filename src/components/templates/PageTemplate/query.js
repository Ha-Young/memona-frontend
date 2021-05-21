import { gql } from "@apollo/client";

export const CREATE_POST = gql`
mutation Mutation($createPostInput: PostInput!, $file: Upload) {
  createPost(input: $createPostInput, file: $file) {
    _id
  }
}
`;
