import uuid from 'uuid/v4'

let products = [
  {
    id: 'a023d08e-461d-41db-aed3-45dc62830c26',
    name: 'Product 1',
    category_id: '1a94845b-843e-4b2a-b1f9-b6507dca4323',
    price: 1.25,
    image: 'https://placeimg.com/640/480/any'
  },
  {
    id: '1f76de53-b2bd-45b8-a5d8-434d4a1eef00',
    name: 'Product 2',
    category_id: '1a94845b-843e-4b2a-b1f9-b6507dca4373',
    price: 1.25,
    image: 'https://placeimg.com/640/480/any'
  },
  {
    id: '1a94845b-843e-4b2a-b1f9-b6507dca4323',
    name: 'Product 3',
    category_id: '1a94845b-843e-4b2a-b1f9-b6507dca4326',
    price: 1.25,
    image: 'https://placeimg.com/640/480/any'
  }
]

export default {
  all() {
    return products
  },
  findOne(id) {
    return products.find(product => product.id === id)
  },
  create(product) {
    const id = uuid()

    products = products.concat([
      {
        id,
        image: 'https://placeimg.com/640/480/any',
        ...product
      }
    ])

    return id
  },
  update(id, product) {
    products = products.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...product
        }
      }
      return p
    })
  },
  destroy(id) {
    products = products.filter(p => p.id === id)
  }
}
