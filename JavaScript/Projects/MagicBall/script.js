const input = document.querySelector('input')
const answer = document.querySelector('.answer')
const error = document.querySelector('.error')
const image = document.querySelector('.ball-img img')

const answers = [
	'It is certain',
	'It is decidedly so',
	'Without a doubt',
	'Yes definitely',
	'You may rely on it',
	'As I see it, yes',
	'Most likely',
	'Outlook good',
	'Yes',
	'Signs point to yes',
	'Reply hazy try again',
	"No, don't count on it",
	'My sources say no',
	'Outlook not so good',
	'Very doubtful',
]

function checkInput() {
	const text = input.value
	if (text.length > 8 && text.charAt(text.length - 1) === '?') {
		shakeBall()
		setTimeout(1000)
		const response = answers[Math.floor(Math.random() * answers.length)]
		answer.innerText = response
		error.innerText = ''
	} else {
		error.innerText = 'Please enter a valid question with a question mark.'
		answer.innerText = ''
	}
}

function shakeBall() {
	image.classList.add('shake-animaton')
	setTimeout(() => {
		image.classList.remove('shake-animaton')
	}, 1000)
}

image.addEventListener('click', checkInput)

input.addEventListener('keypress', e => {
	if (e.key === 'Enter') checkInput()
})
