import { Mesh, PlaneGeometry, BufferAttribute } from 'three';

class PlaneMesh {
  constructor(geometry, material, r, g, b) {
    this.mesh = new Mesh(geometry, material);
    this.verticesOrigin = [ ...this.mesh.geometry.attributes.position.array ];
    this.randomValues = this._getRandomValues();
    this.r = r;
    this.g = g;
    this.b = b;
  }

  _getRandomValues() {
    const randomValues = [];
    for (
      let i = 0, total = this.mesh.geometry.attributes.position.array.length;
      i < total;
      i++
    ) {
      randomValues.push((Math.random() * Math.PI * 2));
    }

    return randomValues;
  }

  updateTexture() {
    const vertices = this.mesh.geometry.attributes.position.array;
    for (let i = 0, total = vertices.length; i < total; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];

      vertices[i] = x + (Math.random() - 0.5);
      vertices[i + 1] = y + (Math.random() - 0.5);
      vertices[i + 2] = z + (Math.random() -0.5);
    }

    // Recalculate starting position for new geometry, and get same amount of random values
    this.verticesOrigin = [ ...vertices ];
    this.randomValues = this._getRandomValues();
  }

  wavyMotion(frame) {
    const vertices = this.mesh.geometry.attributes.position.array;

    for (let i = 0, total = vertices.length; i < total; i += 3) {
      vertices[i] = this.verticesOrigin[i] + Math.cos(frame + this.randomValues[i]) * 0.5;
      vertices[i + 1] = this.verticesOrigin[i + 1] + Math.sin(frame + this.randomValues[i + 1]) * 0.5;
      vertices[i + 2] = this.verticesOrigin[i + 2] + Math.sin(frame + this.randomValues[i + 2]) * 0.5;
    }

    this.mesh.geometry.attributes.position.needsUpdate = true;
  }

  regeneratePlane({ width, height, widthSegments, heightSegments }) {
    this.mesh.geometry.dispose();
    this.mesh.geometry = new PlaneGeometry(width, height, widthSegments, heightSegments);
    this.updateTexture();
    this.updateColor(this.r, this.g, this.b);
  }

  updateColor(r, g, b) {
    const allVertex = this.mesh.geometry.attributes.position.count;
    const colors = [];

    for (let i = 0; i < allVertex; i++) {
      colors.push(r, g, b);
    }

    this.mesh.geometry.setAttribute(
      'color',
      new BufferAttribute(new Float32Array(colors), 3)
    );
  }
}

export default PlaneMesh;
