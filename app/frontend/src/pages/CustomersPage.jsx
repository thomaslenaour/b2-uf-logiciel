import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Pagination from '../components/Pagination'
import AuthContext from '../context/auth'

const CustomersPage = () => {
  const auth = useContext(AuthContext)
  auth.login(18, 'test')

  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10

  // Permet d'aller récupérer les customers
  const fetchCustomers = async () => {
    try {
      console.log('Récupération des customers')
      // const data = await CustomersAPI.findAll()
      // setCustomers(data)
    } catch (error) {
      // TODO ERROR TOAST
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
    // const originalCustomers = [...customers];

    // setCustomers(customers.filter(customer => customer.id !== id));

    try {
      // await CustomersAPI.remove(id)
      // TODO SUCCESS TOAST
    } catch (error) {
      // setCustomers(originalCustomers)
      // TODO ERROR TOAST
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
            <th>#</th>
            <th>Client</th>
            <th>Email</th>
            <th>Ville</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete()}
              >
                Supprimer
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary ml-2"
                onClick={() => handleDelete()}
              >
                Modifier
              </button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete()}
              >
                Supprimer
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary ml-2"
                onClick={() => handleDelete()}
              >
                Modifier
              </button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete()}
              >
                Supprimer
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary ml-2"
                onClick={() => handleDelete()}
              >
                Modifier
              </button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete()}
              >
                Supprimer
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary ml-2"
                onClick={() => handleDelete()}
              >
                Modifier
              </button>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
            <td>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete()}
              >
                Supprimer
              </button>
              <button
                type="button"
                className="btn btn-sm btn-primary ml-2"
                onClick={() => handleDelete()}
              >
                Modifier
              </button>
            </td>
          </tr>
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
