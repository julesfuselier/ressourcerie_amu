
// Données des produits
const products = {
    textiles: [
        {
            id: 1,
            name: "T-shirt coloré",
            description: "T-shirt en coton bio avec motifs amusants, taille 6 ans",
            price: 8.50,
            image: "👕",
            badge: "Confort"
        },
        {
            id: 2,
            name: "Robe à pois",
            description: "Robe légère en coton, motifs à pois multicolores, taille 4 ans",
            price: 14.00,
            image: "👗",
            badge: "Mignon"
        },
        {
            id: 3,
            name: "Pull en tricot",
            description: "Pull chaud en laine douce, couleur bleu clair, taille 8 ans",
            price: 19.00,
            image: "🧶",
            badge: "Chaud"
        },
        {
            id: 4,
            name: "Pantalon en velours",
            description: "Pantalon souple en velours côtelé, couleur marron, taille 5 ans",
            price: 12.00,
            image: "👖",
            badge: "Classique"
        },
        {
            id: 5,
            name: "Bonnet rigolo",
            description: "Bonnet en laine avec pompon, couleur rouge, taille unique enfant",
            price: 6.50,
            image: "🧢",
            badge: "Hiver"
        },
        {
            id: 6,
            name: "Veste imperméable",
            description: "Veste coupe-vent imperméable, couleur jaune, taille 7 ans",
            price: 22.00,
            image: "🧥",
            badge: "Pratique"
        }
    ],
    meubles: [
        {
            id: 7,
            name: "Chaise scandinave",
            description: "Chaise design en bois clair, très bon état",
            price: 45.00,
            image: "🪑",
            badge: "Design"
        },
        {
            id: 8,
            name: "Table basse vintage",
            description: "Table basse ronde années 70, bois et métal",
            price: 85.00,
            image: "🪑",
            badge: "Vintage"
        },
        {
            id: 9,
            name: "Lampe de bureau",
            description: "Lampe articulée style industriel, fonctionne parfaitement",
            price: 28.00,
            image: "💡",
            badge: "Fonctionnel"
        },
        {
            id: 10,
            name: "Bibliothèque en pin",
            description: "Étagère 5 niveaux, bois naturel, 180cm de hauteur",
            price: 65.00,
            image: "📚",
            badge: "Pratique"
        },
        {
            id: 11,
            name: "Miroir doré baroque",
            description: "Miroir décoratif style baroque, cadre doré",
            price: 55.00,
            image: "🪞",
            badge: "Déco"
        },
        {
            id: 12,
            name: "Plante d'intérieur",
            description: "Monstera deliciosa avec son pot en céramique",
            price: 15.00,
            image: "🌿",
            badge: "Nature"
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