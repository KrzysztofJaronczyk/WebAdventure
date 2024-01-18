const list = document.createElement('ul')
let lastElement
document.body.append(list)
for (let index = 1; index <= 10; index++) {
	let element = document.createElement('li')
	element.textContent = index
	list.appendChild(element)
}

lastElement = document.querySelector('li:last-child')
lastElement.textContent = 'Jestem ostatnim elementem'
lastElement.style.background = 'blue'
lastElement.style.padding = '20px 40px'
lastElement.style.fontSize = '48px'
