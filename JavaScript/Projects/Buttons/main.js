const plusButton = document.querySelector('.sizeUp')
const minusButton = document.querySelector('.sizeDown')
const colorButton = document.querySelector('.color')
const text = document.querySelector('.text p')

const getFontSize = () => {
	let style = window.getComputedStyle(text)
	return parseInt(style.fontSize)
}

const biggerText = () => {
	let fontSize = getFontSize()
	text.style.fontSize = `${fontSize + 2}px`
}

function smallerText() {
	let fontSize = getFontSize()
	text.style.fontSize = `${fontSize - 2}px`
}

function changeColor() {
	const r = Math.floor(Math.random() * 255)
	const g = Math.floor(Math.random() * 255)
	const b = Math.floor(Math.random() * 255)
	text.style.color = `rgb(${r}, ${g}, ${b})`
	// console.log( text.style.color = `rgb(${r}, ${g}, ${b})`)
}

plusButton.addEventListener('click', biggerText)
minusButton.addEventListener('click', smallerText)
colorButton.addEventListener('click', changeColor)
