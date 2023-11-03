const btn1 = document.querySelector('#btn1')
const btn2 = document.querySelector('.btn2')
const color = document.querySelector('.color')
const removeColorBtn = document.querySelector('.remove-color')

btn1.addEventListener('click', function () {
	color.classList.toggle('red')
    color.classList.remove('blue')
})

btn2.addEventListener('click', function () {
	color.classList.toggle('blue')
    color.classList.remove('red')
})

removeColorBtn.addEventListener('click', function () {
    color.classList.remove('red')
    color.classList.remove('blue')
})