function getElementStyle(element, styleKey) {
  return window.getComputedStyle(element)[styleKey];
}

export default getElementStyle;
