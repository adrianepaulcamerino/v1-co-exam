import uuid from 'uuid/v4'

let CATEGORIES = [
  {
    id: '1a94845b-843e-4b2a-b1f9-b6507dca4323',
    name: 'Gadgets'
  },
  {
    id: '1a94845b-843e-4b2a-b1f9-b6507dca4326',
    name: 'Home'
  },
  {
    id: '1a94845b-843e-4b2a-b1f9-b6507dca4373',
    name: 'Garage'
  }
]

export default {
  all() {
    return CATEGORIES
  },
  findOne(id) {
    return CATEGORIES.find(category => category.id === id)
  },
  create(category) {
    const id = uuid()

    CATEGORIES = CATEGORIES.concat([
      {
        id,
        ...category
      }
    ])

    return id
  },
  update(id, category) {
    CATEGORIES = CATEGORIES.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...category
        }
      }
      return p
    })
  },
  destroy(id) {
    CATEGORIES = CATEGORIES.filter(p => p.id !== id)
  }
}
