import auth from './auth';
import home from './home';
import NotFound from './errors/notfound';
import dashboard from './dashboard';
import users from './users';
import products from './products';
import categories from './categories';

const routes = [
  dashboard,
  categories,
  products,
  users,
  auth,
  home,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
