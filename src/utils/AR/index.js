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
import { createOverlayElement, createTextInputForm } from "./modules/domOverlay";
import { TubePainter } from "./modules/draw/TubePainter";
import { createARThreeCores, createCursor, createLoaders, setARControllerEvents } from "./modules/three";

function startAR({ onARConfirmBtnClick }) {
  let currentSession = null;
  let hitTestSource = null;
  let hitTestSourceRequested = false;
  let drawingMode = "paint";
  let curColor = "#ffffff";
  let isOverayBtnClick = false;

  const { fontLoader, modelLoader } = createLoaders();
  const { scene, camera, renderer, arController } = createARThreeCores();
  const paintCursor = createCursor();
  setARControllerEvents({ arController, onSelectStart, onSelect, onSelectEnd });

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

    renderer.xr.setReferenceSpaceType("local");

    await renderer.xr.setSession(session);

    sessionInit.domOverlay.root.style.display = "";

    currentSession = session;
  }

  function onSessionEnded() {
    currentSession.removeEventListener("end", onSessionEnded);
    currentSession = null;

    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    renderer.setAnimationLoop(null);
    renderer.clear();

    document.body.removeChild(sessionInit.domOverlay.root);
  }

  const painter = new TubePainter();
  painter.setSize(0.3);
  painter.mesh.material.side = DoubleSide;
  scene.add(painter.mesh);

  function onSelectStart() {
    if (drawingMode === "paint") {
      this.userData.isSelecting = true;
      this.userData.skipFrames = 2;
    }
  }

  function onSelectEnd() {
    if (drawingMode === "paint") {
      this.userData.isSelecting = false;
    }
  }

  function handleController(controller) {
    const userData = controller.userData;

    paintCursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

    if (userData.isSelecting === true) {
      if (userData.skipFrames >= 0) {
        // TODO(mrdoob) Revisit this
        userData.skipFrames--;
        painter.setColor(curColor);
        painter.moveTo(paintCursor);
      } else {
        painter.lineTo(paintCursor);
        painter.update();
      }
    }
  }

  function createText(text) {
    const font = fontLoader.parse(DoHyeonFONT);

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

    if (camera.position) {
      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(), camera);
      const inFrontOfCamera = new Vector3();
      const viewPosition = raycaster.ray.at(0.25, inFrontOfCamera);
      textMesh1.position.set(
        viewPosition.x,
        viewPosition.y,
        viewPosition.z
      );
    }

    scene.add(textMesh1);
  }

  let reticle;
  modelLoader.load(
    "https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf",
    (gltf) => {
      reticle = gltf.scene;
      reticle.visible = false;
      scene.add(reticle);
    }
  );

  let flower;
  modelLoader.load(
    "https://immersive-web.github.io/webxr-samples/media/gltf/sunflower/sunflower.gltf",
    (gltf) => {
      flower = gltf.scene;
    }
  );

  function onSelect() {
    if (reticle.visible && flower && !isOverayBtnClick) {
      const clone = flower.clone();
      clone.position.copy(reticle.position);
      scene.add(clone);
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
      handleController(arController);
    }

    if (drawingMode === "model") {
      if (frame) {
        const session = renderer.xr.getSession();
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

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(render);
}

export default startAR;
