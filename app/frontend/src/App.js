import React, { useState, useCallback, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CustomersPage from './pages/CustomersPage'
import InvoicesPage from './pages/InvoicesPage'
import CustomerPage from './pages/CustomerPage'
import InvoicePage from './pages/InvoicePage'
import AuthContext from './context/auth'

const Store = window.require('electron-store')

const App = () => {
  const store = new Store()

  const [token, setToken] = useState(store.get('token'))
  const [userId, setUserId] = useState(store.get('userId'))

  const login = useCallback((userId, token) => {
    store.set('token', token)
    store.set('userId', userId)

    setToken(token)
    setUserId(userId)
  }, [])

  const logout = useCallback(() => {
    store.delete('token')
    store.delete('userId')

    setToken(null)
    setUserId(null)
  }, [])

  let routes
  if (token) {
    routes = (
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/customers" component={CustomersPage} />
        <Route exact path="/invoices" component={InvoicesPage} />
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
        <Route exact path="/customers" component={CustomersPage} />
        <Route exact path="/invoices" component={InvoicesPage} />
        <Route exact path="/customers/:id" component={CustomerPage} />
        <Route exact path="/invoices/:id" component={InvoicePage} />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <Navbar />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
