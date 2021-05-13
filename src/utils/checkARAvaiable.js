async function checkARAvaiable() {
  if ( "xr" in window.navigator ) {
    try {
      return await window.navigator.xr.isSessionSupported( "immersive-ar" );
    } catch {
      return false;
    }
  } else {
    return false;
  }
}

export default checkARAvaiable;
