import Category from './../../connectors/Category'

import { PERMISSION_LEVEL, UNAUTHORIZED } from './constants'

async function update_category(_, { id, input }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    Category.update(id, input)
    return Category.findOne(id)
  }

  throw new Error(UNAUTHORIZED)
}

async function create_category(_, { input }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    const id = Category.create(input)
    return Category.findOne(id)
  }

  throw new Error(UNAUTHORIZED)
}

async function delete_category(_, { id }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    Category.destroy(id)
    return id
  }
  throw new Error(UNAUTHORIZED)
}

export default { update_category, create_category, delete_category }
