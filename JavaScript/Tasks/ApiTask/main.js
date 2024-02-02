const btn = document.querySelector('button')
const img = document.querySelector('img')

const URL = 'https://dog.ceo/api/breeds/image/random'

btn.addEventListener('click', () => {
	fetch(URL)
		.then(response => response.json())
		.then(data => {
			img.src = data.message
		})
		.catch(error => console.log(error))
})
