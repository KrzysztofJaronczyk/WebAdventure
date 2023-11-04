const sizeUp = document.querySelector('.size-up');
const sizeDown = document.querySelector('.size-down');
const color = document.querySelector('.color');
const p = document.querySelector('p');

function sizeUpText() {
	let fontSize = parseInt(window.getComputedStyle(p).fontSize);
	fontSize += 10;
	p.style.fontSize = fontSize + 'px';
}

sizeUp.addEventListener('click', sizeUpText);

function sizeDownText() {
	let fontSize = parseInt(window.getComputedStyle(p).fontSize);
	fontSize -= 10;
	p.style.fontSize = fontSize + 'px';
}

sizeDown.addEventListener('click', sizeDownText);

function changeColor() {
	p.style.color = ramdomColor();
}

function ramdomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}
color.addEventListener('click', changeColor);