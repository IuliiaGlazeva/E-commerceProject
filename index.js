const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const app = express()

var Sequelize = require('sequelize')
var sequelize = new Sequelize('postgres://postgres:iuliia@localhost:5432/postgres')
const port = process.env.PORT || 4001

const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'products',
  timestamps: false
})


//var Product = db.define('Product', {
////  name: Sequelize.STRING,
  //score: Sequelize.INTEGER
//}, {
  //tableName: 'Products'
//})



app.get('/products', (request, response) => {
  Product.findAll().then(products => {
    response.send({ products })
  })
})

app.get('/products/:id', (request, response) => {
  const productId = request.params.id
  Product.findById(productId).then(product => {
    response.send(product)
  })
})

app.get('/', (req, res) => {
  res.json({ message: 'Yo!' })
})

app.listen(4001, () => console.log('Express API listening on port 4001'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})
Product.findById(1).then(product => console.log(JSON.stringify(product)))
