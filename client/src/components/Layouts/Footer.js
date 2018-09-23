import React, {Component} from 'react';

import cx from 'classnames';

class Footer extends Component {
  render() {
    return (
      <footer
        className={cx('sticky-footer', {
          ['sticky-footer--expand']: this.props.sidebar === false,
        })}
      >
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>
              Copyright &copy; {process.env.APP_NAME || 'Laragym'} 2018
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
