import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const CustomersPage = () => {
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

  return (
    <div className="container my-5">
      <h1 className="text-center my-5 display-3">
        Mes clients
        <span aria-label="Inscription" role="img" className="ml-3">
          💼
        </span>
      </h1>
      <div className="d-flex justify-content-start align-items-center ">
        <div className="form-group my-0 mx-2 ">
          <input
            onChange={handleSearch}
            value={search}
            className="form-control"
            placeholder="Rechercher ..."
            type="text"
          />
        </div>
        <Link to="#" className="btn btn-primary">
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
              <td>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete()}
                >
                  Supprimer
                </button>
              </td>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Thomas le Naour</td>
            <td>thomas@thomas.com</td>
            <td>Bordeaux</td>
            <td className="text-center">4</td>
            <td className="text-center">3600€</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CustomersPage
