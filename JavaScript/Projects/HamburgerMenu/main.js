const burgerBtn = document.querySelector('.burger');
const barsIco = document.querySelector('.fa-bars');
const xIco = document.querySelector('.fa-times');
const nav = document.querySelector('nav ul');

const toggleNav = () => {
    xIco.classList.toggle('hide');
    barsIco.classList.toggle('hide');
    nav.classList.toggle('active');
    burgerBtn.classList.toggle('active');   
}

burgerBtn.addEventListener('click', toggleNav);