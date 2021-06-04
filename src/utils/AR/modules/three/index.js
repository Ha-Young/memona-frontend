import {
  FontLoader,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function createARScene() {
  const scene = new Scene();

  const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  return scene;
}

function createARCamera() {
  return new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );
}

function createARRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  return renderer;
}

function getARController({ renderer, scene }) {
  const controller = renderer.xr.getController(0);
  scene.add(controller);

  return controller;
}

export function createARThreeCores() {
  const scene = createARScene();
  const camera = createARCamera();
  const renderer = createARRenderer();
  const arController = getARController({ scene, renderer });

  return { scene, camera, renderer, arController };
}

export function createLoaders() {
  const fontLoader = new FontLoader();
  const modelLoader = new GLTFLoader();
  return { fontLoader, modelLoader };
}

export function createCursor() {
  return new Vector3();
}

export function setARControllerEvents({ arController, onSelectStart, onSelect, onSelectEnd }) {
  arController.addEventListener("selectstart", onSelectStart);
  arController.addEventListener("selectend", onSelectEnd);
  arController.addEventListener("select", onSelect);
  arController.userData.skipFrames = 0;

  return arController;
}
