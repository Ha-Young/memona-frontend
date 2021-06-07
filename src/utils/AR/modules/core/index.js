import {
  createARCamera,
  createARRenderer,
  createARScene,
  createLoaders,
  getARController,
} from "./helper";

const defaultSessionInitOption = {
  requiredFeatures: ["hit-test"],
  optionalFeatures: ["dom-overlay"],
};

class ThreeAR {
  constructor({ onARViewSelect, onARViewSelectStart, onARViewSelectEnd, sessionInitOption }) {
    this.session = null;
    this.sessionInit = sessionInitOption ? sessionInitOption : defaultSessionInitOption;
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

  async onSessionStarted(session) {
    session.addEventListener("end", this.onSessionEnded.bind(this));

    this.renderer.xr.setReferenceSpaceType("local");

    await this.renderer.xr.setSession(session);

    this.sessionInit.domOverlay.root.style.display = "";

    this.session = session;
  }

  onSessionEnded() {
    this.session.removeEventListener("end", this.onSessionEnded);
    this.session = null;

    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }

    this.renderer.setAnimationLoop(null);
    this.renderer.clear();

    document.body.removeChild(this.sessionInit.domOverlay.root);
  }

  setARControllerEvents({
    onControllerSelect,
    onControllerSelectStart,
    onControllerSelectEnd,
  }) {
    this.controller.addEventListener("select", onControllerSelect);
    this.controller.addEventListener("selectstart", onControllerSelectStart);
    this.controller.addEventListener("selectend", onControllerSelectEnd);
  }

  startAR({ domOverlayElement }) {
    if (this.session === null) {
      this.sessionInit = {
        ...this.sessionInit,
        domOverlay: domOverlayElement && { root: domOverlayElement },
      };

      navigator.xr
        .requestSession("immersive-ar", this.sessionInit)
        .then(this.onSessionStarted.bind(this));
    } else {
      this.session.end();
    }
  }

  closeAR() {
    if (this.session) {
      this.session.end();
    }
  }

  renderFrame() {
    this.renderer.render(this.scene, this.camera);
  }

  render(renderFunc) {
    this.renderer.setAnimationLoop(renderFunc);
  }
}

export default ThreeAR;
