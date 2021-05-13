import {
  CylinderGeometry,
  DoubleSide,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  RingGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

import { TubePainter } from "./TubePainter";

function startAR() {
  let currentSession = null;
  let hitTestSource = null;
  let hitTestSourceRequested = false;
  let drawingMode = "paint";

  const cursor = new Vector3();

  function onCloseBtnClick() {
    currentSession.end();
  }

  function onPaintBtnClick() {
    drawingMode = "paint";
  }

  function onModelBtnClick() {
    drawingMode = "model";
  }

  const container = document.createElement("div");
  const overlayElement = createOverlayElement({
    onCloseBtnClick,
    onPaintBtnClick,
    onModelBtnClick,
  });
  document.body.appendChild(container);
  document.body.appendChild(overlayElement);

  const sessionInit = {
    requiredFeatures: ["hit-test"],
    optionalFeatures: ["dom-overlay"],
    domOverlay: { root: overlayElement },
  };

  const scene = new Scene();
  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );

  const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  container.appendChild(renderer.domElement);

  async function onSessionStarted(session) {
    session.addEventListener("end", onSessionEnded);

    renderer.xr.setReferenceSpaceType("local");

    await renderer.xr.setSession(session);

    console.log(sessionInit.domOverlay);
    sessionInit.domOverlay.root.style.display = "";

    currentSession = session;
  }

  function onSessionEnded() {
    currentSession.removeEventListener("end", onSessionEnded);
    currentSession = null;

    container.removeChild(renderer.domElement);
    document.body.removeChild(sessionInit.domOverlay.root);
    document.body.removeChild(container);
  }

  const painter = new TubePainter();
  painter.setSize(0.4);
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

        painter.moveTo(cursor);
      } else {
        painter.lineTo(cursor);
        painter.update();
      }
    }
  }

  const geometry = new CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0);

  const reticle = new Mesh(
    new RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
    new MeshBasicMaterial()
  );
  reticle.matrixAutoUpdate = false;
  reticle.visible = false;
  scene.add(reticle);

  function onSelect() {
    if (reticle.visible) {
      const material = new MeshPhongMaterial({
        color: 0xffffff * Math.random(),
      });
      const mesh = new Mesh(geometry, material);
      mesh.position.setFromMatrixPosition(reticle.matrix);
      mesh.scale.y = Math.random() * 2 + 1;
      scene.add(mesh);
    }
  }

  const controller = renderer.xr.getController(0);
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

  function render(timestamp, frame) {
    if (drawingMode === "paint") {
      handleController(controller);
    }

    if (drawingMode === "model") {
      if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if (hitTestSourceRequested === false) {
          session
            .requestReferenceSpace("viewer")
            .then((referenceSpace) => {
              session
                .requestHitTestSource({ space: referenceSpace })
                .then((source) => {
                  hitTestSource = source;
                });
            });

          session.addEventListener("end", () => {
            hitTestSourceRequested = false;
            hitTestSource = null;
          });

          hitTestSourceRequested = true;
        }

        if (hitTestSource) {
          const hitTestResults = frame.getHitTestResults(hitTestSource);

          if (hitTestResults.length) {
            const hit = hitTestResults[0];

            reticle.visible = true;
            reticle.matrix.fromArray(
              hit.getPose(referenceSpace).transform.matrix
            );
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
  paintBtnElement.style.top = "60px";
  paintBtnElement.style.left = "20px";
  paintBtnElement.style.width = "38px";
  paintBtnElement.style.height = "38px";

  paintBtnElement.addEventListener("click", onPaintBtnClick);

  overlayElement.appendChild(paintBtnElement);

  const modelBtnElement = document.createElement("button");
  modelBtnElement.style.position = "fixed";
  modelBtnElement.style.top = "120px";
  modelBtnElement.style.left = "20px";
  modelBtnElement.style.width = "38px";
  modelBtnElement.style.height = "38px";

  modelBtnElement.addEventListener("click", onModelBtnClick);

  overlayElement.appendChild(modelBtnElement);

  return overlayElement;
}
