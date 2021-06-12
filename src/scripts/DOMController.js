const projectData = {
  tetris: {
    title: 'Tetris',
    description: 'An all time 8-bit classic, Tetris!',
    controls: [ 'Esc', 'P', '&uarr;', '&darr;', '&larr;',' &rarr;', 'Space' ],
    links: [
      'https://github.com/herokunt/javascript_ramblings/blob/main/2D/tetris.js',
      'https://editor.p5js.org/fall-parameter/sketches/-8YjzbeP0'
    ]
  },
  snake: {
    title: 'Snake',
    description: 'Another oldie classic that needs no introduction.',
    controls: [ 'Esc', 'P', '&uarr;', '&darr;', '&larr;',' &rarr;' ],
    links: [
      'https://github.com/herokunt/javascript_ramblings/blob/main/2D/snake.js',
      'https://editor.p5js.org/fall-parameter/sketches/_B_A8i0d1'
    ]
  },
  hangingLightbulb: {
    title: 'Hanging Lightbulb',
    description: 'One of my favorites, combines 2D physics with raycasting algorithm',
    controls: [ 'Esc', 'P', 'Click', 'Click & Drag' ],
    links: [
      'https://github.com/herokunt/javascript_ramblings/blob/main/2D/hanging_lightbulb.js',
      'https://editor.p5js.org/fall-parameter/sketches/iRAe03G1W'
    ]
  },
};

class DOMController {
  constructor(CanvasController, isMobileDevice) {
    this.projects = document.querySelector('.project__list');
    this.template = document.getElementById('project__template');

    if (isMobileDevice) {
      return this.mobileEvents();
    }

    this.canvasController = CanvasController;
    this.canvasDOM = document.getElementById('graphics1');
    this.currentSketch = new this.canvasController('empty', this.canvasDOM);
    this.events();
  }

  mobileEvents() {
    // selects the buttons of each project and assigns an event listener
    document.querySelectorAll('.project__list button').forEach(btn => {
      btn.addEventListener('click', () => {
        this.addProjectOverlay(btn.id);
      });
    });

    this.projects.addEventListener('click', (e) => {
      if (e.target.className === 'project__information--close') {
        this.removeProjectOverlay(e);
      }
    });
  }

  events() {
    // selects the buttons of each project and assigns an event listener
    document.querySelectorAll('.project__list button').forEach(btn => {
      btn.addEventListener('click', () => {
        this.changeSketch(btn.dataset.w, btn.dataset.h, btn.id);
      });
    });

    this.projects.addEventListener('click', (e) => {
      if (e.target.className === 'project__information--close') {
        this.resetCanvas();
        this.unlockScrolling();
      }
    });

    // resets canvas and body elements to original state.
    window.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 27: // escape key
          this.resetCanvas();
          this.unlockScrolling();
          this.removeProjectOverlay();
          break;
        case 80: // "p" for pause/play it serves as both
          const paused = this.currentSketch.current._loop;
          if (paused) this.currentSketch.current.resumeLoop();
          else this.currentSketch.current.stopLoop();
      }
    });
  }

  // Updates the canvas.
  changeSketch(width, height, sketch) {
    this.resizeCanvasContainer(width, height);
    this.resetCanvas(sketch);
    this.addProjectOverlay(sketch);
    this.lockScrolling();
  }

  // resizes the canvas wrapper to visually align the border on each update
  resizeCanvasContainer(w, h) {
    this.canvasDOM.style.width = `${Number(w) + 2}px`;
    this.canvasDOM.style.height = `${Number(h) + 2}px`;
  }

  // resets everything to original state
  resetCanvas(sketch) {
    this.currentSketch.current.destroy();
    this.currentSketch.current.remove();
    this.currentSketch = sketch
      ? new this.canvasController(sketch, this.canvasDOM)
      : new this.canvasController('empty', this.canvasDOM);
    this.removeProjectOverlay();
  }

  // some sketches use up and down arrows, this prevents body from scrolling
  lockScrolling() {
    document.body.style.overflowY = 'hidden';
    document.querySelector('#graphics0 h2').scrollIntoView();
  }

  unlockScrolling() {
    document.body.style.overflowY = 'auto';
  }

  // Generates a template using the projectData object above, and appends to body.
  addProjectOverlay(project) {
    const cloned = this.template.content.cloneNode(true);
    const controls = cloned.querySelector('.project__controls');

    cloned.querySelector('h3').textContent = projectData[project].title;
    cloned.querySelector('p').textContent = projectData[project].description;

    projectData[project].controls.forEach(key => {
      const span = document.createElement('span');
      span.className = 'project__control';
      span.innerHTML = key;
      controls.appendChild(span);
    });

    cloned.querySelectorAll('a').forEach((link, idx) => {
      link.href = projectData[project].links[idx];
    });

    this.projects.appendChild(cloned);
  };

  // removes the generated template
  removeProjectOverlay() {
    const overlay = this.projects.querySelector('aside');
    if (overlay) { // only remove the aside el, the overlay
      overlay.classList.add('project__information--remove');
      setTimeout(() => this.projects.lastElementChild.remove(), 250);
    }
  };
}

export default DOMController;
