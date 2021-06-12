class RenderQueue {
  constructor() {
    this.queue = []; // Contains an array of wrappers for matter.js bodies
  }

  add(worldObject) {
    this.queue.push(worldObject);
  }

  remove(id) {
    this.queue.filter(worldObject => worldObject.body.id !== id);
  }

  render() {
    this.queue.forEach(worldObject => {
      worldObject.render();
      worldObject.update();
    });
  }
}

export default RenderQueue;
