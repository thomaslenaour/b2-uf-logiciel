import Axios from 'axios'

function createUser(user){
  return Axios.post("http://localhost:5000/api/users/signup", user);
}

export default {
  createUser
}