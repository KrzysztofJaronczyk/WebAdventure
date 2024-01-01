const burgerBtn = document.querySelector('.burger-btn')
const navbar = document.querySelector('.nav')
const navItems = document.querySelectorAll('.nav__item')

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

burgerBtn.addEventListener('click', handleNav)
