const convert = document.querySelector('.conv')
const reset = document.querySelector('.reset')
const change = document.querySelector('.change')

const input = document.querySelector('#converter')
const output = document.querySelector('.result')

const one = document.querySelector('.one')
const two = document.querySelector('.two')

function resetVarables() {
	input.value = ''
	output.textContent = ''
}

function changeVarables() {
	let temp = one.textContent
	one.textContent = two.textContent
	two.textContent = temp
}

function convertVarables() {
	if (input.value == '') {
		output.textContent = 'Please enter a value...'
		return
	}
	if (one.textContent === '°C') {
		const inputTemp = input.value
		const outputTemp = (inputTemp * 9) / 5 + 32
		output.textContent = outputTemp.toFixed(2)
	} else if (one.textContent === '°F') {
		const inputTemp = input.value
		const outputTemp = ((inputTemp - 32) * 5) / 9
		output.textContent = outputTemp.toFixed(2)
	}
}

reset.addEventListener('click', resetVarables)
change.addEventListener('click', changeVarables)
convert.addEventListener('click', convertVarables)
