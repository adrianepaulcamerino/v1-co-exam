import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET_KEY, JWT_EXP } from './../../../config'

import User from './../../connectors/User'

export default async function login(_, { email, password }) {
  const user = User.findByEmail(email)

  if (!user) {
    throw new Error(`Unable to find user with email ${email}`)
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    throw new Error('Incorrect password')
  }

  const jwtConfig = {
    expiresIn: JWT_EXP
  }

  return jsonwebtoken.sign(
    { id: user.id, email: user.email, permission_level: user.permission_level },
    JWT_SECRET_KEY,
    jwtConfig
  )
}
