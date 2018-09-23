import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    price
    category_id
    image
  }
`;

const PRODUCT_QUERY = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCTS_QUERY = gql`
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

export const ProductQuery = ({children}) => {
  return (
    <Query query={PRODUCT_QUERY}>
      {props => children({...props, product: get(props, 'data.product', [])})}
    </Query>
  );
};
