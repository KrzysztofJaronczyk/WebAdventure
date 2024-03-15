// let expenses = {
// 	'2023-01': {
// 		'01': {
// 			food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
// 			fuel: [210.22],
// 		},
// 		'09': {
// 			food: [11.9],
// 			fuel: [190.22],
// 		},
// 	},
// 	'2023-03': {
// 		'07': {
// 			food: [20, 11.9, 30.2, 11.9],
// 		},
// 		'04': {
// 			food: [10.2, 11.5, 2.5],
// 			fuel: [],
// 		},
// 	},
// 	'2023-04': {},
// }

function get_median_of_first_week_expenses(expenses) {
	function firstSunday(year, month) {
		let tempDate = new Date()
		tempDate.setHours(0, 0, 0, 0)
		tempDate.setMonth(month)
		tempDate.setFullYear(year)
		tempDate.setDate(1)

		let day = tempDate.getDay()
		let toNextSun = day !== 0 ? 7 - day : 0
		tempDate.setDate(tempDate.getDate() + toNextSun)

		// Format 'year-month-day'
		let formattedDate = `${tempDate.getFullYear()}-${(tempDate.getMonth() + 1).toString().padStart(2, '0')}-${tempDate
			.getDate()
			.toString()
			.padStart(2, '0')}`
		return formattedDate
	}

	function calculateDailyTotal(expenses) {
		return Object.values(expenses).reduce((total, current) => total + current.reduce((acc, cur) => acc + cur, 0), 0)
	}

	function calculateMedian(values) {
		const sorted = [...values].sort((a, b) => a - b)
		const middle = Math.floor(sorted.length / 2)

		if (sorted.length === 0) {
			return undefined
		}

		if (sorted.length === 1) {
			return sorted[0]
		}

		if (sorted.length % 2 === 0) {
			return (sorted[middle - 1] + sorted[middle]) / 2
		} else {
			return sorted[middle]
		}
	}

	let sundays = []

	//get the sundays for all expenses
	for (const key in expenses) {
		if (Object.hasOwnProperty.call(expenses, key)) {
			const element = expenses[key]
			sundays = firstSunday(key.split('-')[0], key.split('-')[1] - 1)
		}
	}

	for (const key in expenses) {
		if (Object.hasOwnProperty.call(expenses, key)) {
			const element = expenses[key]
			let firstSun = firstSunday(key.split('-')[0], key.split('-')[1] - 1)

			for (const day in element) {
				if (Object.hasOwnProperty.call(element, day)) {
					const dayNumber = parseInt(day)

					const expenseDate = new Date(firstSun)
					expenseDate.setDate(dayNumber)
					let sunday = new Date(firstSun)

					if (expenseDate > sunday) {
						// Remove the expense entry
						delete element[day]
					}
				}
			}
		}
	}

	for (const month in expenses) {
		if (Object.hasOwnProperty.call(expenses, month)) {
			const monthExpenses = expenses[month]
			if (Object.keys(monthExpenses).length === 0) {
				delete expenses[month]
			}
		}
	}

	let monthlyMedians = {}
	for (const month in expenses) {
		const monthExpenses = expenses[month]
		if (Object.keys(monthExpenses).length !== 0) {
			const allValues = []
			for (const day in monthExpenses) {
				const dayValues = Object.values(monthExpenses[day]).flat()
				allValues.push(...dayValues)
			}
			monthlyMedians[month] = calculateMedian(allValues)
		}
	}

	// console.log(monthlyMedians)

	function calculateYearlyMedian(expenses) {
		const allValues = []
		for (const month in expenses) {
			const monthExpenses = expenses[month]
			for (const day in monthExpenses) {
				const dayValues = Object.values(monthExpenses[day]).flat()
				allValues.push(...dayValues)
			}
		}
		return calculateMedian(allValues)
	}

	console.log(calculateYearlyMedian(expenses))
}

get_median_of_first_week_expenses(expenses)
