const customers = require('../customers')

function getBalance(transaction) {
  const balance = transaction.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0)
  return balance
}

const list = (request, response) => {
  const { customer } = request
  return response.json(customer.transaction)
}

const searchForDate = (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + ' 00:00')

  const transactions = customer.transaction.filter(
    (transaction) =>
      transaction.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  )

  return response.json(transactions)
}

const deposit = (request, response) => {
  const { description, amount } = request.body

  const { customer } = request

  const transactionsOperation = {
    description,
    amount,
    type: 'credit',
    created_at: new Date()
  }

  customer.transaction.push(transactionsOperation)

  return response.status(201).json({ message: 'Deposit made successfully!' })
}

const withdraw = (request, response) => {
  const { amount } = request.body
  const { customer } = request

  const balance = getBalance(customer.transaction)

  if (balance < amount) {
    return response.status(400).json({ error: 'Insufficient funds!' })
  }

  const transactionsOperation = {
    amount,
    type: 'debit',
    created_at: new Date()
  }

  customer.transaction.push(transactionsOperation)

  return response.status(201).json({ message: 'Withdrawal successful!' })
}

const balance = (request, response) => {
  const { customer } = request

  const balance = getBalance(customer.transaction)
  return response.status(200).json({ balance: balance })
}

module.exports = {
  list,
  deposit,
  withdraw,
  balance,
  searchForDate
}
