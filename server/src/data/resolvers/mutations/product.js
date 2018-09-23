import Product from './../../connectors/Product'

import { PERMISSION_LEVEL, UNAUTHORIZED } from './constants'

async function update_product(_, { id, input }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    Product.update(id, input)
    return Product.find(id)
  }

  throw new Error(UNAUTHORIZED)
}

async function create_product(_, { input }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    const id = Product.create(input)
    return Product.find(id)
  }

  throw new Error(UNAUTHORIZED)
}

async function delete_product(_, { id }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    Product.destroy(id)
    return id
  }

  throw new Error(UNAUTHORIZED)
}

export default { update_product, create_product, delete_product }
