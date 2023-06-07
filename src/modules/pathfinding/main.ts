// import Canvas from './Canvas';
import TilePicker from './web-components/tile-picker';
// import './style.css';

customElements.define('tile-picker', TilePicker);

const app = document.getElementById('app') as HTMLDivElement;
// const canvasEl = document.createElement('canvas') as HTMLCanvasElement;
const tilePicker = document.createElement('tile-picker');

// canvasEl.width = 800;
// canvasEl.height = 600;

// app.insertAdjacentElement('beforeend', canvasEl);
app.insertAdjacentElement('beforeend', tilePicker);

// const canvas = new Canvas(canvasEl);

// canvas.init();

