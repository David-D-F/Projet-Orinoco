const url = "http://localhost:3000/api/teddies"

let requete = new XMLHttpRequest();
requete.open('GET', url)
requete.responseType = 'json';
requete.send();

requete.onload = function () {
    if(requete.readyState === XMLHttpRequest.DONE) {
        if(requete.status === 200) {

            // variable
            let reponse     = requete.response;
            let body        = document.querySelector('body');
            let btn         = document.querySelector('button');
            let section     = document.querySelector('section');
            let h1          = document.querySelector('h1');
            let h2          = document.querySelector('.panier');

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

            //Boucles
            for(const data of reponse) {
                let article = document.createElement('article');
                section.append(article)
                let img  = document.createElement('img');
                let div  = document.createElement('div')
                let h2   = document.createElement('h2');
                let p    = document.createElement('p');
                article.append(img, div);
                div.append(h2, p)
                img.src          = data.imageUrl;
                h2.textContent   = data.name;
                p.textContent    = `Prix : ${data.price} €`;

                article.addEventListener('click', () => {
                    location.href = `produit.html?id=${data._id}`;
                });
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

            
            }
        } else {
            alert(`Un problème est intervenu, merci de revenir plus tard.`);
    }
}

