import { SubHandler } from './types';

class EventServer {
  subscribers: Array<SubHandler>;

  root: HTMLDivElement | null;

  constructor() {
    this.subscribers = [];
    this.root = null;
  }

  setRoot(ref: HTMLDivElement | null) {
    this.root = ref;
  }

  subscribe(handler: SubHandler) {
    this.subscribers = this.subscribers.concat(handler);
  }

  unsubscribe(handler: SubHandler) {
    this.subscribers = this.subscribers.filter((current: SubHandler) => current !== handler);
  }
}

export default new EventServer();
