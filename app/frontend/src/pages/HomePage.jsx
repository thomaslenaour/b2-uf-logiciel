/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Line, Doughnut, Pie } from 'react-chartjs-2'
import { toast } from 'react-toastify'
import CustomersAPI from '../services/CustomersAPI'
import InvoiceAPI from '../services/InvoicesAPI'

import AuthContext from '../context/auth'

const colors = [
  'rgb(233,90,90)',
  'rgb(64,168,246)',
  'rgb(236, 201, 75)',
  'rgb(72, 187, 120)',
  'rgb(102, 126, 234)',
  'rgb(159, 122, 234)',
  'rgb(237, 100, 166)',
  'rgb(237, 137, 54)'
]

const HomePage = () => {
  const auth = useContext(AuthContext)
  const [customers, setCustomers] = useState([])
  const [invoices, setInvoices] = useState([])

  const fetchData = async () => {
    try {
      const customersData = await CustomersAPI.findAll().then(
        response => response.data.customers
      )
      setCustomers(customersData)
      const invoicesData = await InvoiceAPI.findAll().then(
        response => response.data.invoices
      )
      setInvoices(invoicesData)
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const caTotal = invoices
    .map(invoice => +invoice.amount)
    .reduce((acc, currentVal) => acc + currentVal, 0)

  const caMensuel = invoices
    .map(invoice => {
      if (new Date(invoice.created_at).getMonth() === new Date().getMonth()) {
        return +invoice.amount
      }
      return 0
    })
    .reduce((acc, currentVal) => acc + currentVal, 0)

  const cotisations = (caMensuel * 11) / 100

  const caData = Array(12).fill(0)
  invoices.forEach(invoice => {
    const month = new Date(invoice.created_at).getMonth()
    caData[month] += +invoice.amount
  })

  const labelCategories = invoices.map(invoice => invoice.category)
  const categoriesColors = labelCategories.map((value, index) => colors[index])
  const nbProjectsPerCategory = {}
  invoices.forEach(invoice => {
    if (!nbProjectsPerCategory[invoice.category]) {
      nbProjectsPerCategory[invoice.category] = 1
    } else {
      nbProjectsPerCategory[invoice.category] += 1
    }
  })

  const nbInvoicesPaid = invoices.map(invoice => invoice.is_paid)

  const chartCaData = {
    labels: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    datasets: [
      {
        label: "Chiffre d'affaire (€)",
        fill: true,
        backgroundColor: 'rgba(58,212,201,0.2)',
        borderColor: 'rgba(58,212,201,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(58,212,201,0.4)',
        hoverBorderColor: 'rgba(58,212,201,1)',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2.5,
        pointRadius: 1.5,
        pointHitRadius: 10,
        data: caData
      },
      {
        label: 'Bénéfice (€)',
        fill: false,
        backgroundColor: 'rgba(233,90,90,0.2)',
        borderColor: 'rgba(233,90,90,1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(233,90,90,0.4)',
        hoverBorderColor: 'rgba(233,90,90,1)',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2.5,
        pointRadius: 1.5,
        pointHitRadius: 10,
        data: caData.map(ca => ca - (ca * 11) / 100)
      }
    ]
  }

  const chartCustomersClientsData = {
    labels: ['Clients', 'Factures'],
    datasets: [
      {
        backgroundColor: ['rgb(64,168,246)', 'rgb(236, 201, 75)'],
        data: [customers.length, invoices.length]
      }
    ]
  }

  const chartCategoriesInvoices = {
    labels: labelCategories,
    datasets: [
      {
        backgroundColor: categoriesColors,
        data: Object.values(nbProjectsPerCategory)
      }
    ]
  }

  const chartInvoicesStatus = {
    labels: ['Payé', 'En attente'],
    datasets: [
      {
        backgroundColor: ['rgb(72, 187, 120)', 'rgb(160, 174, 192)'],
        data: [
          nbInvoicesPaid.filter(invoice => invoice === true).length,
          nbInvoicesPaid.filter(invoice => invoice === false).length
        ]
      }
    ]
  }

  if (auth.isLoggedIn) {
    return (
      <div className="container my-5">
        <div className="row mb-5">
          <div className="col-4">
            <div className="card p-2">
              <p className="h5 text-center">CA total</p>
              <p className="display-4 font-weight-light text-center">
                {caTotal} &euro;
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="card p-2">
              <p className="h5 text-center">CA mensuel</p>
              <p className="display-4 font-weight-light text-center">
                {caMensuel} &euro;
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="card p-2">
              <p className="h5 text-center">Cotisations à payer ce mois-ci</p>
              <p className="display-4 font-weight-light text-center">
                {cotisations} &euro;
              </p>
            </div>
          </div>
        </div>
        <div className="row flex align-items-center">
          <h2 className="text-center h5">
            Courbes représentants le CA & le bénéfice mensuel
          </h2>
          <Line
            data={chartCaData}
            options={{ legend: { position: 'bottom' } }}
          />
        </div>
        <div className="row flex align-items-center mt-5">
          <div className="col-4">
            <h2 className="text-center h5">Nb de clients / Nb de factures</h2>
            <Doughnut
              data={chartCustomersClientsData}
              options={{
                legend: { position: 'bottom' }
              }}
            />
          </div>
          <div className="col-4">
            <h2 className="text-center h5">Catégories des projets</h2>
            <Pie
              data={chartCategoriesInvoices}
              options={{ legend: { display: false } }}
            />
          </div>
          <div className="col-4">
            <h2 className="text-center h5">Factures payés / en attente</h2>
            <Doughnut
              data={chartInvoicesStatus}
              options={{ legend: { position: 'bottom' } }}
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="row pt-5">
        <div className="col-6 text-center">
          <img
            className="w-75 img-responsive"
            src="./assets/home_picture.png"
            alt="Home Analyse"
          />
        </div>
        <div className="col-6 text-center mt-3">
          <h2>Un outil d&apos;analyse très simple à utiliser</h2>
          <p className="text-center text-justify px-5 mt-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            ipsum soluta voluptatibus, sequi dignissimos ipsa in voluptas
            perspiciatis dolore rem doloremque odit aspernatur iure error labore
            corporis nostrum? Id voluptatem deleniti sunt accusamus amet. Ut
            dicta ad adipisci perferendis ipsa nesciunt, sint libero,
            repudiandae aut doloribus, maxime possimus explicabo provident.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg mt-4">
            Je m&apos;inscris
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
