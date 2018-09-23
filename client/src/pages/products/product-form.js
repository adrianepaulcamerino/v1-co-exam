import React from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import serialize from 'form-serialize';

import CategoriesQuery from 'queries/categories-query';
import notify from 'utils/notify';

export default class extends React.Component {
  _isMounted = false;

  static defaultProps = {
    successMessage: 'Successfully submitted',
    name: undefined,
    price: undefined,
    category_id: undefined,
    category: {},
    onSubmit: () => {},
  };

  state = {
    isSubmitting: false,
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSubmit = async event => {
    try {
      event.preventDefault();
      this.setState({isSubmitting: true});
      const form = event.target;
      const data = serialize(form, {hash: true});
      await this.props.onSubmit(data);
      notify({
        type: 'success',
        text: this.props.successMessage,
      });

      if (this._isMounted) {
        this.setState({
          isSubmitting: false,
        });
      }
    } catch (error) {
      notify({
        type: 'error',
        text: error.message,
      });
      this.setState({isSubmitting: false});
    }
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="Name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            defaultValue={this.props.name}
            disabled={this.state.isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label for="price">Amount</Label>
          <Input
            type="number"
            name="price"
            id="price"
            required
            defaultValue={this.props.price}
            disabled={this.state.isSubmitting}
          />
        </FormGroup>

        <CategoriesQuery>
          {({categories}) => {
            return (
              <FormGroup>
                <Label for="price">Category</Label>
                <select
                  className="form-control"
                  name="category_id"
                  defaultValue={this.props.category_id}
                >
                  {categories.map(c => {
                    return (
                      <option
                        key={c.id}
                        value={c.id}
                        selected={c.id === this.props.category_id}
                      >
                        {c.name}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            );
          }}
        </CategoriesQuery>

        <Button
          color="primary"
          className="float-right"
          disabled={this.state.isSubmitting}
        >
          {this.state.isSubmitting ? 'Please Wait...' : 'Submit Form'}
        </Button>
      </Form>
    );
  }
}
