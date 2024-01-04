const burgerBtn = document.querySelector('.burger-btn')
const navbar = document.querySelector('.nav')
const navItems = document.querySelectorAll('.nav__item')
const navBtnBars = document.querySelector('.burger-btn__bars')
const allSections = document.querySelectorAll('.section')

const handleNavItemsAnimation = () => {
	let delay = 0

	navItems.forEach(item => {
		item.classList.toggle('nav-items-animation')
		item.style.animationDelay = `.${delay}s`
		delay++
	})
}

const handleNav = () => {
	navbar.classList.toggle('nav--active')

	navBtnBars.classList.remove('black-bars-color')

	if (!navbar.classList.contains('nav--active')) {
		handleObserver()
	}

	navItems.forEach(item => {
		item.addEventListener('click', () => {
			navbar.classList.remove('nav--active')
			navItems.forEach(item => {
				item.classList.remove('nav-items-animation')
			})
		})
	})
	handleNavItemsAnimation()
}

const handleObserver = () => {
	const currentSection = window.scrollY

	allSections.forEach(section => {
		if (section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.add('black-bars-color')
		} else if (!section.classList.contains('white-section') && section.offsetTop <= currentSection + 60) {
			navBtnBars.classList.remove('black-bars-color')
		}
	})
}

burgerBtn.addEventListener('click', handleNav)
window.addEventListener('scroll', handleObserver)
