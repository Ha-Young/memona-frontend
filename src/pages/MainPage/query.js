import { gql } from "@apollo/client";

export const GET_MAINPAGE_LOAD_DATA = gql`
  query Query($latitude: Float, $longitude: Float) {
    myArea(lat: $latitude, lng: $longitude) {
      name
    }
  }
`;
