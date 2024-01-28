const pass = document.querySelector('#password')
const p = document.querySelector('.passinfo')
const letters = /[a-z]/i
const numbers = /[0-9]/
const special = /[!@#$%^&*()]/
const minValue = 10

const checkPassword = () => {
	if (
		pass.value.match(letters) &&
		pass.value.match(numbers) &&
		pass.value.match(special) &&
		pass.value.length >= minValue
	) {
		p.innerHTML = 'Your password is strong'
		p.style.color = 'green'
	} else if (pass.value.match(letters) && pass.value.match(numbers) && pass.value.length >= minValue) {
		p.innerHTML = 'Your password is medium'
		p.style.color = 'orange'
	} else {
		p.innerHTML = 'Your password is weak'
		p.style.color = 'red'
	}

	if (pass.value.length == 0) {
		p.innerHTML = 'Enter your password'
		p.style.color = 'black'
	}
}

pass.addEventListener('keyup', checkPassword)
