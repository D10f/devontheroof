import { BufferGeometry, PointsMaterial, Points, Float32BufferAttribute } from 'three';

const TOTAL_STARS = 10_000;

const starGeometry = new BufferGeometry();
const starMaterial = new PointsMaterial({ color: 0xFFFFFF });

// Randomly generate a star field each with x, y and z positions
const starVertices = [];
for (let i = 0; i < TOTAL_STARS; i++) {
  const x = (Math.random() - 0.5) * 2_000;
  const y = (Math.random() - 0.5) * 2_000;
  const z = (Math.random() * 2000 + 100) * -1;
  starVertices.push(x, y, z);
}
// Update stars "position" attribute
starGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 3));

// Combine geometry (with update position) and material to create a Mesh
export const stars = new Points(starGeometry, starMaterial);
