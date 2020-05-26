import Axios from 'axios'

const Store = window.require('electron-store')

const store = new Store()

function logout() {
  // 1 / Supprimer le token qui est stocké
  // window.localStorage.removeItem("authToken");
  store.delete('token')
  delete Axios.defaults.headers.Authorization
}

function setAxiosToken(token) {
  Axios.defaults.headers.Authorization = `Bearer ${token}`
}

function authenticate(credentials) {
  return Axios.post('http://localhost:5000/api/users/login', credentials).then(
    response => response.data
  )
}

function isAuthenticated() {
  // 1.Voir si un token est stockée
  const token = store.get('token')
  console.log(token)
  if (token) {
    return true
  }
  return false
}

export default {
  logout,
  setAxiosToken,
  authenticate,
  isAuthenticated
}
