import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';

import {DeleteProductMutation} from 'mutations/products-mutations';
import {ProductsQuery} from 'queries/products-query';
import {Table} from 'components/Table';
import AvatarInfo from 'components/Avatar/AvatarInfo';
import CardActions from './products-actions';
import Confirm from 'components/Dialogs/Confirm';
import Loader from 'components/Loader';
import TableActions from 'components/Table/TableActions';

class Component extends React.Component {
  get headers() {
    return ['Name', 'Category', 'Actions'];
  }

  getTableActions() {}

  onConfirm = mutation => {
    return async ({payload}) => {
      await mutation({variables: {id: payload.id}});
    };
  };

  getTableActions = payload => {
    let actions = [
      {label: 'Edit', href: `/products/${payload.id}/edit`},
      {
        label: 'Delete',
        type: 'delete',
        color: 'text-danger',
      },
    ];

    return actions;
  };

  onClickAction = data => {
    if (data.type === 'delete') {
      this.confirm.open({
        isOpen: true,
        title: 'Delete',
        content: 'Are you sure want to delete item?',
        payload: data,
      });
      return;
    }
  };

  renderItem = item => {
    return (
      <tr key={item.id}>
        <td>
          <AvatarInfo
            to={`/products/${item.id}/edit`}
            src={item.image}
            name={item.name}
            email={`$${item.price}`}
          />
        </td>
        <td>{item.category.name}</td>
        <td>
          <div className="d-flex justify-content-center">
            <TableActions
              buttonLabel="Actions"
              payload={item}
              items={this.getTableActions(item)}
              onClick={this.onClickAction}
            />
          </div>
        </td>
      </tr>
    );
  };

  render() {
    return (
      <ProductsQuery>
        {({loading, products}) => {
          return (
            <Card>
              <Loader show={loading} />
              <CardHeader>Manage Products</CardHeader>
              <CardActions />
              <CardBody className="position-relative">
                <Table headers={this.headers}>
                  {products.map(item => {
                    return this.renderItem(item);
                  })}
                </Table>
                <DeleteProductMutation>
                  {({delete_product}) => {
                    return (
                      <Confirm
                        ref={confirm => (this.confirm = confirm)}
                        onSubmit={this.onConfirm(delete_product)}
                      />
                    );
                  }}
                </DeleteProductMutation>
              </CardBody>
            </Card>
          );
        }}
      </ProductsQuery>
    );
  }
}

export default Component;
