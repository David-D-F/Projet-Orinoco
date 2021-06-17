let btn     = document.querySelector('button');
let body    = document.querySelector('body');
let h1      = document.querySelector('h1');
let h2      = document.querySelector('.panier');
let section = document.createElement('section');
let divPrix = document.createElement('divPrix');
let pPrix   = document.createElement('p');
body.append(section, divPrix)
section.classList.add('sectionPanier')
divPrix.append(pPrix)
divPrix.classList.add('divPrix')
let panier  = JSON.parse(localStorage.getItem('panier'));
let article;
let img;    
let h2Bis;        
let p;         
let div;       
let btnDelete; 
let btnAdd;   
let total = 0;


if(localStorage.getItem('panier') === null) {
    let p = document.createElement('p')
    section.append(p)
    section.classList.add('panierVide')
    p.textContent = 'Votre panier est vide'
    divPrix.style.display = 'none'
} else {
    
    for(let i = 0; i < panier.length; i ++) {
        
        article   = document.createElement('article');
        img       = document.createElement('img');
        h2Bis     = document.createElement('h2');
        p         = document.createElement('p');
        div       = document.createElement('div')
        btnDelete = document.createElement('button');
        btnAdd    = document.createElement('button');
        section.append(article)
        article.append(img,h2Bis, p, div)
        div.append(btnDelete, btnAdd)
        article.classList.add(i)
        img.src             = panier[i].img;
        h2Bis.textContent   = panier[i].name;
        p.textContent       = `${panier[i].prix} €`;
        btnDelete.innerHTML = '<i class="far fa-trash-alt"></i>';
        btnAdd.innerHTML    = '<i class="fas fa-plus"></i>';
        total               += panier[i].prix
        pPrix.textContent   = `Prix total: ${total} €`

        btnDelete.addEventListener('click', () => {
            console.log(i)
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
            total += panier[i].prix;
            pPrix.textContent = `Prix total: ${total} €`;
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



