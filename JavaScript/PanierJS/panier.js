let btn             = document.querySelector('button');
let body            = document.querySelector('body');
let h1              = document.querySelector('h1');
let h2              = document.querySelector('.panier');
let section         = document.createElement('section');
let divPrix         = document.createElement('divPrix');
let pPrix           = document.createElement('p');
let btnConfirmation = document.createElement('button');
btnConfirmation.textContent = 'Acheter';
body.append(section, divPrix)
section.classList.add('sectionPanier')
divPrix.append(pPrix, btnConfirmation)
divPrix.classList.add('divPrix')
let panier  = JSON.parse(localStorage.getItem('panier'));
let article;
let img;    
let h2Bis;        
let p;         
let div;       
let btnDelete; 
let btnAdd;
let btnLess;
let nbProduit;  
let total = 0;

btnConfirmation.addEventListener('click', () => {
    location.href = 'confirmation.html'
})

if(localStorage.getItem('panier') === null) {
    let p = document.createElement('p')
    section.append(p)
    section.classList.add('panierVide')
    p.textContent = 'Votre panier est vide'
    divPrix.style.display = 'none'
} else {
    for(let i = 0; i < panier.length; i++) {
        article         = document.createElement('article');
        img             = document.createElement('img');
        h2Bis           = document.createElement('h2');
        p               = document.createElement('p');
        div             = document.createElement('div');
        btnConfirmation = document.createElement('button')
        btnDelete       = document.createElement('button');
        btnAdd          = document.createElement('button');
        btnLess         = document.createElement('button');
        nbProduit       = document.createElement('p');

        section.append(article)
        article.append(img,h2Bis, p, div, nbProduit)
        div.append(btnDelete, btnLess, btnAdd)
        article.classList.add(i)
        img.src               = panier[i].img;
        h2Bis.textContent     = panier[i].name;
        p.textContent         = `${panier[i].quantite * panier[i].prix} €`;
        btnDelete.innerHTML   = '<i class="far fa-trash-alt"></i>';
        btnLess.textContent   = '-';
        btnAdd.innerHTML      = '<i class="fas fa-plus"></i>';
        total                 += panier[i].prix * panier[i].quantite;
        nbProduit.textContent = `Nombre de produit(s): ${panier[i].quantite}`
        pPrix.textContent     = `Prix total: ${total} €`;

        btnDelete.addEventListener('click', () => {
            if(panier.length === 1) {
                localStorage.removeItem('panier');
                document.location.reload();
            } else if (i === 0)  {
                i+=1;
                panier.splice(0, i)
                localStorage.setItem('panier', JSON.stringify(panier))
                document.location.reload()
            } else {
                panier.splice(i, 1);
                localStorage.setItem('panier', JSON.stringify(panier))
                document.location.reload()
            }        
        });

        btnAdd.addEventListener('click', () => {
            ++panier[i].quantite;
            localStorage.setItem('panier', JSON.stringify(panier));
            document.location.reload();
        })

        btnLess.addEventListener('click', () => {
            if(panier[i].quantite == 1) {
                btnLess.disabled = true;
            } else {
                --panier[i].quantite;
                localStorage.setItem('panier', JSON.stringify(panier));
                document.location.reload();
            }
        })
    }
}

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




