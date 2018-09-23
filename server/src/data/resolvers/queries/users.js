import User from '../../connectors/User'

export default async function() {
  return User.all()
}
