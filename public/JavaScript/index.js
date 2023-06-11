const menuBtnElement = document.querySelector('.menu-btn');
console.log(menuBtnElement)
const headerEl = document.querySelector('.main-header');

// function toggleButton() {
//     sideDrawerElement.classList.toggle('nav-open')
// }

// menuBtnElement.addEventListener('click', toggleButton);

menuBtnElement.addEventListener('click', function() {
    headerEl.classList.toggle('nav-open')
});

// STICKY NAVIGATION 
