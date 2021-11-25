// https://threejs.org/docs/index.html?q=web#api/en/renderers/webgl/WebGLProgram

// Runs for every vertex and adjust the position coordinates.

// default vertex attributes provided by Geometry and BufferGeometry
// attribute vec3 position;
// attribute vec3 normal;
// attribute vec2 uv;

// Note that you can therefore calculate the position of a vertex in the vertex shader by:
// projectionMatrix and modelViewMatrix are provided by Three.js

// We use a varying to pass this value to another shader
varying vec2 vertexUV;
varying vec3 vertexNormal;

void main() {
  vertexUV = uv;
  vertexNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
