let todoInput
let errorInfo
let addBtn
let ulList
let newTodo
let div

const popup = document.querySelector('.popup')
const popupInput = document.querySelector('.popup-input')
const popupConfirm = document.querySelector('.popup-btn .accept')
const popupCancel = document.querySelector('.popup-btn .cancel')

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
}

const addNewTodo = () => {
	if (todoInput.value !== '') {
		newTodo = document.createElement('li')
		newTodo.textContent = todoInput.value
		ulList.appendChild(newTodo)
		createToolsArea()
		todoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Enter the task!'
	}
}

const createToolsArea = () => {
	div = document.createElement('div')
	div.classList.add('tools')
	div.innerHTML = `<button class="complete"><i class="fas fa-check"></i></button>
    <button class="edit">EDIT</button>
    <button class="delete"><i class="fas fa-times"></i></button>`
	newTodo.appendChild(div)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.closest('button').classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editTask(e)
	} else if (e.target.matches('.delete')) {
		deleteTask(e)
	}
}

document.addEventListener('DOMContentLoaded', main)
