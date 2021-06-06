import {
  DoubleSide,
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
  let currentSession = null;
  let hitTestSource = null;
  let hitTestSourceRequested = false;
  let drawingMode = "paint";
  let curColor = "#ffffff";
  let isOverayBtnClick = false;

  const threeAR = new ThreeAR({ onARViewSelect, onARViewSelectStart, onARViewSelectEnd });

  const overlayElement = createOverlayElement({
    onCloseBtnClick,
    onPaintBtnClick,
    onModelBtnClick,
    onTextBtnClick,
    onConfirmBtnClick,
    onColorChange,
  });

  const sessionInit = {
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["dom-overlay"],
    domOverlay: { root: overlayElement },
  };

  function onCloseBtnClick() {
    currentSession.end();
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
    for (const element of overlayElement.childNodes) {
      element.style.display = "none";
    }

    window.setTimeout(() => {
      currentSession.end();
      onARConfirmBtnClick();
    }, 3000);
  }

  let addTextModeCancel;
  function onTextBtnClick() {
    drawingMode = "text";
    const { handleCancelBtnClick } = createTextInputForm({
      onTextApplyBtnClick,
      parentElement: overlayElement,
    });
    addTextModeCancel = handleCancelBtnClick;
    isOverayBtnClick = true;
  }

  function onTextApplyBtnClick(text) {
    createText(text);
    addTextModeCancel();
    drawingMode = "";
  }

  async function onSessionStarted(session) {
    session.addEventListener("end", onSessionEnded);

    threeAR.renderer.xr.setReferenceSpaceType("local");

    await threeAR.renderer.xr.setSession(session);

    sessionInit.domOverlay.root.style.display = "";

    currentSession = session;
  }

  function onSessionEnded() {
    currentSession.removeEventListener("end", onSessionEnded);
    currentSession = null;

    while (threeAR.scene.children.length > 0) {
      threeAR.scene.remove(threeAR.scene.children[0]);
    }

    threeAR.renderer.setAnimationLoop(null);
    threeAR.renderer.clear();

    document.body.removeChild(sessionInit.domOverlay.root);
  }

  const painter = new TubePainter();
  painter.setSize(0.3);
  painter.mesh.material.side = DoubleSide;
  threeAR.scene.add(painter.mesh);

  function onARViewSelectStart() {
    if (drawingMode === "paint") {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
    }
  }

  function onARViewSelectEnd() {
    if (drawingMode === "paint") {
      this.userData.isSelecting = false;
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
      // bevelEnabled: true,
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

  if (currentSession === null) {
    navigator.xr
      .requestSession("immersive-ar", sessionInit)
      .then(onSessionStarted);
  } else {
    currentSession.end();
  }

  async function render(timestamp, frame) {
    if (drawingMode !== "model" && reticle) {
      reticle.visible = false;
    }

    if (drawingMode === "paint") {
      painter.drawStart(threeAR.controller);
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
