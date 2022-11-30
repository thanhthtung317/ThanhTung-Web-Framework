import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

type HasId = {
  id?: number;
};

class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;

  trigger = this.events.trigger;

  get = this.attributes.get;

  async fetch() {
    const id = this.attributes.get('id');

    if (typeof id !== 'number') {
      throw new Error('Invalid Id');
    }

    const resp: AxiosResponse = await this.sync.fetch(id);
    this.set(resp.data);
  }

  async save() {
    try {
      this.sync.save(this.attributes.getAll());
      this.events.trigger('save');
    } catch (error) {
      this.events.trigger('error');
    }
  }

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }
}

export { Model, Sync, ModelAttributes, Events };
