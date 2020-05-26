import Axios from 'axios'

const Store = window.require('electron-store')

const store = new Store()

function logout() {
  store.delete('token')
  delete Axios.defaults.headers.Authorization
}

function setAxiosToken(token) {
  Axios.defaults.headers.Authorization = `Bearer ${token}`
}

function authenticate(credentials) {
  return Axios.post('http://localhost:5000/api/users/login', credentials).then(
    response => {
      setAxiosToken(response.data.token)
      return response.data
    }
  )
}

function setup() {
  // 1.Voir si un token est stockée
  const token = store.get('token')

  // 2.Vérifier que le token est bien valide
  if (token) {
    setAxiosToken(token)
  }
}

function isAuthenticated() {
  const token = store.get('token')
  if (token) {
    return true
  }
  return false
}

export default {
  logout,
  setAxiosToken,
  authenticate,
  isAuthenticated,
  setup
}
