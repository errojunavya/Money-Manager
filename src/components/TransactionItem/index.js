// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onClickDeleteButton = () => {
    deleteTransaction(id)
  }

  return (
    <li className="transaction-history-row">
      <p className="text">{title}</p>
      <p className="text">Rs {amount}</p>
      <p className="text">{type}</p>
      <div className="delete-container">
        <button
          className="delete-button"
          type="button"
          onClick={onClickDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
