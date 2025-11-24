const API_BASE = 'http://localhost:8083';
let token = localStorage.getItem('token');
let currentUser = localStorage.getItem('username');

// Elements
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const productsSection = document.getElementById('products-section');
const cartSection = document.getElementById('cart-section');
const ordersSection = document.getElementById('orders-section');
const usernameDisplay = document.getElementById('username');
const logoutBtn = document.getElementById('logout-btn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        showMainApp();
    }
    
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('show-register').addEventListener('click', (e) => {
        e.preventDefault();
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });
    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });
    logoutBtn.addEventListener('click', handleLogout);
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        showMessage('Preencha todos os campos!', 'error');
        return;
    }
    
    if (username.length < 3) {
        showMessage('Usuário deve ter pelo menos 3 caracteres!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            token = data.token;
            currentUser = username;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            showMessage('Login realizado com sucesso!', 'success');
            showMainApp();
        } else {
            showMessage('Erro no login. Verifique suas credenciais.', 'error');
        }
    } catch (error) {
        showMessage('Erro ao conectar com o servidor.', 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value.trim();
    
    if (!username || !password || !email) {
        showMessage('Preencha todos os campos!', 'error');
        return;
    }
    
    if (username.length < 3) {
        showMessage('Usuário deve ter pelo menos 3 caracteres!', 'error');
        return;
    }
    
    if (password.length < 4) {
        showMessage('Senha deve ter pelo menos 4 caracteres!', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        showMessage('Email inválido!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        
        if (response.ok) {
            showMessage('Registro realizado! Faça login.', 'success');
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
            document.getElementById('register-form').reset();
        } else {
            showMessage('Erro no registro. Tente outro usuário.', 'error');
        }
    } catch (error) {
        showMessage('Erro ao conectar com o servidor.', 'error');
    }
}

function handleLogout() {
    token = null;
    currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    showLoginScreen();
}

function showLoginScreen() {
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
    productsSection.style.display = 'none';
    cartSection.style.display = 'none';
    ordersSection.style.display = 'none';
    usernameDisplay.textContent = '';
    logoutBtn.style.display = 'none';
}

function showMainApp() {
    loginSection.style.display = 'none';
    registerSection.style.display = 'none';
    productsSection.style.display = 'block';
    cartSection.style.display = 'block';
    ordersSection.style.display = 'block';
    usernameDisplay.textContent = `Olá, ${currentUser}!`;
    logoutBtn.style.display = 'block';
    
    loadProducts();
    loadCart();
    loadOrders();
}

async function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '<div class="loading">Carregando produtos</div>';
    
    try {
        const response = await fetch(`${API_BASE}/products`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const products = await response.json();
            displayProducts(products);
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        grid.innerHTML = '<p>Erro ao carregar produtos</p>';
    }
}

function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">R$ ${product.price.toFixed(2)}</div>
            <p>Estoque: ${product.stock}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        </div>
    `).join('');
}

async function addToCart(productId) {
    try {
        const response = await fetch(`${API_BASE}/cart/items`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        if (response.ok) {
            showMessage('Produto adicionado ao carrinho!', 'success');
            loadCart();
        }
    } catch (error) {
        showMessage('Erro ao adicionar produto.', 'error');
    }
}

async function loadCart() {
    try {
        const response = await fetch(`${API_BASE}/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const cart = await response.json();
            displayCart(cart);
        }
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
    }
}

function displayCart(cart) {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cart.items || cart.items.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">🛒 Seu carrinho está vazio</p>';
        cartTotal.innerHTML = '';
        cartCount.textContent = '';
        checkoutBtn.style.display = 'none';
        return;
    }
    
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `(${totalItems} ${totalItems === 1 ? 'item' : 'itens'})`;
    checkoutBtn.style.display = 'block';
    
    cartItems.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.productName}</strong><br>
                Quantidade: ${item.quantity} x R$ ${item.price.toFixed(2)}
            </div>
            <div>
                <strong>R$ ${(item.quantity * item.price).toFixed(2)}</strong>
                <button onclick="removeFromCart(${item.id})">Remover</button>
            </div>
        </div>
    `).join('');
    
    cartTotal.innerHTML = `Total: R$ ${cart.totalAmount.toFixed(2)}`;
}

async function removeFromCart(itemId) {
    try {
        const response = await fetch(`${API_BASE}/cart/items/${itemId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            showMessage('Item removido do carrinho!', 'success');
            loadCart();
        }
    } catch (error) {
        showMessage('Erro ao remover item.', 'error');
    }
}

async function handleCheckout() {
    try {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            showMessage('Pedido realizado com sucesso!', 'success');
            loadCart();
            loadOrders();
        } else {
            showMessage('Erro ao finalizar pedido.', 'error');
        }
    } catch (error) {
        showMessage('Erro ao processar pedido.', 'error');
    }
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_BASE}/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const orders = await response.json();
            displayOrders(orders);
        }
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
    }
}

function displayOrders(orders) {
    const ordersList = document.getElementById('orders-list');
    
    if (!orders || orders.length === 0) {
        ordersList.innerHTML = '<p>Nenhum pedido encontrado</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <h3>Pedido #${order.id}</h3>
            <p>Data: ${new Date(order.orderDate).toLocaleDateString('pt-BR')}</p>
            <p>Status: <span class="order-status status-${order.status}">${order.status}</span></p>
            <p><strong>Total: R$ ${order.totalAmount.toFixed(2)}</strong></p>
        </div>
    `).join('');
}

function showMessage(message, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    setTimeout(() => {
        messageEl.className = 'message';
    }, 3000);
}
