import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Store from '../services/Store'

const HomePage = () => {
  console.log(Store.get('unicorn'))
  return (
    <>
      <h1 className="display-3 text-center my-5">
        Ynov CRM {Store.get('unicorn')}
      </h1>
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
