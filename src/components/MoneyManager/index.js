import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption

    const newTransaction = {
      id: uuid(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expenses = 0
    transactionList.forEach(transaction => {
      if (transaction.type === transactionTypeOptions[1].displayText) {
        expenses += transaction.amount
      }
    })
    return expenses
  }

  getIncome = () => {
    const {transactionList} = this.state
    let income = 0
    transactionList.forEach(transaction => {
      if (transaction.type === transactionTypeOptions[0].displayText) {
        income += transaction.amount
      }
    })
    return income
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balance = 0
    let income = 0
    let expenses = 0

    transactionList.forEach(transaction => {
      if (transaction.type === transactionTypeOptions[0].displayText) {
        income += transaction.amount
      } else {
        expenses += transaction.amount
      }
    })
    balance = income - expenses
    return balance
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="heading-name">Hi, Richard</h1>
          <p className="heading-para">
            Welcome back to your{' '}
            <span className="header-manager">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="transaction-container">
          <form className="form" onSubmit={this.onAddTransaction}>
            <h1 className="transaction-heading">Add Transaction</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              className="input"
              id="title"
              value={titleInput}
              onChange={this.onChangeTitleInput}
            />
            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="text"
              className="input"
              id="amount"
              value={amountInput}
              onChange={this.onChangeAmountInput}
            />
            <label htmlFor="type" className="label">
              TYPE
            </label>
            <select
              id="select"
              className="input"
              value={optionId}
              onChange={this.onChangeOptionId}
            >
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button className="button" type="submit">
              ADD
            </button>
          </form>
          <div className="history-Container">
            <h1 className="history-heading">History</h1>
            <div className="history-table-container">
              <ul className="history-transactions-table">
                <li className="history-table-header">
                  <p className="history-table-header-cell">Title</p>
                  <p className="history-table-header-cell">Amount</p>
                  <p className="history-table-header-cell">Type</p>
                </li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    transactionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
