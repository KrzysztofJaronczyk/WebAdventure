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
	amountInput.value > 0
		? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income')
		: expenseSection.appendChild(newTransaction) && newTransaction.classList.add('expense')

	moneyArr.push(parseFloat(amountInput.value))
	closePanel()
	clearInputs()
	ID++
	updateBalance()
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

const updateBalance = () => {
	const total = moneyArr.reduce((acc, item) => (acc += item), 0)
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

addTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', () => {
	if (checkForm()) {
		createNewTransaction()
	}
})
