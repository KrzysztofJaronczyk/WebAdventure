const priceInput = document.getElementById('price')
const peopleInput = document.getElementById('people')
const tipInput = document.getElementById('tip')
const countBtn = document.querySelector('.count')

const error = document.querySelector('.error')
const result = document.querySelector('.cost')
const paragraph = document.querySelector('.cost-info')

let valueToPay

function calculateBill() {
	const price = priceInput.value
	const people = peopleInput.value
	const tip = tipInput.value

	if (tip.value === '0') {
		valueToPay = price / people
	} else {
		valueToPay = price / people + price * tip
	}
	result.textContent = valueToPay.toFixed(2)
	paragraph.style.display = 'block'
}

function checkInput() {
	if (priceInput.value === '' || peopleInput.value === '') {
		error.textContent = 'Please fill all fields'
		return
	} else if (priceInput.value <= 0 || peopleInput.value <= 0) {
		error.textContent = 'Please enter a positive number'
		return
	} else {
		error.textContent = ''
		calculateBill()
	}
}

countBtn.addEventListener('click', () => {
	checkInput()
})
