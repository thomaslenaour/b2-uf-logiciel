import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/Field'
import UsersAPI from '../services/UsersAPI'

const RegisterPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    contributionPct: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errorRegistration, setErrorRegistration] = useState('d-none')

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      if (credentials.passwordConfirmation === credentials.password) {
        await UsersAPI.createUser(credentials)
        setErrorRegistration('d-none')
        history.push('/login')
      } else {
        setErrorRegistration('')
        console.log('mdp inccorect')
      }
    } catch (error) {
      setErrorRegistration('')
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
      <p className={`my-3 text-danger text-lg ${errorRegistration}`}>
        Les informations sont invalides !
      </p>
      <form onSubmit={handleSubmit} className="py-5">
        <Field
          name="name"
          label="Nom & Prénom"
          value={credentials.name}
          onChange={handleChange}
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
          name="contributionPct"
          label="Taux d'impositions"
          value={credentials.contributionPct}
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
          name="passwordConfirmation"
          label="Confirmation du mot de passe"
          value={credentials.passwordConfirmation}
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
