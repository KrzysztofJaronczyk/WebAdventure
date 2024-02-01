const btn1 = document.querySelector('.btn-1')
const btn2 = document.querySelector('.btn-2')
const btn3 = document.querySelector('.btn-3')
const paragraph = document.querySelector('p')

class Food {
	constructor(name, price) {
		this.name = name
		this.price = price
	}
}

const food1 = new Food('Pizza', 22)
const food2 = new Food('Burger', 12)
const food3 = new Food('Pasta', 18)
Food.prototype.returnInfo = function () {
	console.log(`${this.name} costs ${this.price}$`)
}

btn1.addEventListener('click', function () {
	food1.returnInfo()
})

btn2.addEventListener('click', function () {
	food2.returnInfo()
})

btn3.addEventListener('click', function () {
	food3.returnInfo()
})
