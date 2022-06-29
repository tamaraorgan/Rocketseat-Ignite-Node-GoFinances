const express = require('express')

const routes = express.Router()

const accountController = require('./controllers/account.controller')

routes.get(
  '/statement/:cpf',
  accountController.verifyIfExistsAccountCPF,
  accountController.lists
)
routes.post('/account', accountController.create)

module.exports = routes
