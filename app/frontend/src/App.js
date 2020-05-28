import React, { useCallback, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CustomersPage from './pages/CustomersPage'
import InvoicesPage from './pages/InvoicesPage'
import CustomerPage from './pages/CustomerPage'
import InvoicePage from './pages/InvoicePage'
import AuthContext from './context/auth'
import 'react-toastify/dist/ReactToastify.css'
import AuthAPI from './services/AuthAPI'
import './assets/styles/styles.css'
import Footer from './components/Footer'
import AccountPage from './pages/AccountPage'

const Store = window.require('electron-store')
AuthAPI.setup()

const App = () => {
  const store = new Store()
  const NavbarWithRouter = withRouter(Navbar)

  const [token, setToken] = useState(store.get('token'))
  const [userId, setUserId] = useState(store.get('userId'))
  const [cotisationPct, setCotisationPct] = useState(store.get('cotisationPct'))

  const login = useCallback((userId, token, cotisationPct) => {
    store.set('token', token)
    store.set('userId', userId)
    store.set('cotisationPct', cotisationPct)

    setToken(token)
    setUserId(userId)
    setCotisationPct(cotisationPct)
  })

  const logout = useCallback(() => {
    store.delete('token')
    store.delete('userId')
    store.delete('cotisationPct')

    setToken(null)
    setUserId(null)
    setCotisationPct(null)
  })

  const handleChangeCotisation = newCotisation => {
    store.set('cotisationPct', newCotisation)
    setCotisationPct(newCotisation)
  }

  let routes
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/customers" component={CustomersPage} />
        <Route exact path="/invoices" component={InvoicesPage} />
        <Route
          exact
          path="/account"
          component={() => (
            <AccountPage changeCotisation={handleChangeCotisation} />
          )}
        />
        <Route exact path="/customers/:id" component={CustomerPage} />
        <Route exact path="/invoices/:id" component={InvoicePage} />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        cotisationPct,
        login,
        logout
      }}
    >
      <Router>
        <NavbarWithRouter />
        <main>{routes}</main>
        <Footer />
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </AuthContext.Provider>
  )
}

export default App
