import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'
import UsersAPI from '../services/UsersAPI'
import Field from '../components/Field'

const Store = window.require('electron-store')

const AccountPage = withRouter(({ history, changeCotisation }) => {
  const store = new Store()
  const userId = store.get('userId')
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    contributionPct: ''
  })
  const fetchUser = async () => {
    try {
      const data = await UsersAPI.findById(userId).then(
        response => response.data.user
      )
      setCredentials({
        name: data.name,
        email: data.email,
        contributionPct: data.contribution_pct
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await UsersAPI.update(userId, credentials)
      changeCotisation(credentials.contributionPct)
      toast.success('Vos informations ont éte mises à jour ✅')
      history.push('/')
    } catch (error) {
      console.log(error)
      toast.error('Une erreur est survenue ❌')
    }
  }

  return (
    <>
      <h1 className="text-center my-5 h3">
        Modifier mes informations
        <span aria-label="Inscription" role="img" className="ml-3">
          🧑‍💻
        </span>
      </h1>
      <div className="container">
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
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Modifier
            </button>
            <Link to="/" className="btn btn-link">
              Retour au dashboard
            </Link>
          </div>
        </form>
      </div>
    </>
  )
})

export default AccountPage
