import React from 'react';
import Select from 'react-select';

import CategoriesQuery from 'queries/categories-query';

export default props => {
  return (
    <CategoriesQuery>
      {({categories, loading}) => {
        return (
          <Select
            options={categories}
            {...props}
            defaultValue={categories.find(
              option => option.id === props.defaultValue
            )}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            isLoading={loading}
          />
        );
      }}
    </CategoriesQuery>
  );
};
