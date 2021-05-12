function calcAddPixel(...args) {
  return args.reduce((acc, arg) => acc + parseInt(arg, 10), 0);
}

export default calcAddPixel;
