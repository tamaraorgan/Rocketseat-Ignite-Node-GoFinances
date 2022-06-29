const { v4: uuidv4 } = require('uuid')
const customers = []

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.params

  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ message: 'Customer not found!' })
  }

  request.customer = customer

  return next()
}

const lists = (request, response) => {
  const { customer } = request
  return response.json(customer.statement)
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
    statement: []
  })

  return response.status(200).json({ message: 'Criado com sucesso' })
}

module.exports = { create, lists, verifyIfExistsAccountCPF }
