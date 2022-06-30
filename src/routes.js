const express = require('express')

const routes = express.Router()

//const verifyIfExistsAccountCPF = require('./utils/middlewares')
const accountController = require('./controllers/account.controller')
const transactionsController = require('./controllers/transactions.controller')

routes.get('/accounts', accountController.lists)
routes.post('/account', accountController.create)


routes.get(
  '/account',
  accountController.verifyIfExistsAccountCPF,
  accountController.list
)

routes.put(
  '/account',
  accountController.verifyIfExistsAccountCPF,
  accountController.update
)

routes.delete(
  '/account',
  accountController.verifyIfExistsAccountCPF,
  accountController.remove
)

routes.get(
  '/transactions',
  accountController.verifyIfExistsAccountCPF,
  transactionsController.list
)
routes.get(
  '/transactions/search',
  accountController.verifyIfExistsAccountCPF,
  transactionsController.searchForDate
)
routes.get(
  '/transactions/balance',
  accountController.verifyIfExistsAccountCPF,
  transactionsController.balance
)
routes.post(
  '/transactions/deposit',
  accountController.verifyIfExistsAccountCPF,
  transactionsController.deposit
)
routes.post(
  '/transactions/withdraw',
  accountController.verifyIfExistsAccountCPF,
  transactionsController.withdraw
)

module.exports = routes
