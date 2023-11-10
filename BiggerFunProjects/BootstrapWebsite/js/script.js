document.addEventListener('DOMContentLoaded', function () {
	const nav = document.querySelector('.navbar')
	const navbarcollapse = document.querySelector('.navbar-collapse')
	const links = document.querySelectorAll('.nav-link')

	function addShadow() {
		if (window.scrollY >= 300) {
			nav.classList.add('shadow-bg')
		} else {
			nav.classList.remove('shadow-bg')
		}
	}

	function hideCollapse() {
		if (navbarcollapse.classList.contains('show')) {
			navbarcollapse.classList.remove('show')
		}
	}

	links.forEach(link => {
		link.addEventListener('click', function () {
			hideCollapse()
		})
	})

	window.addEventListener('scroll', addShadow)
	window.addEventListener('click', hideCollapse)
})
