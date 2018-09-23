import React from 'react';
import {Helmet} from 'react-helmet';

import {LayoutConsumer} from 'contexts/layout-context';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default ({children}) => {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | E-Commerce Manager">
        <title>Dashboard</title>
      </Helmet>
      <LayoutConsumer>
        {({header, footer, sidebar}) => {
          return (
            <React.Fragment>
              {header && <Header />}
              <div id="wrapper">
                {sidebar && <Sidebar />}
                <div id="content-wrapper">
                  <div className="container-fluid position-relative">
                    {children}
                  </div>
                  {footer && <Footer sidebar={sidebar} />}
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </LayoutConsumer>
    </React.Fragment>
  );
};
