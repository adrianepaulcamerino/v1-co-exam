import auth from './auth';
import home from './home';
import NotFound from './errors/notfound';

const routes = [
  home,
  auth,
  {
    path: '/404',
    component: NotFound,
  },
];

export default routes;
