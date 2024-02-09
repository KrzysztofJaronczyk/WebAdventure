const startBtn = document.querySelector('.start')
const stopBtn = document.querySelector('.stop')
const resetBtn = document.querySelector('.reset')
const pauseBtn = document.querySelector('.pause')
const historyBtn = document.querySelector('.history')

const infoBtn = document.querySelector('.info')
const stopWatch = document.querySelector('.stopwatch')
const lastTime = document.querySelector('.time')
const savedTimes = document.querySelector('.time-list')
const modal = document.querySelector('.modal-shadow')
const closeBtn = document.querySelector('.close')
const cog = document.querySelector('.info2')

const colors = document.querySelector('.colors')
const colorOne = document.querySelector('.one')
const colorTwo = document.querySelector('.two')
const colorThree = document.querySelector('.three')
const colorFour = document.querySelector('.four')

let root = document.documentElement
let time = 0
let timeRunning = false
// let timeList = []
let totalTimes = 0

function runStopwatch() {
	if (timeRunning) {
		setTimeout(() => {
			if (!timeRunning) return
			time++
			stopWatch.textContent = formatTime(time)
			runStopwatch()
		}, 1000)
	}
}

function start() {
	if (timeRunning) return
	else timeRunning = true
	runStopwatch()
}

function pause() {
	timeRunning = false
	stopWatch.textContent = formatTime(time)
}

function stop() {
	timeRunning = false
	clearTimeout(runStopwatch)
	if (time !== 0) {
		// timeList.push(formatTime(time))
		lastTime.textContent = formatTime(time)
		lastTime.style.visibility = 'visible'
		addTimeToList(formatTime(time))
	}
	time = 0
	stopWatch.textContent = '0:00'
}

function formatTime(timeInSeconds) {
	const minutes = Math.floor(timeInSeconds / 60)
	const seconds = Math.floor(timeInSeconds % 60)
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

function addTimeToList(element) {
	totalTimes++
	const li = document.createElement('li')
	li.innerHTML = `Measure ${totalTimes} : <span>${element}</span>`
	savedTimes.appendChild(li)
}

function showRecords() {
	savedTimes.classList.toggle('show')
}

function resetAll() {
	// timeList = []
	totalTimes = 0
	savedTimes.innerHTML = ''
	lastTime.textContent = ''
	lastTime.style.visibility = 'hidden'
	savedTimes.classList.remove('show')
}

function toggleModal() {
	modal.classList.toggle('modal-animation')
	modal.classList.toggle('show')
}

function showColors() {
	colors.classList.toggle('show')
	colors.classList.toggle('modal-animation')
}

startBtn.addEventListener('click', start)
pauseBtn.addEventListener('click', pause)
stopBtn.addEventListener('click', stop)
historyBtn.addEventListener('click', showRecords)
resetBtn.addEventListener('click', resetAll)
infoBtn.addEventListener('click', toggleModal)
closeBtn.addEventListener('click', toggleModal)
window.addEventListener('click', e => (e.target === modal ? toggleModal() : false))
cog.addEventListener('click', showColors)

colorOne.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(235, 0, 0)')
})

colorTwo.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(235, 0, 235)')
})

colorThree.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(0, 235, 0)')
})

colorFour.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(0, 235, 235)')
})
