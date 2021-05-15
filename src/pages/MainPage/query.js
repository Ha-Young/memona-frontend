import { gql } from "@apollo/client";

export const ONLOAD_QUERY = gql`
  query Query($latitude: Float, $longitude: Float, $page: Int!, $limit: Int!, $area: String, $year: String, $season: String) {
    myArea(lat: $latitude, lng: $longitude) {
      name
    }
    posts(page: $page, limit: $limit, area: $area, lat: $latitude, lng: $longitude, year: $year, season: $season) {
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
