import {
  createARCamera,
  createARRenderer,
  createARScene,
  createLoaders,
  getARController,
} from "./helper";

class ThreeAR {
  constructor({ onARViewSelect, onARViewSelectStart, onARViewSelectEnd }) {
    this.scene = createARScene();
    this.camera = createARCamera();
    this.renderer = createARRenderer();
    this.controller = getARController({
      renderer: this.renderer,
      scene: this.scene,
    });
    this.loaders = createLoaders();

    this.setARControllerEvents({
      onControllerSelect: onARViewSelect,
      onControllerSelectStart: onARViewSelectStart,
      onControllerSelectEnd: onARViewSelectEnd,
    });
  }

  setARControllerEvents({
    onControllerSelect,
    onControllerSelectStart,
    onControllerSelectEnd,
  }) {
    this.controller.addEventListener("select", onControllerSelect);
    this.controller.addEventListener("selectstart", onControllerSelectStart);
    this.controller.addEventListener("selectend", onControllerSelectEnd);
    this.controller.userData.skipFrames = 0;
  }

  renderFrame() {
    this.renderer.render(this.scene, this.camera);
  }

  render(renderFunc) {
    this.renderer.setAnimationLoop(renderFunc);
  }
}

export default ThreeAR;
