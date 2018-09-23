import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component {
  state = {};

  render() {
    return (
      <ul className="sidebar navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-home" />
            <span> Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/Categories">
            <i className="fas fa-fw fa-user-clock" />
            <span> Category</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/products">
            <i className="fas fa-fw fa-calendar-alt" />
            <span> Products</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/users">
            <i className="fas fa-fw fa-users" />
            <span> Users</span>
          </Link>
        </li>
      </ul>
    );
  }
}

export default Sidebar;
