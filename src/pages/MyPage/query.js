import { gql } from "@apollo/client";

export const MY_POSTS_QUERY = gql`
  query Query($page: Int, $limit: Int, $latitude: Float, $longitude: Float) {
  myArea(lat: $latitude, lng: $longitude) {
    name
  }
  myPosts(page: $page, limit: $limit) {
    docs {
      content
      author {
        _id
        imageUrl
        username
        email
      }
      postImageUrl
      isAnonymous
      area
      season
      year
      _id
    }
    hasPrevPage
    hasNextPage
    nextPage
    prevPage
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
