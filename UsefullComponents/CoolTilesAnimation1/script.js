let columns = Math.floor(document.documentElement.clientWidth / 50)
let rows = Math.floor(document.documentElement.clientHeight / 50)

const tiles = document.querySelector('#tiles')
let totalTiles = 0

const colors = [
	'rgb(229,57,53)',
	'rgb(244,67,54)',
	'rgb(233,30,99)',
	'rgb(156,39,176)',
	'rgb(103,58,183)',
	'rgb(63,81,181)',
	'rgb(33,150,243)',
	'rgb(3,169,244)',
]

let count = -1

const createTile = i => {
	const tile = document.createElement('div')
	tile.classList.add('tile')

	tile.onclick = e => handleOnClick(i)
	return tile
}

const handleOnClick = e => {
	count = count + 1

	console.log(e)
	anime({
		targets: '.tile',
		backgroundColor: colors[count % (colors.length - 1)],
		scale: [
			{ value: 0.1, easing: 'easeOutSine', duration: 500 },
			{ value: 1, easing: 'easeInOutQuad', duration: 1200 },
		],
		delay: anime.stagger(50, {
			grid: [columns, rows],
			from: e,
		}),
	})
}

let intervalId = setInterval(() => {
	const randomPosition = Math.floor(Math.random() * totalTiles)
	handleOnClick(randomPosition)
}, 8000)

const createTiles = quantity => {
	Array.from(Array(quantity)).map((tile, i) => {
		tiles.appendChild(createTile(i))
	})
}

const createGrid = () => {
	tiles.innerHTML = ''
	columns = Math.floor(document.documentElement.clientWidth / 50)
	rows = Math.floor(document.documentElement.clientHeight / 50)

	tiles.style.setProperty('--columns', columns)
	tiles.style.setProperty('--rows', rows)

	createTiles(columns * rows)
	totalTiles = columns * rows
}

window.onload = () => createGrid()
window.onresize = () => createGrid()
