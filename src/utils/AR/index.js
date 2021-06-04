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
import { TubePainter } from "./modules/draw/TubePainter";
import { createARThreeCores, createLoaders } from "./modules/three";

function startAR({ onARConfirmBtnClick }) {
  let currentSession = null;
  let hitTestSource = null;
  let hitTestSourceRequested = false;
  let drawingMode = "paint";
  let curColor = "#ffffff";
  let isOverayBtnClick = false;

  const { fontLoader, modelLoader } = createLoaders();
  const { scene, camera, renderer } = createARThreeCores();

  const container = document.createElement("div");

  const overlayElement = createOverlayElement({
    onCloseBtnClick,
    onPaintBtnClick,
    onModelBtnClick,
    onTextBtnClick,
    onConfirmBtnClick,
    onColorChange,
  });

  document.body.appendChild(container);
  document.body.appendChild(overlayElement);

  const sessionInit = {
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["dom-overlay"],
    domOverlay: { root: overlayElement },
  };

  container.appendChild(renderer.domElement);

  const cursor = new Vector3();
  const controller = renderer.xr.getController(0);

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

    container.removeChild(renderer.domElement);
    document.body.removeChild(sessionInit.domOverlay.root);
    document.body.removeChild(container);
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

    cursor.set(0, 0, -0.2).applyMatrix4(controller.matrixWorld);

    if (userData.isSelecting === true) {
      if (userData.skipFrames >= 0) {
        // TODO(mrdoob) Revisit this
        userData.skipFrames--;
        painter.setColor(curColor);
        painter.moveTo(cursor);
      } else {
        painter.lineTo(cursor);
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

  controller.addEventListener("selectstart", onSelectStart);
  controller.addEventListener("selectend", onSelectEnd);
  controller.addEventListener("select", onSelect);
  controller.userData.skipFrames = 0;
  scene.add(controller);

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
      handleController(controller);
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

function createOverlayElement({
  onCloseBtnClick,
  onPaintBtnClick,
  onModelBtnClick,
  onTextBtnClick,
  onConfirmBtnClick,
  onColorChange,
}) {
  const overlayElement = document.createElement("div");
  overlayElement.style.display = "none";

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
