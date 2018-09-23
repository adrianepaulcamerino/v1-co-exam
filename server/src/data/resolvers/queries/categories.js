import Category from '../../connectors/Category'

export default async function(root, { id }) {
  const categories = await Category.all(id)
  return categories
}
