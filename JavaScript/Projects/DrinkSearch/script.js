const input = document.querySelector('input')
const drinks = document.querySelectorAll('.drink-list ul li')

let allDrinks = []

function getAllDrinks() {
	allDrinks = []
	drinks.forEach(drink => {
		allDrinks.push(drink.textContent)
	})
}

function performSearch() {
	getAllDrinks()
	for (let i = 0; i < allDrinks.length; i++) {
		if (allDrinks[i].toLowerCase().includes(input.value.toLowerCase())) {
			drinks[i].style.display = 'block'
		} else {
			drinks[i].style.display = 'none'
		}
	}
}

input.addEventListener('keyup', performSearch)
