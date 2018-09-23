import { makeExecutableSchema } from 'graphql-tools'

import resolvers from '../resolvers'
import types from './types'

const schema = `
  type Query {
    user(id: ID!) : User,
    users: [User],
    product(id: ID!) : Product,
    products: [Product],
    category(id: ID!) : Category,
    categories: [Category],
  }

  input UserInput {
    name: String!,
    email: String!,
    password: String!,
    permission_level: Int!,
  }

  input CategoryInput {
    name: String!,
  }

  input ProductInput {
    name: String!,
    category_id: ID!,
    price: String!,
  }

  type Mutation {
    login (email: String!, password: String!): String,
    create_user (input: UserInput): User,
    update_user (id: ID!, input: UserInput): User,
    delete_user (id: ID!): String,
    create_category (input: CategoryInput): Category,
    update_category (id: ID!, input: CategoryInput): Category,
    delete_category (id: ID!): String,
    create_product (input: ProductInput): Product,
    update_product (id: ID!, input: ProductInput): Product,
    delete_product (id: ID!): String,
  }

  schema {
    query: Query,
    mutation: Mutation
  }
`

export default makeExecutableSchema({
  typeDefs: [...types, schema],
  resolvers
})
