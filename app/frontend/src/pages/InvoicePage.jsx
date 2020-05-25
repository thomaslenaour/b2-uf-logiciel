import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CustomersAPI from '../services/CustomersAPI'
import InvoicesAPI from '../services/InvoicesAPI'
import Field from '../components/Field'
import Select from '../components/Select'

const InvoicePage = ({ match }) => {
  const { id = 'new' } = match.params
  const [editing, setEditing] = useState(false)
  const [invoice, setInvoice] = useState({
    category: '',
    isPaid: '',
    customerId: '',
    status: 'PAID'
  })
  const [customers, setCustomers] = useState([
    { name: 'Alex Boisseau', id: '111' },
    { name: 'Baptiste Boisseau', id: '222' }
  ])

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll()
      setCustomers(data)
      if (!invoice.customerId)
        setInvoice({ ...invoice, customerId: data[0].id })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchInvoice = async id => {
    try {
      const { category, amount, status, customer } = await InvoicesAPI.find(id)
      setInvoice({ category, amount, status, customer: customer.id })
    } catch (error) {
      console.log(error)
    }
  }

  // Récupération des clients quand la page change
  useEffect(() => {
    fetchCustomers()
  }, [])

  // Récupération de la bonne facture quand l'id change
  useEffect(() => {
    if (id !== 'new') {
      fetchInvoice(id)
      setEditing(true)
    }
  }, [id])

  // Gestion des changements des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setInvoice({ ...invoice, [name]: value })
  }

  // gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      if (editing) {
        // await InvoicesAPI.update(id, invoice)
      } else {
        // await InvoicesAPI.create(invoice)
        console.log(invoice)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {(editing && (
        <h1 className="text-center display-3 my-5">
          Modification de la facture n°{id}
        </h1>
      )) || (
        <h1 className="text-center display-3 my-5">Création d'une facture</h1>
      )}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <Field
            name="category"
            label="Catégorie"
            value={invoice.category}
            onChange={handleChange}
          />
          <Field
            name="isPaid"
            label="Montant"
            value={invoice.isPaid}
            onChange={handleChange}
          />
          <Select
            name="customerId"
            label="Client"
            value={invoice.customerId}
            onChange={handleChange}
          >
            {customers.map(customer => (
              <option value={customer.id} key={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
          <Select
            name="status"
            label="Statut"
            value={invoice.status}
            onChange={handleChange}
          >
            <option value="PAID">Payée</option>
            <option value="WAIT">En cours</option>
          </Select>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
            <Link to="/invoices" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default InvoicePage
