import React, {Component} from 'react';
import serialize from 'form-serialize';
import get from 'lodash/get';
import {ProductsQuery} from 'queries/products-query';
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Form,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

import AvatarInfo from 'components/Avatar/AvatarInfo';
import Loader from 'components/Loader';

export default class extends Component {
  state = {
    products: {},
  };

  onSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const data = serialize(form, {hash: true});

    const product = get(this.state.products, data.id, {
      id: '',
      image: '',
      name: data.name,
      quantity: 0,
      price: 0,
    });

    const price = Number(product.price) + Number(data.price);

    this.setState({
      products: {
        ...this.state.products,
        [data.id]: {
          id: data.id,
          image: data.image,
          name: data.name,
          quantity: Number(product.quantity) + Number(data.quantity),
          price,
        },
      },
    });
  };

  renderItem = item => {
    return (
      <Col md={3} key={item.id} className="mb-3">
        <Card>
          <CardImg top width="100%" src={item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            <CardSubtitle className="text-muted">${item.price}</CardSubtitle>
            <div className="mt-2">
              <Form onSubmit={this.onSubmit}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="submit">Add to cart</Button>
                  </InputGroupAddon>
                  <Input type="hidden" value={item.id} name="id" />
                  <Input type="hidden" value={item.name} name="name" />
                  <Input type="hidden" value={item.image} name="image" />
                  <Input type="hidden" value={item.price} name="price" />
                  <Input
                    name="quantity"
                    type="number"
                    defaultValue="1"
                    min="1"
                  />
                </InputGroup>
              </Form>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  };

  renderCart = id => {
    const item = this.state.products[id];
    return (
      <ListGroupItem key={item.id}>
        <AvatarInfo
          to={`/products/${item.id}/edit`}
          src={item.image}
          name={item.name}
          email={`$${item.price} for ${item.quantity}`}
        />
      </ListGroupItem>
    );
  };

  get total() {
    let total = 0;

    Object.keys(this.state.products).map(id => {
      total = total + this.state.products[id].price;
    });

    return total;
  }

  renderCartItems() {
    const keys = Object.keys(this.state.products);

    if (keys.length === 0) {
      return <p>Cart is empty!</p>;
    }

    return (
      <React.Fragment>
        <ListGroup>
          {keys.map(id => {
            return this.renderCart(id);
          })}
        </ListGroup>
        <hr />
        <strong>Total {this.total}</strong>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Row>
        <Col md={9}>
          <Row>
            <ProductsQuery>
              {({loading, products}) => {
                if (loading) return <Loader show />;
                return products.map(item => this.renderItem(item));
              }}
            </ProductsQuery>
          </Row>
        </Col>
        <Col md={3}>
          <Card>
            <CardHeader>Cart</CardHeader>
            <CardBody className="position-relative">
              {this.renderCartItems()}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
