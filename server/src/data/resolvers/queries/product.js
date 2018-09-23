import Product from '../../connectors/Product'

export default async function(root, { id }) {
  const product = await Product.findOne(id)

  if (!product) {
    throw new Error(`No user found with id ${id}`)
  }

  return product
}
