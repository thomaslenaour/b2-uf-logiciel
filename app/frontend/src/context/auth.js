import { createContext } from 'react'

const AuthContext = createContext({
  token: null,
  userId: null,
  cotisationPct: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
})

export default AuthContext
