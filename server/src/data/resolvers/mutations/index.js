import login from './login'
import user from './user'
import category from './category'
import product from './product'

export default {
  login,
  create_user: user.create_user,
  update_user: user.update_user,
  delete_user: user.delete_user,

  create_category: category.create_category,
  update_category: category.update_category,
  delete_category: category.delete_category,

  create_product: product.create_product,
  update_product: product.update_product,
  delete_product: product.delete_product
}
