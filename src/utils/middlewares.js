const customers = require('../customers.json')

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.params

  const customer = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ message: 'Customer not found!' })
  }

  request.customer = customer

  return next()
}

module.exports = { verifyIfExistsAccountCPF }
