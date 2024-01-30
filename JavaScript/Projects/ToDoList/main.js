let todoInput
let errorInfo
let addBtn
let ulList
let newTodo
let div

let popup
let popupInfo
let todoToEdit
let popupInput
let popupAddBtn
let popupCloseBtn

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	todoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

    popup = document.querySelector('.popup')
    popupInfo = document.querySelector('.popup-info')
    popupInput = document.querySelector('.popup-input')
    popupAddBtn = document.querySelector('.accept')
    popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTodo)
	ulList.addEventListener('click', checkClick)
    popupCloseBtn.addEventListener('click', closePopup)
    popupAddBtn.addEventListener('click', changeTodo)
    todoInput.addEventListener('keyup', enterCheck)
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

const changeTodo = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value
        closePopup()
    } else {
        popupInfo.textContent = 'Enter the task!'
    }
}

const editTask = e => {
    todoToEdit = e.target.closest('li')
    popupInput.value = todoToEdit.firstChild.textContent
    popup.style.display = 'flex'
}

const deleteTask = e => {
    e.target.closest('li').remove()
    const allTasks = ulList.querySelectorAll('li')
    if (allTasks.length === 0) {
        errorInfo.textContent = 'No tasks on the list'
    }
}

const enterCheck = e => {
    if (e.key === 'Enter') {
        addNewTodo()
    }
}

const closePopup = () => {
    popupInput.value = ''
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

document.addEventListener('DOMContentLoaded', main)
