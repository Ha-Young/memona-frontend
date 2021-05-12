import { useReactiveVar } from "@apollo/client";

import { locationVar } from "../store";
import getGeolocation from "../utils/getGeolocation";

const useGeolocation = () => {
  const location = useReactiveVar(locationVar);

  function handleGeolocationSuccess(location) {
    const { latitude, longitude, altitude } = location.coords;
    locationVar({ latitude, longitude, altitude });
  }

  function handleGeolocationFailure(error) {
    console.log(error);
  }

  if (!location) {
    getGeolocation(handleGeolocationSuccess, handleGeolocationFailure);
  }
};

export default useGeolocation;
