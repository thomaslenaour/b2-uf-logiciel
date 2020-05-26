/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Line, Doughnut } from 'react-chartjs-2'

import AuthContext from '../context/auth'

const HomePage = () => {
  const auth = useContext(AuthContext)

  const caData = [300, 766, 400, 769, 890, 554, 256, 588, 898, 488, 340, 1054]

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
        data: [7, 13]
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
                1883 &euro;
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="card p-2">
              <p className="h5 text-center">CA mensuel</p>
              <p className="display-4 font-weight-light text-center">
                200 &euro;
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="card p-2">
              <p className="h5 text-center">Cotisations à payer ce mois-ci</p>
              <p className="display-4 font-weight-light text-center">
                22 &euro;
              </p>
            </div>
          </div>
        </div>
        <div className="row flex align-items-center">
          <div className="col-8">
            <h2 className="text-center h5">
              Courbes représentants le CA & le bénéfice mensuel
            </h2>
            <Line data={chartCaData} />
          </div>
          <div className="col-4">
            <h2 className="text-center h5">Nb de clients / Nb de factures</h2>
            <Doughnut data={chartCustomersClientsData} />
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
