import React from 'react';
import {Card, CardBody} from 'reactstrap';
import Form from './product-form';
import Breadcrumbs from 'components/Breadcrumbs';

import {ProductQuery} from 'queries/products-query';
import {UpdateProductMutation} from 'mutations/products-mutations';

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

  onSubmit = update_product => {
    return async input => {
      const id = this.props.match.params.id;
      await update_product({variables: {id, input}});
    };
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs previous={this.previous} active="Update Product" />
        <Card>
          <CardBody>
            <ProductQuery variables={{id: this.props.match.params.id}}>
              {({product, error}) => {
                if (error) {
                  return 'Product was not found';
                }
                return (
                  <UpdateProductMutation>
                    {({update_product}) => {
                      return (
                        <Form
                          onSubmit={this.onSubmit(update_product)}
                          {...product}
                        />
                      );
                    }}
                  </UpdateProductMutation>
                );
              }}
            </ProductQuery>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Component;
