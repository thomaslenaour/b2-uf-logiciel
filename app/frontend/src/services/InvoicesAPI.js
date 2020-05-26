import Axios from 'axios'

function find(id) {
  return Axios.get(`http://localhost:5000/api/invoices/${id}`)
}

function create(id) {
  return Axios.post(`http://localhost:5000/api/invoices/${id}`)
}

function findAll() {
  return Axios.get('http://localhost:5000/api/invoices')
}

export default {
  find,
  create,
  findAll
}
