import React from 'react'
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

const Store = require('electron-store')

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/customers" component={CustomersPage} />
        <Route exact path="/invoices" component={InvoicesPage} />
        <Route exact path="/customers/:id" component={CustomerPage} />
        <Route exact path="/invoices/:id" component={InvoicePage} />
      </Switch>
    </Router>
  )
}

export default App
