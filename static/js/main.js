let menu = document.querySelector('.l-header__menu')
let nav = document.querySelector('.l-header__list')
let iconNav = document.querySelector('.l-header__icons')
menu.appendChild(nav.cloneNode(true))
menu.appendChild(iconNav.cloneNode(true))

let body = document.querySelector('body')
let menuBtn = document.querySelector('.l-header__menu-btn')
menuBtn.addEventListener('click', () => {
	body.classList.toggle('side-open')
})
menu.addEventListener('click', () => {
	body.classList.remove('side-open')
})