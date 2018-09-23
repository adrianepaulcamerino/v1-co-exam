import React from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

import {PRODUCTS_QUERY} from 'queries/products-query';

const CREATE_PRODUCT = gql`
  mutation create_product($input: ProductInput) {
    create_product(input: $input) {
      id
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation update_product($id: ID!, $input: ProductInput) {
    update_product(id: $id, input: $input) {
      id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation delete_product($id: ID!) {
    delete_product(id: $id)
  }
`;

export const CreateProductMutation = ({children}) => {
  return (
    <Mutation
      mutation={CREATE_PRODUCT}
      refetchQueries={[
        {
          query: PRODUCTS_QUERY,
        },
      ]}
    >
      {(create_product, props) => children({create_product, ...props})}
    </Mutation>
  );
};

export const DeleteProductMutation = ({children}) => {
  return (
    <Mutation
      mutation={DELETE_PRODUCT}
      refetchQueries={[
        {
          query: PRODUCTS_QUERY,
        },
      ]}
    >
      {(delete_product, props) => children({delete_product, ...props})}
    </Mutation>
  );
};

export const UpdateProductMutation = ({children}) => {
  return (
    <Mutation
      mutation={UPDATE_PRODUCT}
      refetchQueries={[
        {
          query: PRODUCTS_QUERY,
        },
      ]}
    >
      {(update_product, props) => children({update_product, ...props})}
    </Mutation>
  );
};
