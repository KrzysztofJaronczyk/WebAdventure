const container = document.querySelector('.container');
const canvas = document.createElement('canvas');
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
container.appendChild(canvas);

const context = canvas.getContext('2d');

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const numBallsInput = document.getElementById('numBalls');
const distInput = document.getElementById('dist');
const attractInput = document.getElementById('attract');
const clickToleranceInput = document.getElementById('tolerance');

let balls = [];
let isGameRunning = false;
let player;
let harpoons = [];

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
		if (this.radius < 10) 
		balls.splice(balls.indexOf(this), 1); // Remove the original ball
	else {
		const splitFactor = 2;
		const newRadius = this.radius / splitFactor;
		const newSpeedX = this.speedX * splitFactor;
		const newSpeedY = this.speedY * splitFactor;
		balls.push(new Ball(this.x, this.y, newRadius, newSpeedX, newSpeedY));
		balls.push(new Ball(this.x, this.y, newRadius, -newSpeedX, -newSpeedY));
		balls.splice(balls.indexOf(this), 1); // Remove the original ball
	}
	}
}

class Harpoon {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = -10; // Speed at which the harpoon moves
    }

    draw() {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, 0);
        context.stroke();
    }

    update() {
        this.y += this.speed;
    }
}

class Player {
	constructor() {
		this.x = canvas.width / 2 // Start in the middle
		this.width = 50 // Width of the player
		this.height = 80 // Height of the player
		this.speed = 15 // Movement speed
	}

	move(direction) {
		// Update player position based on direction
		if (direction === 'left') {
			this.x = Math.max(0, this.x - this.speed)
		} else if (direction === 'right') {
			this.x = Math.min(canvas.width - this.width, this.x + this.speed)
		}
	}

	draw() {
		// Draw the player
		
		context.fillRect(this.x, canvas.height - this.height, this.width, this.height)
	}

	shoot() {
        harpoons.push(new Harpoon(this.x + this.width / 2, canvas.height - this.height));
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
                harpoons.splice(i, 1); // Remove harpoon after hitting
                break; // Break to avoid checking other balls with this harpoon
            }
        }
    }
}

function isHarpoonHittingBall(harpoon, ball) {
    // Simple collision detection logic
    return harpoon.x > ball.x - ball.radius && harpoon.x < ball.x + ball.radius &&
           harpoon.y > ball.y - ball.radius;
}


function updateGame() {
    for (const ball of balls) {
        ball.update(canvas.width, canvas.height);
    }

    harpoons.forEach(harpoon => harpoon.update());

    // Remove harpoons that are off-screen
    harpoons = harpoons.filter(harpoon => harpoon.y > 0);
	checkHarpoonBallCollisions();
}

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    balls.forEach(ball => ball.draw(context));
    harpoons.forEach(harpoon => harpoon.draw());
}

function gameLoop(timestamp) {
    if (!isGameRunning) return;
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        player.move('left');
    } else if (event.key === 'ArrowRight') {
        player.move('right');
    } else if (event.key === ' ') { // Spacebar to shoot
        player.shoot();
    }
});

function startGame() {
    isGameRunning = true;
    player = new Player(); // Initialize the player
    createBalls(parseInt(numBallsInput.value));
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    isGameRunning = false;
    balls = [];
    harpoons = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
}

startBtn.addEventListener('click', () => startGame());
resetBtn.addEventListener('click', () => resetGame());
