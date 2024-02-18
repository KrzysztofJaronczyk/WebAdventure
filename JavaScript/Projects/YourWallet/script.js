const incomeSection = document.querySelector('.income-area')
const expenseSection = document.querySelector('.expense-area')
const availableMoney = document.querySelector('.available-money')
const panel = document.querySelector('.add-transaction-panel')
const addTransactionBtn = document.querySelector('.add-transaction')

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categoryInput = document.querySelector('#category')

const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')

const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]
