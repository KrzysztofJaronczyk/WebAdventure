const arrowBtn = document.querySelector('.arrow')
const arrowIcon = document.querySelector('.fas')
const img = document.querySelector('.item1')

const showImg = () => {
	img.classList.toggle('hide')
    animateArrow()
}

const animateArrow = () =>{
    if(img.classList.contains('hide'))
    arrowIcon.style.transform = 'rotate(180deg)'
else
arrowIcon.style.transform = 'rotate(0deg)'

}

arrowBtn.addEventListener('click', showImg)
