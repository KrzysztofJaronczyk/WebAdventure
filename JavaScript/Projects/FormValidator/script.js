const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const email = document.getElementById('email')

const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.getElementById('popup')

let dataArray = [username, password, password2, email]

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			// showPopup('Form submitted')
			clearError(el)
			console.log('Form submitted')
		}
	})
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm(dataArray)
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()
	dataArray.forEach(input => ((input.value = ''), clearError(input)))
})
