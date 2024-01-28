const container = document.querySelector('.container')
const canvas = document.createElement('canvas')
canvas.width = container.offsetWidth
canvas.height = container.offsetHeight
container.appendChild(canvas)

const context = canvas.getContext('2d')

const startBtn = document.getElementById('startBtn')
const resetBtn = document.getElementById('resetBtn')
const numBallsInput = document.getElementById('numBalls')
const distInput = document.getElementById('dist')
const attractInput = document.getElementById('attract')
const clickToleranceInput = document.getElementById('tolerance')

let balls = []
let isGameRunning = false
let player
let harpoons = []

class Ball {
	constructor(x, y, radius, speedX, speedY) {
		this.x = x
		this.y = y
		this.radius = radius
		this.speedX = speedX
		this.speedY = speedY
	}

	draw(context) {
		context.beginPath()
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		context.fill()
	}

	update(width, height) {
		//change of position
		this.x += this.speedX
		this.y += this.speedY

		//edges
		if (this.x - this.radius < 0 || this.x + this.radius > width) {
			this.speedX = -this.speedX
		}
		if (this.y - this.radius < 0 || this.y + this.radius > height) {
			this.speedY = -this.speedY
		}
	}

	split() {
		if (this.radius < 10) balls.splice(balls.indexOf(this), 1) // Remove the original ball
		else {
			const splitFactor = 2
			const newRadius = this.radius / splitFactor
			const newSpeedX = this.speedX * splitFactor
			const newSpeedY = this.speedY * splitFactor
			balls.push(new Ball(this.x, this.y, newRadius, newSpeedX, newSpeedY))
			balls.push(new Ball(this.x, this.y, newRadius, -newSpeedX, -newSpeedY))
			balls.splice(balls.indexOf(this), 1) // Remove the original ball
		}
	}
}

let kunaiImage = new Image()
kunaiImage.src = '/animations/Kunai.png' // Replace with the correct path

class Harpoon {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.speed = -10 // Adjust speed as necessary
		this.angle = Math.PI / 2 // Rotate 90 degrees (in radians)
		this.scale = 0.5 // Scale factor for the kunai size
	}

	draw() {
		context.save() // Save current state of the canvas

		// Move to the position where the kunai will be drawn
		context.translate(this.x, this.y)

		// Rotate the canvas
		context.rotate(-this.angle) // Negative for counterclockwise rotation

		// Draw the kunai (adjust for smaller size)
		const scaledWidth = kunaiImage.width * this.scale
		const scaledHeight = kunaiImage.height * this.scale
		context.drawImage(kunaiImage, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight)

		context.restore() // Restore canvas state
	}

	update() {
		this.y += this.speed
		// Optional: Update angle if kunai rotation should change over time
	}
}
class Player {
	constructor() {
		this.x = canvas.width / 2 // Start in the middle
		this.width = 50 // Width of the player
		this.height = 80 // Height of the player
		this.speed = 15 // Movement speed
		this.currentAnimation = 'idle'
		this.frameIndex = 0
		this.isMoving = false
		this.isShooting = false
		this.direction = 'right'
		this.lastShootTime = 0
		this.shootInterval = 1000
	}
	updateAnimation() {
		this.frameIndex++
		if (this.frameIndex >= animations[this.currentAnimation].length) {
			this.frameIndex = 0 // Reset animation frame
		}
	}
	move(direction) {
		this.isMoving = true
		this.currentAnimation = 'run'
		this.direction = direction // Update direction based on movement

		if (direction === 'left') {
			this.x = Math.max(0, this.x - this.speed)
		} else if (direction === 'right') {
			this.x = Math.min(canvas.width - this.width, this.x + this.speed)
		}
	}

	stop() {
		this.isMoving = false
	}

	draw() {
		context.save() // Save the current state of the canvas

		// Flip the image when moving left
		if (this.direction === 'left') {
			context.scale(-1, 1)
			context.translate(-this.x - this.width, 0) // Adjust position after flipping
		} else {
			context.translate(this.x, 0) // Normal translation for right movement
		}

		let frame = animations[this.currentAnimation][this.frameIndex]
		context.drawImage(frame, 0, canvas.height - this.height, this.width, this.height)

		context.restore() // Restore the original state of the canvas
		this.updateAnimation()
	}

	shoot() {
		const currentTime = Date.now()
		if (currentTime - this.lastShootTime > this.shootInterval && harpoons.length === 0) {
			harpoons.push(new Harpoon(this.x + this.width / 2, canvas.height - this.height))
			this.lastShootTime = currentTime
			if (!this.isShooting) {
				this.isShooting = true
				this.currentAnimation = 'throw'
				this.frameIndex = 0 // Restart the animation
				setTimeout(() => {
					this.isShooting = false
					this.currentAnimation = 'idle'
				}, (animations.throw.length * 1000) / 60) // Animation duration
			}
		}
	}
}
function resetAnimation() {
	if (!player.isMoving && !player.isShooting && player.currentAnimation !== 'idle') {
		player.currentAnimation = 'idle'
		player.frameIndex = 0 // Reset frame index for idle animation
	}
}

function createBalls(count) {
	for (let i = 0; i < count; i++) {
		let radius = Math.random() * 20 + 2
		//never outside the canvas
		let x = Math.random() * (canvas.width - radius * 2) + radius
		let y = Math.random() * (canvas.height - radius * 2) + radius
		let speedFactor = 20
		let speedX = (Math.random() - 0.5) * (speedFactor / radius)
		let speedY = (Math.random() - 0.5) * (speedFactor / radius)
		balls.push(new Ball(x, y, radius, speedX, speedY))
	}
}

function drawLineBetweenBalls(ball1, ball2) {
	const distance = Math.sqrt((ball1.x - ball2.x) ** 2 + (ball1.y - ball2.y) ** 2)
	if (distance < parseInt(distInput.value)) {
		context.beginPath()
		context.moveTo(ball1.x, ball1.y)
		context.lineTo(ball2.x, ball2.y)
		context.stroke()
	}
}

function checkHarpoonBallCollisions() {
    for (let i = harpoons.length - 1; i >= 0; i--) {
        for (let j = balls.length - 1; j >= 0; j--) {
            if (isHarpoonHittingBall(harpoons[i], balls[j])) {
                balls[j].split();
                harpoons.splice(i, 1); // Remove harpoon on collision
                return; // Exit function to prevent further checks
            }
        }
    }
}


function isHarpoonHittingBall(harpoon, ball) {
	// Simple collision detection logic
	return harpoon.x > ball.x - ball.radius && harpoon.x < ball.x + ball.radius && harpoon.y > ball.y - ball.radius
}

function updateGame() {
	for (const ball of balls) {
		ball.update(canvas.width, canvas.height)
	}

	harpoons.forEach(harpoon => harpoon.update())

	// Remove harpoons that are off-screen
	harpoons = harpoons.filter(harpoon => harpoon.y > 0)
	checkHarpoonBallCollisions()
	resetAnimation()
}

function drawGame() {
	context.clearRect(0, 0, canvas.width, canvas.height)
	player.draw()
	balls.forEach(ball => ball.draw(context))
	harpoons.forEach(harpoon => harpoon.draw())
}

function gameLoop(timestamp) {
	if (!isGameRunning) return
	updateGame()
	drawGame()
	requestAnimationFrame(gameLoop)
}

let animations = {
	idle: [],
	run: [],
	throw: [],
	jump: [],
}

function loadAnimations() {
	for (let i = 0; i < 10; i++) {
		animations.idle.push(loadImage(`/animations/Idle__00${i}.png`))
		animations.throw.push(loadImage(`/animations/Throw__00${i}.png`))
		animations.jump.push(loadImage(`/animations/Jump__00${i}.png`))
	}
	for (let i = 0; i < 9; i++) {
		animations.run.push(loadImage(`/animations/Run__00${i}.png`))
	}
}

function loadImage(src) {
	const img = new Image()
	img.src = src
	return img
}

loadAnimations() // Call this function to load images

document.addEventListener('keydown', function (event) {
	if (event.key === 'ArrowLeft') {
		player.move('left')
	} else if (event.key === 'ArrowRight') {
		player.move('right')
	} else if (event.key === ' ') {
		// Spacebar to shoot
		player.shoot()
	}
})

function startGame() {
	isGameRunning = true
	player = new Player() // Initialize the player
	createBalls(parseInt(numBallsInput.value))
	requestAnimationFrame(gameLoop)
}

function resetGame() {
	isGameRunning = false
	balls = []
	harpoons = []
	context.clearRect(0, 0, canvas.width, canvas.height)
}

startBtn.addEventListener('click', () => startGame())
resetBtn.addEventListener('click', () => resetGame())
document.addEventListener('keyup', function (event) {
	if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
		player.stop()
	}
})
