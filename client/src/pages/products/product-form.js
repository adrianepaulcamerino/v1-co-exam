import React from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import serialize from 'form-serialize';

import CategorySelect from 'components/Form/Select/CategorySelect';
import notify from 'utils/notify';

export default class extends React.Component {
  static defaultProps = {
    successMessage: 'Successfully submitted',
    name: undefined,
    price: undefined,
    category_id: undefined,
    onSubmit: () => {},
  };

  state = {
    isSubmitting: false,
  };

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

        <FormGroup>
          <Label for="price">Amount</Label>
          <CategorySelect
            name="category_id"
            defaultValue={this.props.category_id}
          />
        </FormGroup>

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
