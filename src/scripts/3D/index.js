import * as THREE from 'three';
// import gsap from 'gsap';
// import * as dat from 'dat.gui';

import PlaneMesh from './plane';

// const gui = new dat.GUI();
//
// const guiConfig = {
//   plane: {
//     width: 80,
//     height: 40,
//     widthSegments: 14,
//     heightSegments: 12
//   },
//   light: {
//     intensity: 1,
//     x: 1,
//     y: 0,
//     z: 5
//   }
// };
//
// /* PLANE CONFIGURATION CONTROLS */
// gui
//   .add(guiConfig.plane, 'width', 1, 100)
//   .onChange(() => backgroundPlane.regeneratePlane(guiConfig.plane));
// gui
//   .add(guiConfig.plane, 'height', 1, 100)
//   .onChange(() => backgroundPlane.regeneratePlane(guiConfig.plane));
// gui
//   .add(guiConfig.plane, 'widthSegments', 5, 20)
//   .onChange(() => backgroundPlane.regeneratePlane(guiConfig.plane));
// gui
//   .add(guiConfig.plane, 'heightSegments', 5, 20)
//   .onChange(() => backgroundPlane.regeneratePlane(guiConfig.plane));
//
// /* LIGHT CONFIGURATION CONTROLS */
// gui
//   .add(guiConfig.light, 'intensity', 0, 10)
//   .onChange(() => light.intensity = guiConfig.light.intensity);
// gui
//   .add(guiConfig.light, 'x', 0, 10)
//   .onChange(() => light.position.x = guiConfig.light.x);
// gui
//   .add(guiConfig.light, 'y', 0, 10)
//   .onChange(() => light.position.y = guiConfig.light.y);
// gui
//   .add(guiConfig.light, 'z', 0, 10)
//   .onChange(() => light.position.z = guiConfig.light.z);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0,0,10);

const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(2, 2, 3);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });
const domContainerEl = document.querySelector('.landing');
domContainerEl.appendChild(renderer.domElement);

renderer.setSize(
  domContainerEl.clientWidth,
  domContainerEl.clientHeight
);

renderer.setPixelRatio(devicePixelRatio);

// The initial configuration
const planeGeometry = new THREE.PlaneGeometry(
  40,
  20,
  10,
  10,
);
const planeMaterial = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true
});

const initialColor = { r: 0.94, g: 0.94, b: 0.94 };

const backgroundPlane = new PlaneMesh(
  planeGeometry,
  planeMaterial,
  initialColor.r,
  initialColor.g,
  initialColor.b
);

scene.add(light);
scene.add(backgroundPlane.mesh);

backgroundPlane.updateTexture();
backgroundPlane.updateColor(
  initialColor.r,
  initialColor.g,
  initialColor.b
);

function normalizeCoordinates(x, y){
  mouse.x = (x / innerWidth) * 2 - 1;
  mouse.y = -(y / innerHeight) * 2 + 1;
}

const mouse = { x: undefined, y: undefined };

window.addEventListener('mousemove', event => {
  const { clientX, clientY } = event;
  normalizeCoordinates(clientX, clientY);
});

const raycaster = new THREE.Raycaster();

let clock = new THREE.Clock();
let delta = 0;
let interval = 1 / 16; // 30 fps
let frame = 0;

function animate() {
  delta += clock.getDelta();

  if (delta <= interval) {
    delta = delta % interval;
    requestAnimationFrame(animate);
    return;
  };

  delta = delta % interval;

  renderer.render(scene, camera);

  backgroundPlane.wavyMotion(frame);

  frame += 0.01;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(backgroundPlane.mesh);

  // if (intersects.length) {
  //   /* color property needs to be added either during creation or once defined by setAttribute */
  //
  //   const hoverColor = {
  //     r: 1,
  //     g: 1,
  //     b: 0
  //   };
  //
  //   // Select the vertices that make up the face we're currently hovering over.
  //   const { a, b, c } = intersects[0].face;
  //   const { color } = intersects[0].object.geometry.attributes;
  //
  //   // Vertex 1
  //   color.setX(a, hoverColor.r);
  //   color.setY(a, hoverColor.g);
  //   color.setZ(a, hoverColor.b);
  //
  //   // Vertex 2
  //   color.setX(b, hoverColor.r);
  //   color.setY(b, hoverColor.g);
  //   color.setZ(b, hoverColor.b);
  //
  //   // Vertex 3
  //   color.setX(c, hoverColor.r);
  //   color.setY(c, hoverColor.g);
  //   color.setZ(c, hoverColor.b);
  //
  //   color.needsUpdate = true;
  //
  //   gsap.to(hoverColor, {
  //     r: initialColor.r,
  //     g: initialColor.g,
  //     b: initialColor.b,
  //     duration: 1,
  //     onUpdate: () => {
  //       // Vertex 1
  //       color.setX(a, hoverColor.r);
  //       color.setY(a, hoverColor.g);
  //       color.setZ(a, hoverColor.b);
  //
  //       // Vertex 2
  //       color.setX(b, hoverColor.r);
  //       color.setY(b, hoverColor.g);
  //       color.setZ(b, hoverColor.b);
  //
  //       // Vertex 3
  //       color.setX(c, hoverColor.r);
  //       color.setY(c, hoverColor.g);
  //       color.setZ(c, hoverColor.b);
  //
  //       color.needsUpdate = true;
  //     }
  //   });
  // }

  requestAnimationFrame(animate);
}

export default animate;
