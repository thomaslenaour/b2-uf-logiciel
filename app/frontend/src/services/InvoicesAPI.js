import Axios from 'axios'

function findById(id) {
  return Axios.get(`http://localhost:5000/api/invoices/${id}`)
}

function findAll() {
  return Axios.get('http://localhost:5000/api/invoices')
}

function update(id, data) {
  return Axios.patch(`http://localhost:5000/api/invoices/${id}`, data)
}

function create(data) {
  return Axios.post('http://localhost:5000/api/invoices', data)
}

function remove(id) {
  Axios.delete(`http://localhost:5000/api/invoices/${id}`)
}

export default {
  findById,
  create,
  findAll,
  update,
  remove
}
