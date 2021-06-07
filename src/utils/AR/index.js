import {
  Mesh,
  MeshPhongMaterial,
  Raycaster,
  TextGeometry,
  Vector2,
  Vector3,
} from "three";

import DoHyeonFONT from "./fonts/Do_Hyeon_Regular.json";
import ThreeAR from "./modules/core";
import {
  createOverlayElement,
  createTextInputForm,
} from "./modules/domOverlay";
import Modeler from "./modules/draw/Modeler";
import { TubePainter } from "./modules/draw/TubePainter";

const FLOWER_MODEL =
  "https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf";

const MODELS = [FLOWER_MODEL];

function startAR({ onARConfirmBtnClick }) {
  let addTextModeCancel;
  let modelIdx = 0;
  let drawingMode = "paint";
  let curColor = "#ffffff";

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
    addTextModeCancel = handleCancelBtnClick;
  }

  function onTextApplyBtnClick(text) {
    createText(text);
    addTextModeCancel();
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

  function createText(text) {
    const font = threeAR.loaders.fontLoader.parse(DoHyeonFONT);

    const textGeo = new TextGeometry(text, {
      font: font,

      size: 0.03,
      height: 0.01,
      curveSegments: 4,

      bevelThickness: 2,
      bevelSize: 1.5,
    });

    const materials = [
      new MeshPhongMaterial({ color: curColor, flatShading: true }),
      new MeshPhongMaterial({ color: curColor })
    ];

    const textMesh1 = new Mesh(textGeo, materials);

    if (threeAR.camera.position) {
      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(), threeAR.camera);
      const inFrontOfCamera = new Vector3();
      const viewPosition = raycaster.ray.at(0.25, inFrontOfCamera);
      textMesh1.position.set(viewPosition.x, viewPosition.y, viewPosition.z);
    }

    threeAR.scene.add(textMesh1);
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
