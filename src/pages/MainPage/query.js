import { gql } from "@apollo/client";

export const ONLOAD_QUERY = gql`
  query Query($filter: String, $latitude: Float, $longitude: Float, $page: Int, $limit: Int, $area: String, $year: String, $season: String) {
    myArea(lat: $latitude, lng: $longitude) {
      name
    }
    posts(filter: $filter, page: $page, limit: $limit, area: $area, lat: $latitude, lng: $longitude, year: $year, season: $season) {
      docs {
        _id
        author {
          username
          email
        }
        content
        postImageUrl
        isAnonymous
        area
      }
      nextPage
      hasNextPage
    }
    loginUser {
      _id
      username
      imageUrl
      friends {
        _id
        username
        imageUrl
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation Mutation($createPostInput: PostInput!, $file: Upload) {
    createPost(input: $createPostInput, file: $file) {
      _id
    }
  }
`;
