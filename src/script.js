
// Données des produits
const products = {
    textiles: [
        {
            id: 1,
            name: "Body en coton bio",
            description: "Body doux pour bébé, coton bio, tailles 0-6 mois, motif étoiles",
            price: 7.50,
            image: "👶",
            badge: "Doux"
        },
        {
            id: 2,
            name: "Pyjama à motifs",
            description: "Pyjama une pièce avec pieds, coton extensible, tailles 3-12 mois, motif nuages",
            price: 12.00,
            image: "🛌",
            badge: "Confort"
        },
        {
            id: 3,
            name: "Chaussons en laine",
            description: "Chaussons doux et chauds, laine mérinos, couleur pastel, taille 0-6 mois",
            price: 5.50,
            image: "🧦",
            badge: "Chaud"
        },
        {
            id: 4,
            name: "Bonnet bébé",
            description: "Bonnet tricoté à pompon, couleurs douces, taille naissance à 6 mois",
            price: 6.00,
            image: "🧢",
            badge: "Hiver"
        },
        {
            id: 5,
            name: "Gilet en maille",
            description: "Petit gilet doux en coton, ouverture boutons, couleur crème, taille 0-6 mois",
            price: 9.00,
            image: "🧥",
            badge: "Chaleur"
        },
        {
            id: 6,
            name: "Combinaison hiver",
            description: "Combinaison rembourrée imperméable pour bébé, idéal sorties froides, taille 3-12 mois",
            price: 22.00,
            image: "❄️",
            badge: "Pratique"
        },
        {
            id: 7,
            name: "Salopette bébé",
            description: "Salopette légère en coton, motif animaux, taille 0-6 mois",
            price: 11.50,
            image: "👕",
            badge: "Mignon"
        },
        {
            id: 8,
            name: "T-shirt manches longues",
            description: "T-shirt doux à manches longues, coton bio, motif étoiles, taille 0-6 mois",
            price: 8.00,
            image: "👶",
            badge: "Confort"
        }
    ],

    meubles:[
        {
            id: 13,
            name: "Lit bébé à barreaux",
            description: "Lit sécurisé pour bébé, bois clair, matelas inclus, taille standard 60x120 cm",
            price: 150.00,
            image: "🛏️",
            badge: "Sécurité"
        },
        {
            id: 14,
            name: "Commode à langer",
            description: "Commode pratique avec plan à langer intégré, 3 tiroirs, bois pastel",
            price: 85.00,
            image: "🧸",
            badge: "Pratique"
        },
        {
            id: 15,
            name: "Fauteuil berçant",
            description: "Petit fauteuil confortable pour nourrisson, idéal pour biberon et câlins",
            price: 65.00,
            image: "🪑",
            badge: "Confort"
        },
        {
            id: 16,
            name: "Armoire à vêtements bébé",
            description: "Petit meuble avec tiroirs et penderie, bois doux, idéal pour ranger les affaires de bébé",
            price: 70.00,
            image: "📦",
            badge: "Rangement"
        },
        {
            id: 17,
            name: "Veilleuse étoile",
            description: "Lampe douce et apaisante pour la chambre du bébé, forme d’étoile, lumière chaude",
            price: 25.00,
            image: "⭐",
            badge: "Veilleuse"
        },
        {
            id: 18,
            name: "Table à activités bébé",
            description: "Petit centre d’activités en plastique doux et coloré, musique et formes pour éveil sensoriel",
            price: 45.00,
            image: "🧸",
            badge: "Éveil"
        },
        {
            id: 19,
            name: "Chaise haute bébé",
            description: "Chaise haute avec sécurité et plateau amovible, facile à nettoyer, couleur pastel",
            price: 60.00,
            image: "🪑",
            badge: "Pratique"
        },
        {
            id: 20,
            name: "Mobile musical",
            description: "Mobile doux pour berceau, musique et lumières pastel pour apaiser bébé",
            price: 30.00,
            image: "🎵",
            badge: "Relax"
        }
    ]


};

// État du panier
let cart = [];

// Navigation entre les pages
function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });

    // Afficher la page demandée
    document.getElementById(pageId).classList.add('active');

    // Charger les produits si nécessaire
    if (pageId === 'textiles') {
        loadProducts('textiles');
    } else if (pageId === 'meubles') {
        loadProducts('meubles');
    }
}

// Charger les produits dans la grille
function loadProducts(category) {
    const grid = document.getElementById(category + 'Grid');
    grid.innerHTML = '';

    products[category].forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.innerHTML = `
                    <div class="product-image">
                        ${product.image}
                        <div class="product-badge">${product.badge}</div>
                    </div>
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">${product.price.toFixed(2)} €</span>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">
                                Ajouter
                            </button>
                        </div>
                    </div>
                `;
        grid.appendChild(productCard);
    });
}

// Ajouter un produit au panier
function addToCart(productId) {
    const product = [...products.textiles, ...products.meubles].find(p => p.id === productId);
    if (product) {
        cart.push({...product, cartId: Date.now()});
        updateCartUI();

        // Animation de confirmation
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✓ Ajouté';
        button.style.background = '#4ecdc4';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
    }
}

// Mettre à jour l'interface du panier
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Votre panier est vide</p>';
        cartTotal.textContent = '0,00 €';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${item.price.toFixed(2)} €</div>
                    </div>
                    <button onclick="removeFromCart('${item.cartId}')"
                            style="background: #ff4757; color: white; border: none;
                                   padding: 0.5rem; border-radius: 50%; cursor: pointer;
                                   width: 30px; height: 30px; font-size: 0.8rem;">×</button>
                `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2) + ' €';
}

// Supprimer un article du panier
function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartUI();
}

// Basculer l'affichage du panier
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

// Finaliser la commande (Click & Collect)
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide !');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderNumber = Math.floor(Math.random() * 1000000);

    alert(`Commande confirmée !\n\nNuméro de commande: #${orderNumber}\nTotal: ${total.toFixed(2)} €\n\nVotre commande sera prête pour récupération dans 2h.\nMerci de vous présenter avec ce numéro de commande.`);

    // Vider le panier
    cart = [];
    updateCartUI();
    toggleCart();
}

// Fermer le panier en cliquant sur l'overlay
document.getElementById('cartOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        toggleCart();
    }
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
});