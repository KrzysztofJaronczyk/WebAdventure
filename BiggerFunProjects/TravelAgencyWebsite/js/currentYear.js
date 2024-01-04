const footerYear = document.querySelector('.footer__year')

const handleFooterYear = () => {
	const year = new Date().getFullYear()
	footerYear.textContent = year
}

handleFooterYear()
