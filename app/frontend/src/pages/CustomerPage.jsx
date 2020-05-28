import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomersAPI from '../services/CustomersAPI'
import Field from '../components/Field'

const CustomerPage = ({ match, history }) => {
  const { id = 'new' } = match.params
  const [customerName, setCustomerName] = useState('')
  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    phone: ''
  })

  const [editing, setEditing] = useState(false)

  // Récupération du client en fonction de l'identifiant
  const fetchCustomer = async id => {
    try {
      const data = await CustomersAPI.findById(id).then(
        response => response.data.customer
      )
      setCustomerName(data.name)
      setCustomer({
        name: data.name,
        address: data.address,
        postalCode: data.postal_code,
        city: data.city,
        country: data.country,
        phone: data.phone
      })
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
    }
  }

  // Chargement du customer si un identifiant (valide) est passé dans l'url  à chaque changement d'identifiant
  useEffect(() => {
    if (id !== 'new') {
      setEditing(true)
      fetchCustomer(id)
    }
  }, [id])

  // Gestion des changements des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget

    setCustomer({ ...customer, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      if (editing) {
        await CustomersAPI.update(id, customer)
        toast.success('Le client a été modifié ✅')
      } else {
        await CustomersAPI.create(customer)
        toast.success('Le client a été crée ✅')
      }
      history.push('/customers')
    } catch (error) {
      toast.error('Une erreur est survenue, veuillez réessayer ❌')
    }
  }

  return (
    <>
      {(!editing && (
        <h1 className="text-center my-5 display-3">Création d'un client</h1>
      )) || (
        <h1 className="text-center my-5 display-3">
          Modification du client
          {` ${customerName}`}
        </h1>
      )}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            label="Prénom & Nom"
            value={customer.name}
            onChange={handleChange}
          />
          <Field
            name="address"
            label="Adresse"
            value={customer.address}
            onChange={handleChange}
          />
          <Field
            name="postalCode"
            label="Code Postal"
            value={customer.postalCode}
            onChange={handleChange}
          />
          <Field
            name="city"
            label="Ville"
            value={customer.city}
            onChange={handleChange}
          />
          <Field
            name="country"
            label="Pays"
            value={customer.country}
            onChange={handleChange}
          />
          <Field
            name="phone"
            label="Numéro de téléphone"
            value={customer.phone}
            onChange={handleChange}
          />

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
            <Link to="/customers" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default CustomerPage
