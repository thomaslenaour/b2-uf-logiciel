import Axios from 'axios'

function createUser(user) {
  return Axios.post('http://localhost:5000/api/users/signup', user)
}

function findById(id) {
  return Axios.get(`http://localhost:5000/api/users/${id}`)
}

function update(id, data) {
  return Axios.patch(`http://localhost:5000/api/users/${id}`, data)
}

export default {
  createUser,
  findById,
  update
}
