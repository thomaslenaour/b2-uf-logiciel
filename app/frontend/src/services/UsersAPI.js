import Axios from 'axios'

function createUser(user){
  return Axios.post(USERS_API, user);
}