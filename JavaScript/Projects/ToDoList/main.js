let todoInput
let errorInfo
let addBtn
let ulList

const addButton = document.querySelector('.btn-add')
const mainInput = document.querySelector('.todo-input')

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
	ulList = document.querySelector('.todo-list ul')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask)
	ulList.addEventListener('click', checkClick)
}

document.addEventListener('DOMContentLoaded', main)
