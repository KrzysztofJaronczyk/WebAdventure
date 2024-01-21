// const numbers = [0, 0, 1, 1, 2, 2, 2]
// const colors = ['red', 'green', 'blue', true, 123]
// const cars = [123, true, 'audi', 'bmw', 'mercedes', 'ferrari', '🤷‍♂️', '👀']

// const numbers2 = numbers.slice(0, 2)

// console.log(numbers2)

// console.log(numbers)
// const numbers3 = numbers.slice(-3)

// console.log(numbers3)

// const randomStuff = colors.splice(3,2)

// console.log(randomStuff)

// const newCars = cars.splice(2,4,"test")

// console.log(cars)
// console.log(newCars)

// const letters = ['c', 'd']
// letters.push('e', 'f')
// letters.unshift('a', 'b')

// console.log(letters)

// console.log(letters.includes('c'))

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// const food = ['🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🍿', '🍩']

// const combined = numbers.concat(food)
// const combined2 = [...numbers, ...food]
// console.log(combined)

// const numbers = [1, 5, 15, 26, 48]

// const numbersOperated = numbers.map(number => number * 5)
// console.log(numbersOperated)

// // numbersOperated.forEach(element => {
// // 	if (element % 2 === 0) {
// // 		console.log(`Liczba ${element} jest parzysta`)
// // 	} else {
// // 		console.log(`Liczba ${element} jest nieparzysta`)
// // 	}
// // })

// for (const number of numbers) {
// 	if (number % 2 === 0) console.log(`Liczba ${number} jest parzysta`)
// 	else console.log(`Liczba ${number} jest nieparzysta`)
// }

// const colors = ['red']
// colors.push('blue')
// colors.splice(0, 0, 'orange')

// console.log(colors)

// for (let index = 0; index < colors.length; index++) {
// 	let element = colors[index]
// 	element = element.charAt(0).toUpperCase() + colors[index].slice(1)
// 	console.log(`My favourite color is ${element}`)
// }

const cars = 'Audi, Mercedes, BMW, Nissan, Dodge'

const carsTable = cars.split(', ')

console.log(carsTable)

if (carsTable.length > 3) console.log('Array is OK')
else console.log('Array is too small...')

carsTable.length > 3 ? console.log('Array is OK') : console.log('Array is too small...')

if (carsTable.includes('Audi')) console.log('Audi is here! xD')
else console.log('Damn..Someone stole the Audi!')
