import React from 'react';
import Avatar from './';
import {Link} from 'react-router-dom';

export default class extends React.Component {
  render() {
    return (
      <Link to={this.props.to}>
        <div className="float-left pr-2 d-flex align-items-center justify-content-end">
          <Avatar src={this.props.src} />
        </div>
        <div className="float-left">
          {this.props.name}
          <div>
            <span className="small text-muted">{this.props.email}</span>
          </div>
        </div>
      </Link>
    );
  }
}
