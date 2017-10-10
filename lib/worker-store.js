class Store {
  constructor(WorkerCreator) {
    this.requestId = 0;
    this.worker = new WorkerCreator();
    this.listeners = [];
    this.worker.addEventListener('message', this.onMessage.bind(this));
    this.run = this.run.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  getState() {
    return this.state;
  }

  onMessage({ data }) {
    const { type, payload } = data;
    if (type === 'update') {
      this.state = payload;
      this.listeners.forEach(listener => {
        listener(this.state);
      });
    }
  }

  async run(type, payload) {
    return await new Promise((resolve, reject) => {
      const currentId = this.requestId++;
      const listener = ({ data }) => {
        const { id, payload, error } = data;
        if (id === currentId) {
          if (error) {
            reject(payload);
          } else {
            resolve(payload);
          }
          this.worker.removeEventListener('message', listener);
        }
      }
      this.worker.addEventListener('message', listener);
      this.worker.postMessage({
        id: currentId,
        type: type,
        payload,
      });
    });
  }

  async init() {
    await this.run('init');
  }

  async dispatch(action) {
    return await this.run('dispatch', action);
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }
}

export default Store;
