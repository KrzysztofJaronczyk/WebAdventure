const navMobile = document.querySelector('.nav-mobile')
const navBtn = document.querySelector('.hamburger')
const footerYear = document.querySelector('.footer__year')

const handleNav = () => {
	navMobile.classList.toggle('nav-mobile--active')
	navBtn.classList.toggle('hamburger--active')
}

navBtn.addEventListener('click', handleNav)

const handleCurrentYear = () => {
	const currentYear = new Date().getFullYear()
	footerYear.textContent = currentYear
}

handleCurrentYear()
