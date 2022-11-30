import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

class Collection<T, K>{
    private users:T[] = []
    private events:Eventing = new Eventing()

    constructor(private rootUrl: string, private deserialize:(json:K)=>T){}

    get on(){
        return this.events.on
    }

    get trigger(){
        return this.events.trigger
    }

    async fetch(){
        try {
            const resp:AxiosResponse = await axios.get(`${this.rootUrl}`)
            resp.data.forEach((value:K) => {
                const user = this.deserialize(value)
                this.users.push(user)
            });
            this.events.trigger('change')
        } catch (error) {
            this.events.trigger('error')
            throw new Error('Cannot do fetch operation')
        }
    }
}

export {
    Collection
}