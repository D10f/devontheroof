type HeapNode<T> = {
  value: T;
  priority: number;
};

class PriorityQueue<T extends { id: string }> {

  private heap: HeapNode<T>[];
  public membership: Set<string>;

  constructor() {
    this.heap = [];
    this.membership = new Set<string>();
  }

  get size() {
    return this.heap.length;
  }

  get isEmpty() {
    return this.size === 0;
  }

  get root() {
    return this.isEmpty ? null : this.heap[0];
  }

  enqueue(node: HeapNode<T>) {
    if (node.value === null || node.value === undefined) return null;

    this.heap.push(node);
    this.membership.add(node.value.id);
    this.bubbleUp(this.size - 1);
    return this.size;
  }

  dequeue() {
    if (this.isEmpty) return null;
    this.swap(0, this.size - 1);
    const node = this.heap.pop() as HeapNode<T>;
    this.bubbleDown();
    this.membership.delete(node.value.id);
    return node.value;
  }

  contains(value: T) {
    return this.membership.has(value.id);
  }

  private compare(n1: HeapNode<T>, n2: HeapNode<T>) {
    return n1.priority > n2.priority;
  }

  private getLeftNodeIdx(idx: number) {
    return 2 * idx + 1;
  }

  private getRightNodeIdx(idx: number) {
    return 2 * idx + 2;
  }

  private getParentNodeIdx(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  private bubbleDown(idx = 0) {
    const leftNodeIdx = this.getLeftNodeIdx(idx);
    const rightNodeIdx = this.getRightNodeIdx(idx);

    const leftNode = this.heap[leftNodeIdx];
    const rightNode = this.heap[rightNodeIdx];

    let currentIdx = idx;

    if (leftNodeIdx < this.size && this.compare(this.heap[currentIdx], leftNode)) {
      currentIdx = leftNodeIdx;
    }

    if (rightNodeIdx < this.size && this.compare(this.heap[currentIdx], rightNode)) {
      currentIdx = rightNodeIdx;
    }

    if (currentIdx !== idx) {
      this.swap(idx, currentIdx);
      this.bubbleDown(currentIdx);
    }
  }

  private bubbleUp(idx: number) {
    let parentIdx = this.getParentNodeIdx(idx);

    while (idx > 0 && this.compare(this.heap[parentIdx], this.heap[idx])) {
      this.swap(parentIdx, idx);
      idx = parentIdx;
      parentIdx = this.getParentNodeIdx(idx);
    }
  }

  private swap(idx1: number, idx2: number) {
    const temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    this.heap[idx2] = temp;
  }
}

export default PriorityQueue;
