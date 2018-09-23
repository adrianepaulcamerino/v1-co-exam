import uuid from 'uuid/v4'

let USERS = [
  {
    id: '964e66e5-0a54-4748-8948-2e25c2a33c9c',
    email: 'admin@admin.com',
    name: 'John Dave Decano',
    password: '$2b$10$6e.1G./s99vFI.umAs4FuOVhpaVtVpoYdyIjusZBTxkgLMunnbZ76',
    permission_level: 2
  },
  {
    id: 'a023d08e-461d-41db-aed3-45dc62830c26',
    name: 'Sahid Abas',
    email: 'user2@example.com',
    password: '$2b$10$6e.1G./s99vFI.umAs4FuOVhpaVtVpoYdyIjusZBTxkgLMunnbZ76',
    permission_level: 1
  },
  {
    id: '1f76de53-b2bd-45b8-a5d8-434d4a1eef00',
    name: 'Prakesh Kumar',
    email: 'user3@example.com',
    password: '$2b$10$6e.1G./s99vFI.umAs4FuOVhpaVtVpoYdyIjusZBTxkgLMunnbZ76',
    permission_level: 1
  }
]

export default {
  all() {
    return USERS
  },
  findOne(id) {
    return USERS.find(user => user.id === id)
  },
  findByEmail(email) {
    return USERS.find(user => user.email === email)
  },
  create(user) {
    const id = uuid()

    const exists = USERS.filter(x => x.email === user.email)

    if (exists.length > 0) {
      throw new Error('User already exists')
    }

    USERS = USERS.concat([
      {
        id,
        ...user
      }
    ])

    return id
  },
  update(id, user) {
    USERS = USERS.map(p => {
      if (p.id === id) {
        return {
          ...p,
          ...user
        }
      }
      return p
    })
  },
  destroy(id) {
    USERS = USERS.filter(p => p.id === id)
  }
}
