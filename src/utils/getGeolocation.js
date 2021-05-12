function getGeolocation(onSuccess, onFailure) {
  if (!navigator.geolocation) {
    onFailure("Geolocation is not supported.");
  }

  navigator.geolocation.getCurrentPosition(
    onSuccess,
    onFailure,
    {
      enableHighAccuracy: true,
    }
  );
}

export default getGeolocation;
