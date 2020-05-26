import React, { useCallback, useEffect, useContext, useState } from 'react'
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
import AuthAPI from './services/AuthAPI'

const Store = window.require('electron-store')

const App = () => {
  // Il faudrait demander à notre AuthAPI si on est déjà connecté ou pas
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  )

  let routes
  if (isAuthenticated) {
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
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Navbar />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
