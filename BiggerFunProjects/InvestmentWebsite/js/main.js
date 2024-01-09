const navMobile = document.querySelector('.nav-mobile')
const navBtn = document.querySelector('.hamburger')
// const navLinks = document.querySelectorAll('.nav__link')
const footerYear = document.querySelector('.footer__year')

addEventListener('click', e => {
	if (e.target.classList.contains('nav__link')) {
		navMobile.classList.remove('nav-mobile--active')
		navBtn.classList.remove('is-active')
	}
})

const handleNav = () => {
	navMobile.classList.toggle('nav-mobile--active')
	navBtn.classList.toggle('is-active')
}

navBtn.addEventListener('click', handleNav)

const handleCurrentYear = () => {
	const currentYear = new Date().getFullYear()
	footerYear.textContent = currentYear
}

handleCurrentYear()

const handleTitle = () => {
	const title = document.querySelector('title')
	const hidden = 'Give us your money, why not? xD'
	const visible = 'Ridiculus Investment'
	const isVisible = document.visibilityState === 'visible'

	title.textContent = isVisible ? visible : hidden
}

addEventListener('visibilitychange', handleTitle)
