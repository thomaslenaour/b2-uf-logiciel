import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-4">
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
          <ul className="navbar-nav mr-auto">
            <NavLink to="/customers" className="nav-link">
              Mes clients
            </NavLink>
            <NavLink to="/invoices" className="nav-link">
              Mes factures
            </NavLink>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-primary mx-2">
                Connexion
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="btn btn-danger mx-2">
                Déconnexion
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="btn btn-primary mx-2">
                Inscription
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
