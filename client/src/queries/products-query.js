import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    price
    category_id
    image
  }
`;

export const PRODUCT_QUERY = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      ...ProductFragment
      category {
        id
        name
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const PRODUCTS_QUERY = gql`
  {
    products {
      id
      ...ProductFragment
      category {
        id
        name
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ProductsQuery = ({children}) => {
  return (
    <Query query={PRODUCTS_QUERY}>
      {props => children({...props, products: get(props, 'data.products', [])})}
    </Query>
  );
};

export const ProductQuery = ({children, variables}) => {
  return (
    <Query query={PRODUCT_QUERY} variables={variables}>
      {props => children({...props, product: get(props, 'data.product', [])})}
    </Query>
  );
};
