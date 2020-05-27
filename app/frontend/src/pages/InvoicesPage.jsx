import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import InvoicesAPI from '../services/InvoicesAPI'

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  // Permet d'aller récupérer les factures
  const fetchInvoices = async () => {
    try {
      const data = await InvoicesAPI.findAll().then(
        response => response.data.invoices
      )
      setInvoices(data)
    } catch (error) {
      console.log(error.response)
      // TODO ERROR TOAST
    }
  }

  // Au chargement du composent on va chercher les factures
  useEffect(() => {
    fetchInvoices()
  }, [])

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
  }

  // Filtrage des factures selon la recherche
  const filteredInvoices = invoices.filter(
    invoice =>
      invoice.amount.toLowerCase().includes(search.toLowerCase()) ||
      invoice.category.toLowerCase().includes(search.toLowerCase()) ||
      invoice.status.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination des données récupérées danss le filtrage des invoices
  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  )

  // Gestion du changement de page
  const handlePageChange = page => setCurrentPage(page)

  // Gestion de la supression d'une facture
  const handleDelete = async id => {
    const originalInvoices = [...invoices]

    setInvoices(invoices.filter(invoice => invoice.id !== id))

    try {
      await InvoicesAPI.remove(id)
      // TODO SUCCESS TOAST
    } catch (error) {
      setInvoices(originalInvoices)
      // TODO ERROR TOAST
    }
  }

  return (
    <div className="container my-5">
      <h1 className="text-center my-5 display-3">
        Mes factures
        <span aria-label="Inscription" role="img" className="ml-3">
          📃
        </span>
      </h1>

      <div className="d-flex justify-content-start align-items-center ">
        <div className="form-group my-0 mx-2 w-75">
          <input
            onChange={handleSearch}
            value={search}
            className="form-control"
            placeholder="Entrez un nom de client ou encore une ville"
            type="text"
          />
        </div>
        <Link to="/invoices/new" className="btn btn-primary">
          Création d&apos;une nouvelle facture
        </Link>
      </div>

      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Client</th>
            <th>Categorie</th>
            <th>Amount</th>
            <th>Status</th>
            <th>PDF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInvoices.map(invoice => (
            <tr key={invoice.id}>
              <td>{invoice.reference}</td>
              <td>Nom & Prénom</td>
              <td>{invoice.category}</td>
              <td>{invoice.amount} €</td>
              <td>
                {(invoice.is_paid && 'Payée') ||
                  (!invoice.is_paid && 'En cours')}
              </td>
              <td>{invoice.invoice_pdf}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Supprimer
                </button>
                <Link
                  to={`/invoices/${invoice.id}`}
                  className="btn btn-sm btn-primary ml-2"
                >
                  Modifier
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvoicesPage
