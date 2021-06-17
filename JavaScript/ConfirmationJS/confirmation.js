let body        = document.querySelector('body');
let btn         = document.querySelector('button');
let section     = document.querySelector('section');
let h1          = document.querySelector('h1');
let h2          = document.querySelector('.panier');
let btnConfirm  = document.querySelector('#confirmation')

// Function
function darkMode() {
    localStorage.setItem('theme', 'dark');
    body.classList.add('dark');
    btn.innerHTML = '<i class="far fa-lightbulb"></i>';
}

function lightMode() {
    localStorage.setItem('theme', 'light');
    body.classList.remove('dark');
    btn.innerHTML = '<i class="fas fa-lightbulb"></i>';
}

// Condition
if(localStorage.getItem('theme') === 'dark') {
    darkMode();
} else {
    lightMode();
}

// Event
btn.addEventListener('click', () => {
    if(body.classList.contains('dark')) {
        lightMode();
    } else {
        darkMode();
    }
});

h1.addEventListener('click', () => {
    location.href = 'index.html';
});

h2.addEventListener('click', () => {
    location.href = 'panier.html';
});

btnConfirm.addEventListener('click', () => {
    localStorage.removeItem('panier');
    alert('Merci pour votre commande! Votre nounours est en route!');
    location.href = 'index.html'
})