const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const email = document.getElementById('email')

const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.popup')

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

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} must be at least ${min} characters long`)
	}
}

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Passwords do not match')
	}
}

const checkEmail = email => {
	const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!regEx.test(email.value)) {
		showError(email, 'Email is not valid')
	} else {
		clearError(email)
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if (el.classList.contains('error')) {
			errorCount++
		}
	})

	if (errorCount === 0) {
		popup.classList.add('show-popup')
	}
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm(dataArray)
	checkLength(username, 3)
	checkLength(password, 6)
	checkPassword(password, password2)
	checkEmail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()
	dataArray.forEach(input => ((input.value = ''), clearError(input)))
})
