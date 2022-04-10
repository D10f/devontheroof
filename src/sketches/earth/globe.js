import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  ShaderMaterial,
  AdditiveBlending,
  BackSide
} from 'three';

import earth from './assets/earth.jpg';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

/**
 *  @param {number} radius
 *  @param {number} widthSegments
 *  @param {number} heightSegments
 */
const sphereGeometry = new SphereGeometry(5, 50, 50);


/** https://threejs.org/docs/#api/en/textures/Texture
 *  https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
 *  @param {object} parameters
 */
const material = new MeshBasicMaterial({
  // color: 0xFF0000,
  map: new TextureLoader().load(earth)
});

/** https://threejs.org/docs/?q=shaderma#api/en/materials/ShaderMaterial
 *
 */
const earthShaderMaterial = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: new TextureLoader().load(earth)
    }
  }
});


const atmosphereShaderMaterial = new ShaderMaterial({
  vertexShader: atmosphereVertexShader,
  fragmentShader: atmosphereFragmentShader,
  blending: AdditiveBlending,
  side: BackSide
});


export const Earth = new Mesh(sphereGeometry, earthShaderMaterial);
export const Atmosphere = new Mesh(sphereGeometry, atmosphereShaderMaterial);

// Make it a little larger as to surround the Earth mesh
Atmosphere.scale.set(1.1, 1.1, 1.1);
