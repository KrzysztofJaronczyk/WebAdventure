const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

document.querySelector('h1').onmouseover = e => {
    let interactions = 0

    const interval = setInterval(() => {
        e.target.innerText = e.target.innerText.split('').map((letter, index) => {
            if (index < interactions) {
                return e.target.dataset.value[index]
            } else {
                const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length))
                return randomLetter
            }
        }).join('')

        if (interactions >= e.target.dataset.value.length) clearInterval(interval)
        interactions += 1 / 3
    }, 60)
}