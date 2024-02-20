const incomeSection = document.querySelector('.income-area')
const expenseSection = document.querySelector('.expenses-area')
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
let transactions = []
let lightMode = true

const showPanel = () => {
	panel.style.display = 'flex'
}

const createNewTransaction = () => {
	const newTransaction = document.createElement('div')
	newTransaction.classList.add('transaction')
	newTransaction.setAttribute('id', `${ID}`)

	checkCategory(selectedCategory)

	newTransaction.innerHTML = `
        <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
        <p class="transaction-amount">${amountInput.value}zł</p>
        <i class="fas fa-times delete" onclick="deleteTransaction(${ID})"></i>
    `

	const transactionObject = {
		id: ID,
		name: nameInput.value,
		amount: parseFloat(amountInput.value),
		categoryIcon: categoryIcon,
		category: selectedCategory,
	}

	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expenseSection.appendChild(newTransaction) && newTransaction.classList.add('expense')

	transactions.push(transactionObject)
	closePanel()
	clearInputs()
	ID++
	updateBalance()
	localStorage.setItem('transactions', JSON.stringify(transactions))
}

const selectCategory = () => {
	selectedCategory = categoryInput.options[categoryInput.selectedIndex].value
}

const checkCategory = transaction => {
	switch (transaction) {
		case 'food':
			categoryIcon = '<i class="fas fa-utensils"></i>'
			break
		case 'shopping':
			categoryIcon = '<i class="fas fa-file-invoice-dollar"></i>'
			break
		case 'income':
			categoryIcon = '<i class="fas fa-hand-holding-usd"></i>'
			break
		case 'entertainment':
			categoryIcon = '<i class="fas fa-gamepad"></i>'
			break
	}
}

const deleteTransaction = id => {
	const transactionToDelete = document.getElementById(id)
	transactions = transactions.filter(transaction => transaction.id !== id)
	transactionToDelete.remove()
	updateBalance()
	localStorage.setItem('transactions', JSON.stringify(transactions))
}

const updateBalance = () => {
	const total = transactions.reduce((acc, transaction) => (acc += transaction.amount), 0)
	availableMoney.textContent = `${total}zł`
	total < 0 ? (availableMoney.style.color = 'red') : (availableMoney.style.color = 'black')
}

const closePanel = () => {
	panel.style.display = 'none'
	clearInputs()
}

const checkForm = () => {
	if (nameInput.value !== '' && amountInput.value !== '' && categoryInput.value !== 'none') {
		return true
	} else {
		alert('Please fill in all fields')
	}
}

const clearInputs = () => {
	nameInput.value = ''
	amountInput.value = ''
	categoryInput.selectedIndex = 0
}

const deleteAllTransactions = () => {
	incomeSection.innerHTML = '<h3>Income:</h3>'
	expenseSection.innerHTML = '<h3>Expenses:</h3>'
	transactions = []
	updateBalance()
	localStorage.clear()
}

const changeStyleToLight = () => {
	root.style.setProperty('--first-color', '#F9F9F9')
	root.style.setProperty('--second-color', '#14161F')
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)')
	lightMode = true
	localStorage.setItem('lightMode', JSON.stringify(lightMode))
}

const changeStyleToDark = () => {
	root.style.setProperty('--first-color', '#14161F')
	root.style.setProperty('--second-color', '#F9F9F9')
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)')
	lightMode = false
	localStorage.setItem('lightMode', JSON.stringify(lightMode))
}

addTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', () => {
	if (checkForm()) {
		createNewTransaction()
	}
})

const loadTransactions = () => {
	const storedTransactions = JSON.parse(localStorage.getItem('transactions'))
	if (storedTransactions) {
		transactions = storedTransactions
		transactions.forEach(transaction => {
			const newTransaction = document.createElement('div')
			newTransaction.classList.add('transaction', transaction.amount > 0 ? 'income' : 'expense')
			newTransaction.setAttribute('id', `${transaction.id}`)

			newTransaction.innerHTML = `
                <p class="transaction-name">${transaction.categoryIcon} ${transaction.name}</p>
                <p class="transaction-amount">${transaction.amount}zł</p>
                <i class="fas fa-times delete" onclick="deleteTransaction(${transaction.id})"></i>
            `

			transaction.amount > 0 ? incomeSection.appendChild(newTransaction) : expenseSection.appendChild(newTransaction)

			ID = transaction.id + 1 // Ensure new transactions continue from the last ID
		})
	}
	const storedLightMode = JSON.parse(localStorage.getItem('lightMode'))
	if (!storedLightMode) {
		changeStyleToDark()
	}
	updateBalance()
}

deleteAllBtn.addEventListener('click', deleteAllTransactions)
lightBtn.addEventListener('click', changeStyleToLight)
darkBtn.addEventListener('click', changeStyleToDark)
document.addEventListener('DOMContentLoaded', loadTransactions)
