import React, { useContext } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

import AuthContext from '../context/auth'

const Navbar = ({ history }) => {
  const auth = useContext(AuthContext)

  const handleLogout = () => {
    auth.logout()
    toast.success('Vous êtes désormais déconnecté ✅')
    history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Ynov CRM
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          {auth.isLoggedIn && (
            <ul className="navbar-nav mr-auto">
              <NavLink to="/customers" className="nav-link">
                Mes clients
              </NavLink>
              <NavLink to="/invoices" className="nav-link">
                Mes factures
              </NavLink>
            </ul>
          )}

          <ul className="navbar-nav ml-auto">
            {!auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="btn btn-light text-primary border-primary mx-2"
                >
                  Connexion
                </NavLink>
              </li>
            )}
            {auth.isLoggedIn && (
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-light text-danger border-danger mx-2"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </li>
            )}
            {!auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="btn btn-light text-primary border-primary mx-2"
                >
                  Inscription
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
