'use strict'

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')
const allButtons = document.getElementsByTagName('button')

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')


const openModal = function(e){
    e.preventDefault()
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookies for improved functionality and analytics. <button class = "btn--close-cookie">Got it!</button>'
header.append(message)
message.addEventListener('click', function(){
    message.parentElement.removeChild(message)
})
message.style.backgroundColor = '#37383d'
message.style.width = '120%'
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'
document.documentElement.style.setProperty('--color-primary', 'orangered')

const logo = document.querySelector('.nav__logo')
console.log(logo.getAttribute('designer'))

console.log(logo.src)
console.log(logo.getAttribute('src'))
console.log(logo.dataset.versionNumber)


btnScrollTo.addEventListener('click', function(e){
    const s1coords = section1.getBoundingClientRect()
    console.log(s1coords)
    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)

    // window.scrollTo({
    //     left: s1coords.left + window.pageX, 
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth'
    // })

    section1.scrollIntoView({behavior: 'smooth'})
})

// document.querySelectorAll('.nav__link').forEach(function(el){
//     el.addEventListener('click', function(e){
//         e.preventDefault()
//         const id = this.getAttribute('href')
//         document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//     })
// })

//event delegation: add event listener to parent element
document.querySelector('.nav__links').addEventListener('click', function(e){
    e.preventDefault()
    if(e.target.classList.contains('nav__link')){
        const id = e.target.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    }
})

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('operations__content')

tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab')

    clicked.classList.add('operations__tab--active')
})

const h1 = document.querySelector('h1')

const alertH1 = function(e){
    alert('addEventListener: Great! You are reading the heading')
    h1.removeEventListener('mouseenter', alertH1)
}

// h1.addEventListener('mouseenter', alertH1)
    
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
// console.log(randomColor())

// document.querySelector('.nav__link').addEventListener('click', function(e){
//     // this.style.backgroundColor = randomColor()
//     console.log('LINK', e.target, e.currentTarget)

//     // e.stopPropagation()
// })
// document.querySelector('.nav__links').addEventListener('click', function(e){
//     // this.style.backgroundColor = randomColor()
//     console.log('LINK', e.target, e.currentTarget)
// })
// document.querySelector('.nav').addEventListener('click', function(e){
//     // this.style.backgroundColor = randomColor()
//     console.log('LINK', e.target, e.currentTarget)
// }, true)
 

//children
console.log(h1.children)
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'

//parent
// console.log(h1.parentNode)
// console.log(h1.parentElement)

// h1.closest('.header').style.background = 'var(--gradient-secondary)'

// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

console.log(h1.previousSibling)
console.log(h1.nextSibling)

console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el){
//     if(el !== h1)
//     el.style.transform = 'scale(0.5)'
// })