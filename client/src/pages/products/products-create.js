import React from 'react';
import {Card, CardBody} from 'reactstrap';
import Form from './product-form';
import Breadcrumbs from 'components/Breadcrumbs';

import {CreateProductMutation} from 'mutations/products-mutations';

class Component extends React.Component {
  state = {};

  get previous() {
    return [
      {
        to: '/products',
        label: 'Products',
      },
    ];
  }

  onSubmit = create_product => {
    return async input => {
      await create_product({variables: {input}});

      this.props.history.push('/products');
    };
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Create Product" />
        <Card>
          <CardBody>
            <CreateProductMutation>
              {({create_product}) => {
                return <Form onSubmit={this.onSubmit(create_product)} />;
              }}
            </CreateProductMutation>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
