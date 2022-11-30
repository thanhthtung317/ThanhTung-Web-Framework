import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserCollection(){
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) => User.buildUser(json));
  }

  get isAdmin():boolean{
    return this.get('id') === 1
  }

  setRandomAge():void{
    const randomAge = Math.floor(Math.random()*100)
    this.set({age:randomAge})
  }
}
