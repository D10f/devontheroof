import { Scene, PerspectiveCamera, WebGLRenderer, Group } from 'three';
import gsap from 'gsap';

/********** TARGET DOM ELEMENT ***********/
export const targetEl = document.querySelector('#earth');
const width = targetEl.clientWidth;
const height = targetEl.clientHeight;


/********** SETUP SCENE ***********/

export const scene = new Scene();


/********** SETUP CAMERA **********/

export const camera = new PerspectiveCamera(
  75,
  width / height,
  0.1,
  1000
);

camera.position.set(0, 0, 10);


/********** GROUP **********/

export const group = new Group();


/********** SETUP RENDERER **********/

export const renderer = new WebGLRenderer({ antialias: true });

renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);


/********** MOUSE INTERACTION **********/

export const mouse = { x: undefined, y: undefined };

targetEl.addEventListener('mousemove', event => {
  mouse.x = (event.clientX / width) * 2 - 1;
  mouse.y = (event.clientY / height) * 2 + 1;
});

export function mouseInteraction() {
  gsap.to(group.rotation, {
    x: mouse.y * 0.075,
    y: mouse.x * 0.1,
    duration: 4
  });
}
