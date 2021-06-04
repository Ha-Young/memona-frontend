export function createOverlayElement({
  onCloseBtnClick,
  onPaintBtnClick,
  onModelBtnClick,
  onTextBtnClick,
  onConfirmBtnClick,
  onColorChange,
}) {
  const overlayElement = document.createElement("div");
  overlayElement.style.display = "none";
  document.body.appendChild(overlayElement);

  const closeBtnElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  closeBtnElement.setAttribute("width", 38);
  closeBtnElement.setAttribute("height", 38);
  closeBtnElement.style.position = "fixed";
  closeBtnElement.style.left = "20px";
  closeBtnElement.style.top = "20px";
  closeBtnElement.addEventListener("click", onCloseBtnClick);

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", "M 12,12 L 28,28 M 28,12 12,28");
  path.setAttribute("stroke", "#fff");
  path.setAttribute("stroke-width", 2);
  closeBtnElement.appendChild(path);

  overlayElement.appendChild(closeBtnElement);

  const paintBtnElement = document.createElement("button");
  paintBtnElement.style.position = "fixed";
  paintBtnElement.style.top = "70px";
  paintBtnElement.style.left = "20px";
  paintBtnElement.style.width = "38px";
  paintBtnElement.style.height = "38px";

  paintBtnElement.addEventListener("click", onPaintBtnClick);

  overlayElement.appendChild(paintBtnElement);

  const modelBtnElement = document.createElement("button");
  modelBtnElement.style.position = "fixed";
  modelBtnElement.style.top = "130px";
  modelBtnElement.style.left = "20px";
  modelBtnElement.style.width = "38px";
  modelBtnElement.style.height = "38px";

  modelBtnElement.addEventListener("click", onModelBtnClick);

  overlayElement.appendChild(modelBtnElement);

  const textBtnElement = document.createElement("button");
  textBtnElement.style.position = "fixed";
  textBtnElement.style.top = "190px";
  textBtnElement.style.left = "20px";
  textBtnElement.style.width = "38px";
  textBtnElement.style.height = "38px";

  textBtnElement.addEventListener("click", onTextBtnClick);

  overlayElement.appendChild(textBtnElement);

  const captureBtnElement = document.createElement("button");
  captureBtnElement.style.position = "fixed";
  captureBtnElement.style.bottom = "30px";
  captureBtnElement.style.left = "calc(50% - 25px)";
  captureBtnElement.style.width = "50px";
  captureBtnElement.style.height = "50px";
  captureBtnElement.style.borderRadius = "50%";

  captureBtnElement.addEventListener("click", onConfirmBtnClick);

  overlayElement.appendChild(captureBtnElement);

  const colorPicker = document.createElement("input");
  colorPicker.id = "colorPicker";
  colorPicker.type = "color";
  colorPicker.value = "#ffffff";
  colorPicker.style.position = "fixed";
  colorPicker.style.bottom = "40px";
  colorPicker.style.left = "20px";
  colorPicker.style.width = "50px";
  colorPicker.style.height = "27px";

  colorPicker.addEventListener("change", onColorChange);

  overlayElement.appendChild(colorPicker);

  return overlayElement;
}

function createTextInputForm({ onTextApplyBtnClick, parentElement }) {
  const textAddFormElement = document.createElement("div");
  const textAddInputElement = document.createElement("textarea");
  const textApplyBtnElement = document.createElement("div");
  const textCancelBtnElement = document.createElement("div");

  textApplyBtnElement.textContent = "적용";
  textApplyBtnElement.style.position = "fixed";
  textApplyBtnElement.style.top = "50px";
  textApplyBtnElement.style.right = "20px";
  textApplyBtnElement.style.fontSize = "20px";
  textApplyBtnElement.style.fontWeight = "600";
  textApplyBtnElement.style.backgroundColor = "transparent";
  textApplyBtnElement.style.color = "white";
  textApplyBtnElement.textContent = "적용";

  textCancelBtnElement.textContent = "취소";
  textCancelBtnElement.style.position = "fixed";
  textCancelBtnElement.style.bottom = "40px";
  textCancelBtnElement.style.right = "20px";
  textCancelBtnElement.style.fontSize = "20px";
  textCancelBtnElement.style.fontWeight = "600";
  textCancelBtnElement.style.backgroundColor = "transparent";
  textCancelBtnElement.style.color = "white";

  textAddInputElement.style.background = "transparent";
  textAddInputElement.style.fontSize = "30px";
  textAddInputElement.style.width = "50vw";
  textAddInputElement.style.color = "white";
  textAddInputElement.style.wordWrap = "break-word";

  textAddFormElement.style.position = "fixed";
  textAddFormElement.style.left = "calc(50% - 150px)";
  textAddFormElement.style.top = "calc(50% - 150px)";
  textAddFormElement.style.display = "flex";
  textAddFormElement.style.flexDirection = "column";
  textAddFormElement.style.justifyContent = "center";
  textAddFormElement.style.alignItems = "center";
  textAddFormElement.style.width = "300px";
  textAddFormElement.style.height = "300px";

  function handleApplyBtnClick() {
    onTextApplyBtnClick(textAddInputElement.value);
  }

  function handleCancelBtnClick() {
    parentElement.removeChild(textAddFormElement);
    parentElement.removeChild(textApplyBtnElement);
    parentElement.removeChild(textCancelBtnElement);
  }

  textApplyBtnElement.addEventListener("click", handleApplyBtnClick);
  textCancelBtnElement.addEventListener("click", handleCancelBtnClick);

  textAddFormElement.appendChild(textAddInputElement);

  parentElement.appendChild(textApplyBtnElement);
  parentElement.appendChild(textCancelBtnElement);
  parentElement.appendChild(textAddFormElement);

  return {
    textAddFormElement,
    textAddInputElement,
    textApplyBtnElement,
    textCancelBtnElement,
    handleCancelBtnClick,
  };
}
