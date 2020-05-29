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

function create(data) {
  return Axios.post('http://localhost:5000/api/customers', data)
}

function remove(id) {
  return Axios.delete(`http://localhost:5000/api/customers/${id}`)
}

export default {
  findAll,
  findById,
  create,
  update,
  remove
}
