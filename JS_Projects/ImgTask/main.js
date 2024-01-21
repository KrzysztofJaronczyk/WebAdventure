// const image = document.querySelector('img')

// console.log(image)
// image.setAttribute('src', 'https://picsum.photos/200')
// image.setAttribute('alt', 'picsum image')

// function hi() {
//     console.log('hi')
// }

// setTimeout(hi, 2000)

const list = document.querySelector('ul')
const elements = list.children

console.log(elements)

for (let index = 0; index < elements.length; index++) {
	const element = elements[index]
	element.dataset.id('dataatrybutID', index)
	element.textContent = index + 1
}

const thirdID = document.querySelector('[data-id="3"]')

// console.log(thirdID)
