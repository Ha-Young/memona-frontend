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
import { createOverlayElement, createTextInputForm } from "./modules/domOverlay";
import { TubePainter } from "./modules/draw/TubePainter";

function startAR({ onARConfirmBtnClick }) {
  let hitTestSource = null;
  let hitTestSourceRequested = false;
  let drawingMode = "paint";
  let curColor = "#ffffff";
  let isOverayBtnClick = false;

  const threeAR = new ThreeAR({ onARViewSelect, onARViewSelectStart, onARViewSelectEnd });

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

  threeAR.startAR({ domOverlayElement });

  function onCloseBtnClick() {
    threeAR.closeAR();
  }

  function onPaintBtnClick() {
    drawingMode = "paint";
    isOverayBtnClick = true;
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

  let addTextModeCancel;
  function onTextBtnClick() {
    drawingMode = "text";
    const { handleCancelBtnClick } = createTextInputForm({
      onTextApplyBtnClick,
      parentElement: domOverlayElement,
    });
    addTextModeCancel = handleCancelBtnClick;
    isOverayBtnClick = true;
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
      textMesh1.position.set(
        viewPosition.x,
        viewPosition.y,
        viewPosition.z
      );
    }

    threeAR.scene.add(textMesh1);
  }

  let reticle;
  threeAR.loaders.modelLoader.load(
    "https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf",
    (gltf) => {
      reticle = gltf.scene;
      reticle.visible = false;
      threeAR.scene.add(reticle);
    }
  );

  let flower;
  threeAR.loaders.modelLoader.load(
    "https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf",
    (gltf) => {
      flower = gltf.scene;
    }
  );

  function onARViewSelect() {
    if (reticle.visible && flower && !isOverayBtnClick) {
      const clone = flower.clone();
      clone.position.copy(reticle.position);
      threeAR.scene.add(clone);
    }
    isOverayBtnClick = false;
  }

  async function render(timestamp, frame) {
    if (drawingMode !== "model" && reticle) {
      reticle.visible = false;
    }

    if (drawingMode === "paint") {
      painter.draw(threeAR.controller, curColor);
    }

    if (drawingMode === "model") {
      if (frame) {
        const session = threeAR.renderer.xr.getSession();
        const referenceSpace = await session.requestReferenceSpace("local");

        if (hitTestSourceRequested === false) {
          const viewerSpace = await session.requestReferenceSpace("viewer");

          hitTestSource = await session.requestHitTestSource({
            space: viewerSpace,
          });

          session.addEventListener("end", () => {
            hitTestSourceRequested = false;
            hitTestSource = null;
          });

          hitTestSourceRequested = true;
        }

        if (hitTestSource) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);

          if (hitTestResults.length > 0 && reticle) {
            const hitPose = hitTestResults[0].getPose(referenceSpace);
            reticle.visible = true;
            reticle.position.set(
              hitPose.transform.position.x,
              hitPose.transform.position.y,
              hitPose.transform.position.z
            );
            reticle.updateMatrixWorld(true);
          } else {
            reticle.visible = false;
          }
        }
      }
    }

    threeAR.renderFrame();
  }

  threeAR.render(render);
}

export default startAR;
