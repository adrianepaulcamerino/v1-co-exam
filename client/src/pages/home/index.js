import React from 'react';
import Loadable from 'components/Loadable';
import {PublicLayout} from 'components/Layouts';

import renderRoutes from './../routes';

export default {
  exact: false,
  auth: false,
  path: '/',
  component: ({routes}) => {
    return <PublicLayout>{renderRoutes(routes)}</PublicLayout>;
  },
  routes: [
    {
      exact: true,
      auth: false,
      path: '/',
      component: Loadable({
        loader: () => import('./home'),
      }),
    },
  ],
};
