const link    = location.search;
const newLink = link.split('=')
const id      = newLink[1];
const url     = `http://localhost:3000/api/teddies/${id}`

let requete = new XMLHttpRequest();
requete.open('GET', url)
requete.responseType = 'json';
requete.send();

requete.onload = function () {
    if(requete.readyState === XMLHttpRequest.DONE) {
        if(requete.status === 200) {
            let reponse = requete.response;
            document.title = `Orinoco | ${reponse.name}`;
            let body       = document.querySelector('body');
            let btn        = document.querySelector('button');
            let h1         = document.querySelector('h1');
            let h2         = document.querySelector('.panier');
            let img        = document.querySelector('.imgProduit');
            let h2Produit  = document.querySelector('.h2Produit');
            let pProduit   = document.querySelector('.pProduit');
            let pPrix      = document.querySelector('.pPrix');
            let select     = document.querySelector('#color');
            let btnAdd     = document.querySelector('.buttonPanier');

            img.src               = reponse.imageUrl;
            h2Produit.textContent = reponse.name;
            pProduit.textContent  = reponse.description;
            pPrix.textContent     = `${reponse.price} €`;

            // Boucles
            for(const color of reponse.colors) {
                let option = document.createElement('option');
                select.append(option);
                option.textContent = color;
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

            let articles = [];
            let name     = [];
            let produit  = {
                name: reponse.name,
                prix: reponse.price,
                img : reponse.imageUrl,
                quantite : 1
            }

            btnAdd.addEventListener('click', () => {
                let storage = JSON.parse(localStorage.getItem('panier'));
                let add     = false;
                if(!storage) {
                    articles.push(produit);
                    localStorage.setItem('panier', JSON.stringify(articles));
                } else {
                    articles = storage;
                   
                    for(const article of articles){
                        name.push(article.name)
                        if(name.includes(produit.name)) {
                            add = false;
                        } else {
                            add = true;
                        }
                    }

                    if(add) {
                        articles.push(produit);
                        localStorage.setItem('panier', JSON.stringify(articles))
                    } 
                }
                location.href = "panier.html"
            });
            } else {
            alert(`Un problème est intervenu, merci de revenir plus tard.`);
        }
    }
}
