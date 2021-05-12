function throttleOnRendering(cb) {
  if (!cb) {
    throw Error("Invalid required arguments");
  }

  let tick = false;

  return function () {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      tick = false;
      return cb();
    });
  };
}

export default throttleOnRendering;
