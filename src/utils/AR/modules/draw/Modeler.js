const RETICLE_MODEL =
  "https://immersive-web.github.io/webxr-samples/media/gltf/reticle/reticle.gltf";

class Modeler {
  constructor({ modelLoader, models, onModelLoadSuccess }) {
    this.hitTestSource = null;
    this.hitTestSourceRequested = false;
    this.models = getInitModels({ modelLoader, models });

    modelLoader.load(RETICLE_MODEL, (gltf) => {
      this.reticle = gltf.scene;
      this.viewReticle(false);

      onModelLoadSuccess();
    });
  }

  createModelOnHitPosition(modelIdx) {
    const model = this.models[modelIdx].clone();
    model.position.copy(this.reticle.position);

    return model;
  }

  checkAvailable() {
    return !!this.reticle ;
  }

  viewReticle(flag, position) {
    if (this.checkAvailable()) {
      this.reticle.visible = flag;

      if (position) {
        this.setReticlePosition(position);
        this.reticle.updateMatrixWorld(true);
      }
    }
  }

  setReticlePosition(position) {
    this.reticle.position.set(
      position.x,
      position.y,
      position.z
    );
  }
}

function getInitModels({ modelLoader, models }) {
  const initModels = [];
  for (let i = 0; i < models.length; i++) {
    modelLoader.load(models[i], (gltf) => {
      initModels[i] = gltf.scene;
    });
  }

  return initModels;
}

export default Modeler;
