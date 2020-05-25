import Axios from 'axios'

function logout() {
  // 1 / Supprimer le token qui est stocké
  // window.localStorage.removeItem("authToken");

  delete Axios.defaults.headers.Authorization
}

function setAxiosToken(token) {
  Axios.defaults.headers.Authorization = `Bearer ${token}`
}

function authenticate(credentials) {
  return Axios.post('http://localhost:5000/api/users/login', credentials).then(
    response => response.data.token
  )
  // .then(STOCKER LE TOKEN DANS LE STORAGE + AJOUT DU TOKEN A AXIOS AVEC LA METHODE AU-DESSUS)
}

function setup() {
  // 1.Voir si un token est stockée
  const token = window.localStorage.getItem('authToken')

  // 2.Vérifier que le token est bien valide
  // if (token) {
  //   const { exp: expiration } = JwtDecode(token)
  //   if (expiration * 1000 > new Date().getTime()) {
  //    setAxiosToken(token)
  //  }
  // }
}

export default {
  logout,
  setAxiosToken,
  authenticate,
  setup
}
