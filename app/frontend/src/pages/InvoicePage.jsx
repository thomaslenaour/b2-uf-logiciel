import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomersAPI from '../services/CustomersAPI'
import InvoicesAPI from '../services/InvoicesAPI'
import Field from '../components/Field'
import Select from '../components/Select'

const InvoicePage = ({ match, history }) => {
  const { id = 'new' } = match.params
  const [editing, setEditing] = useState(false)
  const [invoice, setInvoice] = useState({
    category: '',
    amount: '',
    isPaid: '1',
    customerId: '',
    invoicePdf: ''
  })
  const [customers, setCustomers] = useState([])

  const fetchInvoice = useCallback(
    async id => {
      try {
        const data = await InvoicesAPI.findById(id).then(
          response => response.data.invoice
        )
        if (data.is_paid === true) {
          data.is_paid = '1'
        } else {
          data.is_paid = '0'
        }
        setInvoice({
          category: data.category,
          amount: data.amount,
          isPaid: data.is_paid,
          customerId: data.customer,
          invoicePdf: data.invoice_pdf
        })
      } catch (error) {
        toast.error(
          'Une erreur est survenue lors de la récupération de la facture ❌'
        )
        history.push('/invoices')
      }
    },
    [history]
  )

  const fetchCustomers = useCallback(async () => {
    try {
      const data = await CustomersAPI.findAll().then(
        response => response.data.customers
      )
      setCustomers(data)
      if (!invoice.customerId && id === 'new')
        setInvoice({ ...invoice, customerId: data[0].id })
    } catch (error) {
      toast.error(
        'Une erreur est survenue lors de la récupération des clients ❌'
      )
      history.push('/invoices')
    }
  }, [history, id, invoice])

  // Récupération de la bonne facture quand l'id change
  useEffect(() => {
    if (id !== 'new') {
      setEditing(true)
      fetchInvoice(id)
    }
  }, [id, fetchInvoice])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

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
        await InvoicesAPI.update(id, invoice)
        toast.success('La facture a bien été modifiée ✅')
        history.push('/invoices')
      } else {
        await InvoicesAPI.create(invoice)
        toast.success('La facture a bien été créée ✅')
        history.push('/invoices')
      }
    } catch (error) {
      toast.error('Une erreur est survenue, veuillez réessayer ❌')
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
            name="amount"
            label="Montant"
            value={invoice.amount}
            onChange={handleChange}
          />
          <Field
            name="invoicePdf"
            label="PDF de la facture"
            value={invoice.invoicePdf}
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
            name="isPaid"
            label="Statut"
            value={invoice.isPaid}
            onChange={handleChange}
          >
            <option value="1">Payée</option>
            <option value="0">En cours</option>
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
