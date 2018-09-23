import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import get from 'lodash/get';

const CATEGORIES_QUERY = gql`
  {
    categories {
      id
      name
    }
  }
`;

export default function({children}) {
  return (
    <Query query={CATEGORIES_QUERY}>
      {props =>
        children({...props, categories: get(props, 'data.categories', [])})
      }
    </Query>
  );
}
