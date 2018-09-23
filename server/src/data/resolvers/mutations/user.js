import bcrypt from 'bcrypt'
import User from './../../connectors/User'

import { PERMISSION_LEVEL, UNAUTHORIZED } from './constants'

async function update_user(_, { id, input }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    const data = { ...input }

    if (input.password) {
      data.password = await bcrypt.hash(input.password, 10)
    }

    User.update(id, data)

    return User.find(id)
  }

  throw new Error(UNAUTHORIZED)
}

async function create_user(_, { input }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    const data = { ...input }

    data.password = await bcrypt.hash(input.password, 10)

    User.create(data)

    return User.findByEmail(data.email)
  }

  throw new Error(UNAUTHORIZED)
}

async function delete_user(_, { id }, context) {
  if (context.user && context.user.permission_level === PERMISSION_LEVEL) {
    User.destroy(id)
    return id
  }

  throw new Error(UNAUTHORIZED)
}

export default { update_user, create_user, delete_user }
