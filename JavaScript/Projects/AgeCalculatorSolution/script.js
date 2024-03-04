const dayContainer = document.querySelector('.day-container input')
const monthContainer = document.querySelector('.month-container input')
const yearContainer = document.querySelector('.year-container input')

const dayParagraph = dayContainer.previousElementSibling
const monthParagraph = monthContainer.previousElementSibling
const yearParagraph = yearContainer.previousElementSibling

const countIcon = document.querySelector('.icon')
const yearsValue = document.querySelector('.years span')
const monthsValue = document.querySelector('.months span')
const daysValue = document.querySelector('.days span')

const dayError = document.querySelector('#day-error')
const monthError = document.querySelector('#month-error')
const yearError = document.querySelector('#year-error')

function countAge() {
	const day = dayContainer.value
	const month = monthContainer.value
	const year = yearContainer.value
	const today = new Date()
	const dateOfBirth = new Date(year, month - 1, day)

	let countDay = today.getDate() - dateOfBirth.getDate()
	let countMonth = today.getMonth() - dateOfBirth.getMonth()
	let countAge = today.getFullYear() - dateOfBirth.getFullYear()

	if (countDay < 0) {
		countDay = countDay + 30
		countMonth = countMonth - 1
	}

	if (countMonth < 0) {
		countMonth = countMonth + 12
		countAge = countAge - 1
	}
    animateSpan(countAge, countMonth, countDay)


}

function animateSpan(years, months, days) {
    let countYears = 0;
    let countMonths = 0;
    let countDays = 0;

    const intervalYears = setInterval(() => {
        if (countYears >= years) {
            clearInterval(intervalYears);
            yearsValue.textContent = years;
        } else {
            yearsValue.textContent = countYears;
            countYears++;
        }
    }, 50);

    const intervalMonths = setInterval(() => {
        if (countMonths >= months) {
            clearInterval(intervalMonths);
            monthsValue.textContent = months;
        } else {
            monthsValue.textContent = countMonths;
            countMonths++;
        }
    }, 100);

    const intervalDays = setInterval(() => {
        if (countDays >= days) {
            clearInterval(intervalDays);
            daysValue.textContent = days;
        } else {
            daysValue.textContent = countDays;
            countDays++;
        }
    }, 100);
}


function checkInputValidation() {
	const day = parseInt(dayContainer.value)
	const month = parseInt(monthContainer.value)
	const year = parseInt(yearContainer.value)
	const today = new Date()
	let totalErrors = 0

	if (dayContainer.value === '') {
		dayContainer.style.border = '1px solid red'
		dayError.textContent = 'This field is required'
		dayParagraph.classList.add('error')
		totalErrors++
	} else {
		dayContainer.style.border = '1px solid #f4f4f4'
		dayError.textContent = ''
		dayParagraph.classList.remove('error')
	}

	if (monthContainer.value === '') {
		monthContainer.style.border = '1px solid red'
		monthError.textContent = 'This field is required'
		monthParagraph.classList.add('error')
		totalErrors++
	} else {
		monthContainer.style.border = '1px solid #f4f4f4'
		monthError.textContent = ''
		monthParagraph.classList.remove('error')
	}

	if (yearContainer.value === '') {
		yearContainer.style.border = '1px solid red'
		yearError.textContent = 'This field is required'
		yearParagraph.classList.add('error')
		totalErrors++
	} else {
		yearContainer.style.border = '1px solid #f4f4f4'
		yearError.textContent = ''
		yearParagraph.classList.remove('error')
	}

	if (totalErrors > 0) return false

	if (day > 31 || day < 1) {
		dayContainer.style.border = '1px solid red'
		dayError.textContent = 'Must be a valid day'
		dayParagraph.classList.add('error')
		totalErrors++
	} else {
		dayContainer.style.border = '1px solid #f4f4f4'
		dayError.textContent = ''
		dayParagraph.classList.remove('error')
	}

    if (month === 2) {
        if (day > 29) {
            dayContainer.style.border = '1px solid red'
            dayError.textContent = 'Must be a valid day'
            dayParagraph.classList.add('error')
            totalErrors++
        }
    }

	if (month > 12 || month < 1) {
		monthContainer.style.border = '1px solid red'
		monthError.textContent = 'Must be a valid month'
		monthParagraph.classList.add('error')
		totalErrors++
	} else {
		monthContainer.style.border = '1px solid #f4f4f4'
		monthError.textContent = ''
		monthParagraph.classList.remove('error')
	}

	if (year > today.getFullYear() || year < 1900) {
		yearContainer.style.border = '1px solid red'
		yearError.textContent = 'Must be a valid year'
		yearParagraph.classList.add('error')
		totalErrors++
	} else {
		yearContainer.style.border = '1px solid #f4f4f4'
		yearError.textContent = ''
		yearParagraph.classList.remove('error')
	}

	if (totalErrors > 0) {
		yearsValue.textContent = '- -'
		monthsValue.textContent = '- -'
		daysValue.textContent = '- -'
		return false
	} else {
		countAge()
	}
}

countIcon.addEventListener('click', checkInputValidation)
