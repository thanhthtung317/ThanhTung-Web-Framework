import { UserEdit } from './views/UserEdit';
import { User } from './models/User';

const root = document.querySelector('#root');

const user = User.buildUser({ name: 'new name', age: 10 });

if (root) {
  const userEdit = new UserEdit(root, user);
  userEdit.render();
} else {
  throw new Error('root element not found');
}
