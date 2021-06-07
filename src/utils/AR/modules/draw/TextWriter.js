import { Mesh, MeshPhongMaterial, Raycaster, TextGeometry, Vector2, Vector3 } from "three";

class TextWriter {
  constructor({ font, color }) {
    this.font = font;
    this.color = color;
  }

  createText({ text, color, position }) {
    const textGeo = new TextGeometry(text, {
      font: this.font,

      size: 0.03,
      height: 0.01,
      curveSegments: 4,

      bevelThickness: 2,
      bevelSize: 1.5,
    });

    const materials = [
      new MeshPhongMaterial({ color, flatShading: true }),
      new MeshPhongMaterial({ color })
    ];

    const textMesh = new Mesh(textGeo, materials);
    textMesh.position.set(position.x, position.y, position.z);

    return textMesh;
  }

  setColor(color) {
    this.color = color;
  }

  setFont(font) {
    this.font = font;
  }
}

export default TextWriter;
