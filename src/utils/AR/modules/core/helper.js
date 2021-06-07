import {
  FontLoader,
  HemisphereLight,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function createARScene() {
  const scene = new Scene();

  const light = new HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  return scene;
}

export function createARCamera() {
  return new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    20
  );
}

export function createARRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;

  return renderer;
}

export function getARController({ renderer, scene }) {
  const controller = renderer.xr.getController(0);
  scene.add(controller);

  return controller;
}

export function createLoaders() {
  const fontLoader = new FontLoader();
  const modelLoader = new GLTFLoader();
  return { fontLoader, modelLoader };
}

export function getPositionAwayFromCamera(distance, camera) {
  const raycaster = new Raycaster();
  raycaster.setFromCamera(new Vector2(), camera);
  const inFrontOfCamera = new Vector3();
  return raycaster.ray.at(distance, inFrontOfCamera);
}
