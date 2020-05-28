import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Pagination from '../components/Pagination'
import CustomersAPI from '../services/CustomersAPI'

const CustomersPage = () => {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  // Permet d'aller récupérer les customers
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll().then(
        response => response.data.customers
      )
      setCustomers(data)
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
    }
  }

  // Au chargement du composent on va chercher les customers
  useEffect(() => {
    fetchCustomers()
  }, [])

  // Gestion de la recherche
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
  }

  // Filtrage des customers selon la recherche
  const filteredCustomers = customers.filter(
    customer =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.city.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination des données récupérées danss le filtrage des customers
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    currentPage,
    itemsPerPage
  )

  // Gestion du changement de page
  const handlePageChange = page => setCurrentPage(page)

  // Gestion de la supression d'un client
  const handleDelete = async id => {
    const originalCustomers = [...customers]

    setCustomers(customers.filter(customer => customer.id !== id))

    try {
      await CustomersAPI.remove(id)
      toast.success('Le client a été supprimé ✅')
    } catch (error) {
      setCustomers(originalCustomers)
      toast.error('Une erreur est survenue ❌')
    }
  }

  return (
    <div className="container my-5">
      <h1 className="text-center my-5 display-3">
        Mes clients
        <span aria-label="Inscription" role="img" className="ml-3">
          💼
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
        <Link to="/customers/new" className="btn btn-primary">
          Création d&apos;un nouveau client
        </Link>
      </div>

      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th>Client</th>
            <th>Téléphone</th>
            <th>Ville</th>
            <th className="text-center">Code Postal</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.city}</td>
              <td className="text-center">{customer.postal_code}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(customer.id)}
                >
                  Supprimer
                </button>
                <Link
                  to={`/customers/${customer.id}`}
                  className="btn btn-sm btn-primary ml-2"
                >
                  Modifier
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredCustomers.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          length={filteredCustomers.length}
          onPageChanged={handlePageChange}
        />
      )}
    </div>
  )
}

export default CustomersPage
