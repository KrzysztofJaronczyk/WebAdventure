const follower = document.querySelector('#following-gradient')

document.addEventListener('mousemove', e => {
	follower.animate(
		{
			left: `${e.clientX}px`,
			top: `${e.clientY}px`,
		},
		{ duration: 3000, fill: 'forwards' }
	)
})
