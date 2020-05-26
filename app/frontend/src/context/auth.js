import { createContext } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: value => {}
})

export default AuthContext
