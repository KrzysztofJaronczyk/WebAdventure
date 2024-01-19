const p1 = document.querySelector('.p1')
const p2 = document.querySelector('.p2')

const btn1 = document.querySelector('.btn1')
const btn2 = document.querySelector('.btn2')

const divSquare = document.querySelector('.square')

function hi() {
	console.log('Hi')
}

function squareRed() {
	divSquare.style.background = 'red'
}

function squareBlue() {
	divSquare.style.background = 'blue'
}

function toggleParagraph() {
    p1.classList.toggle('show')
    p2.classList.toggle('show')
}

btn1.addEventListener('click', hi) 
btn2.addEventListener('dblclick', toggleParagraph)

divSquare.addEventListener('mouseover', squareRed)
divSquare.addEventListener('mouseout', squareBlue)