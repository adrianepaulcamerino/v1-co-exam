import Category from './../connectors/Category'
import mutations from './mutations'
import queries from './queries'

export default {
  Query: {
    ...queries
  },
  Product: {
    category(product) {
      return Category.findOne(product.category_id)
    }
  },
  Mutation: mutations
}
