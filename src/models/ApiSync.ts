import axios, { AxiosPromise } from 'axios';
import { Sync } from './Model';

type HasId = {
  id?: number;
};

export class ApiSync<T extends HasId> implements Sync<T> {
  constructor(private rootUrl: string) {}

  async fetch(id: number): AxiosPromise {
    return await axios.get(`${this.rootUrl}/${id}`);
  }

  async save(data: T): AxiosPromise {
    const id = data.id;

    if (!id) {
      return await axios.post(this.rootUrl, data);
    }
    return await axios.put(`${this.rootUrl}/${id}`, data);
  }
}
