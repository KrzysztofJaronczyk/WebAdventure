{
	/* <i class="fa-solid fa-arrow-up"></i> */
}

const arrowDown = document.querySelector('.fa-arrow-down')
const button = document.querySelector('.arrow')
const image = document.querySelector('.item1')

function toggle() {
	image.classList.toggle('show')
	arrowDown.classList.toggle('fa-arrow-up')
}

button.addEventListener('click', toggle)
