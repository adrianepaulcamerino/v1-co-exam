import Product from '../../connectors/Product'

export default async function(root, { id }) {
  const products = await Product.all(id)

  return products
}
