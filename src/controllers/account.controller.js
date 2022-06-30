const { v4: uuidv4 } = require('uuid')

const customers = require('../customers.json')

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers
  console.log(cpf);

  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found!' })
  }

  request.customer = customer

  return next()
}

const lists = (request, response) => {
  return response.status(200).json(customers)
}

const list = (request, response) => {
  const { customer } = request
  console.log(customer, 'customer');
  return response.status(200).json(customer)
}

const create = (request, response) => {
  const { cpf, name } = request.body

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  )
  console.log()

  if (customerAlreadyExists) {
    response.status(400).json({ message: 'Customer already exists!' })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    transaction: []
  })

  return response.status(200).json({ message: 'Successfully created!' })
}

const update = (request, response) => {
  const { name } = request.body
  const { customer } = request

  customer.name = name

  return response.status(201).json({ message: 'Data successfully updated!' })
}

const remove = (request, response) => {
  const { customer } = request

  customers.splice(customer, 1)

  return response.status(200).json({ message: 'Account successfully deleted!' })
}

module.exports = { verifyIfExistsAccountCPF, lists, list, create, update, remove }
