class EventEmitter {
    private eventStore: Map<string, EventCallback[]>;

    constructor() {
        this.eventStore = new Map();
    }

    subscribe(event: string, callback: EventCallback) {
        if (!this.eventStore.has(event)) {
            this.eventStore.set(event, []);
        }

        this.eventStore.get(event)!.push(callback);
    }

    emit(event: string, data?: unknown) {
        if (!this.eventStore.has(event)) return;
        this.eventStore.get(event)!.forEach((cb) => cb(data));
    }
}

export default EventEmitter;
