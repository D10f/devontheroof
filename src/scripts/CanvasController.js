import p5 from 'p5';
import bubbles from './sketches/bubbles';
import empty from './sketches/empty';
import tetris from './sketches/tetris';
import snake from './sketches/snake';
import hangingLightbulb from './sketches/hangingLightbulb';
import angryMatter from './sketches/angryMatter/sketch';
import flowField from './sketches/flowfield/sketch';
import raycastRendering from './sketches/raycasting';
import solveTheMaze from './sketches/solveTheMaze';

export const SKETCH_LIST = {
  empty,
  bubbles,
  tetris,
  snake,
  hangingLightbulb,
  angryMatter,
  raycastRendering,
  flowField,
  solveTheMaze
};

class CanvasController {
  constructor(sketch, el) {
    this.canvasEl = el;
    this.sketch = SKETCH_LIST[sketch]
    this.current = new p5(this.sketch, this.canvasEl);
  };

  changeSketch(sketch) {
    this.current.destroy();
    return this._changeSketch(sketch);
  }

  _changeSketch(sketch) {
    return new Promise((resolve, reject) => {
      const instance = new p5(SKETCH_LIST[sketch], this.canvasEl);
      if (instance) {
        resolve(instance);
      } else {
        reject('Error during creation of the instance');
      }
    });
  }
}

export default CanvasController;
