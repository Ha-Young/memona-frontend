import {
  FontLoader,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
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

export function createARThreeCores() {
  const scene = createARScene();
  const camera = createARCamera();
  const renderer = createARRenderer();

  return { scene, camera, renderer };
}

export function createLoaders() {
  const fontLoader = new FontLoader();
  const modelLoader = new GLTFLoader();
  return { fontLoader, modelLoader };
}
