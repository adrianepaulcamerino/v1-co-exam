import Category from '../../connectors/Category'

export default async function(root, { id }) {
  const category = await Category.findOne(id)

  if (!category) {
    throw new Error(`No user found with id ${id}`)
  }

  return category
}
