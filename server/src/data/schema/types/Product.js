export default `
  type Product {
    id: ID!,
    name: String!,
    price: String!,
    category_id: ID!,
    category: Category,
    image: String!
  }
`
