import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/Field'

const RegisterPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    contribution: '',
    password: '',
    confirm_password: ''
  })

  const [errorLogin, setErrorLogin] = useState('d-none')

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      if (credentials.confirm_password === credentials.password) {
        console.log(credentials)
        setErrorLogin('d-none')
      } else {
        setErrorLogin('')
      }

      // TODO SUCCESS TOAST
    } catch (error) {
      setErrorLogin('')
      // TODO ERROR TOAST
    }
  }

  return (
    <div className="container my-5">
      <h1 className="text-center my-5 display-3">
        Inscription
        <span aria-label="Inscription" role="img" className="ml-3">
          ✍️
        </span>
      </h1>
      <p className={`my-3 text-danger text-lg ${errorLogin}`}>
        Les informations sont invalides !
      </p>
      <form onSubmit={handleSubmit} className="py-5">
        <Field
          name="name"
          label="Nom & Prénom"
          value={credentials.name}
          onChange={handleChange}
          placeholder="Nom"
          type="text"
          required
        />
        <Field
          name="email"
          label="Adresse Email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Adresse email de connexion"
          type="email"
          required
        />
        <Field
          name="contribution"
          label="Taux d'impositions"
          value={credentials.contribution}
          onChange={handleChange}
          placeholder="Veuillez renseigner votre taux d'impositions en %"
          type="number"
          required
        />
        <Field
          name="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          required
        />
        <Field
          name="confirm_password"
          label="Confirmation du mot de passe"
          value={credentials.confirm_password}
          onChange={handleChange}
          placeholder="Veuillez confirmer votre mot de passe"
          type="password"
          required
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Inscription
          </button>
          <Link to="/" className="btn btn-link">
            Retour à l&apos;accueil
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
