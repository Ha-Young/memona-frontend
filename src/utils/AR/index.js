import DoHyeonFONT from "./fonts/Do_Hyeon_Regular.json";
import ThreeAR from "./modules/core";
import {
  createOverlayElement,
  createTextInputForm,
} from "./modules/domOverlay";
import Modeler from "./modules/draw/Modeler";
import TextWriter from "./modules/draw/TextWriter";
import { TubePainter } from "./modules/draw/TubePainter";

const FLOWER_MODEL =
  "https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf";

const MODELS = [FLOWER_MODEL];

function startAR({ onARConfirmBtnClick }) {
  let modelIdx = 0;
  let drawingMode = "paint";
  let curColor = "#ffffff";
  let textInputModalClose;

  const threeAR = new ThreeAR({
    onARViewSelect,
    onARViewSelectStart,
    onARViewSelectEnd,
  });

  const domOverlayElement = createOverlayElement({
    onCloseBtnClick,
    onPaintBtnClick,
    onModelBtnClick,
    onTextBtnClick,
    onConfirmBtnClick,
    onColorChange,
  });

  const painter = new TubePainter();
  painter.setSize(0.3);
  threeAR.scene.add(painter.mesh);

  const modeler = new Modeler({
    modelLoader: threeAR.loaders.modelLoader,
    models: MODELS,
    onModelLoadSuccess: () => {
      threeAR.scene.add(modeler.reticle);
    },
  });

  const testWriter = new TextWriter({
    font: threeAR.loaders.fontLoader.parse(DoHyeonFONT),
  });

  threeAR.startAR({ domOverlayElement });

  function onCloseBtnClick() {
    threeAR.closeAR();
  }

  function onPaintBtnClick() {
    drawingMode = "paint";
  }

  function onModelBtnClick() {
    drawingMode = "model";
  }

  function onColorChange(e) {
    curColor = e.target.value;
  }

  function onConfirmBtnClick() {
    for (const element of domOverlayElement.childNodes) {
      element.style.display = "none";
    }

    window.setTimeout(() => {
      threeAR.closeAR();
      onARConfirmBtnClick();
    }, 3000);
  }

  function onTextBtnClick() {
    drawingMode = "text";
    const { handleCancelBtnClick } = createTextInputForm({
      onTextApplyBtnClick,
      parentElement: domOverlayElement,
    });
    textInputModalClose = handleCancelBtnClick;
  }

  function onTextApplyBtnClick(text) {
    const viewPosition = threeAR.getViewPosition(0.25);

    const newTextMesh = testWriter.createText({ text, position: viewPosition, color: curColor });
    threeAR.scene.add(newTextMesh);

    textInputModalClose && textInputModalClose();
    drawingMode = "";
  }

  function onARViewSelectStart() {
    if (drawingMode === "paint") {
      painter.paintStart();
    }
  }

  function onARViewSelectEnd() {
    if (drawingMode === "paint") {
      painter.paintStop();
    }
  }

  function onARViewSelect() {
    if (modeler.checkAvailable() && drawingMode === "model") {
      const newModel = modeler.createModelOnHitPosition(modelIdx);
      threeAR.scene.add(newModel);
    }
  }

  async function render(timestamp, frame) {
    if (drawingMode !== "model" && modeler.checkAvailable()) {
      modeler.viewReticle(false);
    }

    if (drawingMode === "paint") {
      painter.draw(threeAR.controller, curColor);
    }

    if (drawingMode === "model") {
      if (frame) {
        const hitPosition = await threeAR.hitTest(frame);

        if (hitPosition) {
          modeler.viewReticle(true, hitPosition);
        } else {
          modeler.viewReticle(false);
        }
      }
    }

    threeAR.frameRender();
  }

  threeAR.loopRender(render);
}

export default startAR;
