'use strict';

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')
const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')
const logo = document.querySelector('.nav__logo')
const allButtons = document.getElementsByTagName('button')
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav')


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

// const message = document.createElement('div')
// message.classList.add('cookie-message')
// message.innerHTML = 'We use cookies for improved functionality and analytics. <button class = "btn--close-cookie">Got it!</button>'
// header.append(message)
// message.addEventListener('click', function(){
//     message.parentElement.removeChild(message)
// })
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%'
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px'
// document.documentElement.style.setProperty('--color-primary', 'orangered')


// console.log(logo.getAttribute('designer'))

// console.log(logo.src)
// console.log(logo.getAttribute('src'))
// console.log(logo.dataset.versionNumber)


btnScrollTo.addEventListener('click', function(e){
    const s1coords = section1.getBoundingClientRect()
    // console.log(s1coords)
    // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)

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

const handleHover = function(e){
    if(e.target.classList.contains('nav__link')){
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')

        siblings.forEach(el => {
            if(el !== link) el.style.opacity = this
        })
        logo.style.opacity = this
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))

// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function(e){
//     console.log(window.scrollY)

//     if(this.window.scrollY > initialCoords.top)
//     nav.classList.add('stick')
//     else nav.classList.remove('sticky')
// })

const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries){
    const [entry] = entries
    // console.log(entry.target)

    if(!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

const revealSection = function(entries, headerObserver){
    const [entry] = entries

    if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden')
    headerObserver.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15
})
allSections.forEach(function(section){
    sectionObserver.observe(section)
    // section.classList.add('section--hidden')
})

//Lazy image loader
const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function(entries, observer){
    const [entry] = entries

    if(!entry.isIntersecting) return
    entry.target.src = entry.target.dataset.src

    entry.target.addEventListener('load', function(){
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img))

//Slider
const slider = function(){
const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')
// const slider = document.querySelector('.slider')

let currSlide = 0
const maxSlide = slides.length


const createDots = function(){
   slides.forEach((s, i) =>
    dotContainer.insertAdjacentHTML('beforeend', 
    `<button class = "dots__dot" data-slide='${i}'></button>`)
    ) 
}

const activateDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))

    document.querySelector(`.dots__dot[data-slide = "${slide}"]`).classList.add('dots__dot--active')
}

const gotoSlide = function(slide){
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
}


const nextSlide = function(){
    if(currSlide === maxSlide - 1){
        currSlide = 0
    }else currSlide++

    gotoSlide(currSlide)
    activateDot(currSlide)
}

const prevSlide = function(){
    if(currSlide === 0){
        currSlide = maxSlide - 1
    }else currSlide--

    gotoSlide(currSlide)
    activateDot(currSlide)
}

const init = function(){
    gotoSlide(0)
    createDots()
    activateDot(0)
}
init()

btnRight.addEventListener('click', prevSlide)
btnLeft.addEventListener('click', nextSlide)

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') prevSlide()
    e.key === 'ArrowRight' && nextSlide()
})

dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
        const {slide} = e.target.dataset
        gotoSlide(slide)
        activateDot(slide)
    }
})
}
slider()


tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab')

    if(!clicked) return

        tabs.forEach(t => t.classList.remove('operations__tab--active'))
        clicked.classList.add('operations__tab--active')
        tabsContent.forEach(c => c.classList.remove('operations__content--active'))

        clicked.classList.add('operations__tab--active')
        document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
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
// console.log(h1.children)
// h1.firstElementChild.style.color = 'white'
// h1.lastElementChild.style.color = 'orangered'

//parent
// console.log(h1.parentNode)
// console.log(h1.parentElement)

// h1.closest('.header').style.background = 'var(--gradient-secondary)'

// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)

// console.log(h1.previousSibling)
// console.log(h1.nextSibling)

// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function(el){
//     if(el !== h1)
//     el.style.transform = 'scale(0.5)'
// })

document.addEventListener('DOMContentLoaded', function(e){
    console.log('HTML parsed', e)
})

window.addEventListener('load', function(e){
    console.log('Page fully loaded', e)
})

// window.addEventListener('beforeunload', function(e){
//     e.preventDefault()
//     console.log(e)
//     e.returnValue = ''
// })