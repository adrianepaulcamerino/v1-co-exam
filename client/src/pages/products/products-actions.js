import React from 'react';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';
import {TableFilters} from 'components/Table';

export default class extends React.Component {
  render() {
    return (
      <TableFilters>
        <Row>
          <Col md={2} />
          <Col md={2} />
          <Col md={2} />
          <Col md={4} />
          <Col md={2}>
            <Link to="/products/create" className="float-right btn btn-primary">
              <i className="fa fa-plus" /> Add Product
            </Link>
          </Col>
        </Row>
      </TableFilters>
    );
  }
}
