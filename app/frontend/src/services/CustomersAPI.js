import Axios from 'axios'

function findAll() {
  return Axios.get('http://localhost:5000/api/customers')
}

function findById(id) {
  return Axios.get(`http://localhost:5000/api/customers/${id}`)
}

function update(id, data) {
  return Axios.patch(`http://localhost:5000/api/customers/${id}`, data)
}

function create() {
  return Axios.post('http://localhost:5000/api/customers')
}

export default {
  findAll,
  findById,
  create,
  update
}
