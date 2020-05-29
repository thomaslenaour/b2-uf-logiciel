const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRoutes = require('./routes/users')
const customersRoutes = require('./routes/customers')
const invoicesRoutes = require('./routes/invoices')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

  next()
})

app.use('/api/users', usersRoutes)
app.use('/api/customers', customersRoutes)
app.use('/api/invoices', invoicesRoutes)

app.use((req, res, next) => {
  throw new HttpError('Cette route est introuvable', 404)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'Une erreur inconnue est survenue' })
})

mongoose.set('useCreateIndex', true)
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-tdkyv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => app.listen(process.env.PORT || 5000))
  .catch(err => console.log(`DB Connection Error : ${err.message}`))
