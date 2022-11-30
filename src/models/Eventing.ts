import { Events } from './Model';

type Callback = () => void;

export class Eventing implements Events {
  private events: {
    [key: string]: Callback[];
  } = {};

  on = (eventName: string, callback: Callback) => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  };

  trigger = (eventName: string) => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    handlers.forEach((callback) => callback());
  };
}
