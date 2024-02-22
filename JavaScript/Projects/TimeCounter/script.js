const settings = document.querySelector('.settings')
const settingsBtn = document.querySelector('.settings-btn')
const imageSection = document.querySelector('.image-section')

const eventName = document.querySelector('#event-name')
const eventDay = document.querySelector('#event-day')
const eventMonth = document.querySelector('#event-month')
const eventYear = document.querySelector('#event-year')
const eventImg = document.querySelector('#event-image')

const daysCount = document.querySelector('.days-count')
const hoursCount = document.querySelector('.hours-count')
const minutesCount = document.querySelector('.minutes-count')
const secondsCount = document.querySelector('.seconds-count')

const saveBtn = document.querySelector('.save')
const eventSpan = document.querySelector('.event')

let usersTime
let timeLeft

settingsBtn.addEventListener('click', () => {
	settings.classList.toggle('active')
})

const appUpdate = () => {
	if (checkValidDate()) return
	eventSpan.textContent = eventName.value
	imageSection.style.backgroundImage = `url(${eventImg.value})`
	usersTime = new Date(`${eventMonth.value} ${eventDay.value}, ${eventYear.value}`)
	saveToLocal()
}

const checkValidDate = () => {
	const date = new Date(`${eventMonth.value} ${eventDay.value}, ${eventYear.value}`)
	const now = new Date()

	if (date < now) {
		alert('Please enter a valid date')
		eventDay.value = ''
		eventMonth.value = ''
		eventYear.value = ''
	} else if (eventDay.value > 31 || eventDay.value < 1) {
		alert('Please enter a valid day')
		eventDay.value = ''
	} else if (eventMonth.value > 12 || eventMonth.value < 1) {
		alert('Please enter a valid month')
		eventMonth.value = ''
	} else if (eventYear.value < now.getFullYear()) {
		alert('Please enter a valid year')
		eventYear.value = ''
	}
}

const calculateTimeLeft = () => {
	const now = new Date()
	timeLeft = usersTime - now
	const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24)
	const hours = Math.floor(timeLeft / 1000 / 60 / 60) % 24
	const minutes = Math.floor(timeLeft / 1000 / 60) % 60
	const seconds = Math.floor(timeLeft / 1000) % 60

	daysCount.textContent = days
	hoursCount.textContent = hours
	minutesCount.textContent = minutes
	secondsCount.textContent = seconds
}

setInterval(calculateTimeLeft, 1000)

saveBtn.addEventListener('click', appUpdate)

const saveToLocal = () => {
	localStorage.setItem('eventName', eventName.value)
	localStorage.setItem('eventDay', eventDay.value)
	localStorage.setItem('eventMonth', eventMonth.value)
	localStorage.setItem('eventYear', eventYear.value)
	localStorage.setItem('eventImg', eventImg.value)
}

const getFromLocal = () => {
	const storedEventName = localStorage.getItem('eventName')
	const storedEventDay = localStorage.getItem('eventDay')
	const storedEventMonth = localStorage.getItem('eventMonth')
	const storedEventYear = localStorage.getItem('eventYear')
	const storedEventImg = localStorage.getItem('eventImg')

	if (storedEventName && storedEventDay && storedEventMonth && storedEventYear && storedEventImg) {
		eventName.value = storedEventName
		eventDay.value = storedEventDay
		eventMonth.value = storedEventMonth
		eventYear.value = storedEventYear
		eventImg.value = storedEventImg
		appUpdate()
	}
}

document.addEventListener('DOMContentLoaded', getFromLocal)
window.addEventListener('beforeunload', saveToLocal)
