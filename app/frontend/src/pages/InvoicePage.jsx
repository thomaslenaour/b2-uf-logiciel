import React, { useState } from 'react'

const InvoicePage = ({ match }) => {
  const { id = 'new' } = match.params
  const [editing, setEditing] = useState(false)

  return (
    <h1 className="text-center my-5 display-3">Créer une nouvelle facture</h1>
  )
}

export default InvoicePage
