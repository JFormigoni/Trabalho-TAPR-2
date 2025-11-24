// Detectar ambiente
const hostname = window.location.hostname;
const isCodespaces = hostname.includes('github.dev') || hostname.includes('githubpreview.dev') || hostname.includes('app.github.dev');
const isLocalServer = hostname === 'localhost' || hostname === '127.0.0.1';

let API_BASE;
if (isCodespaces) {
    // No Codespaces, substituir porta 3000 por 8083
    API_BASE = window.location.origin.replace('-3000', '-8083');
} else if (isLocalServer) {
    // Local com servidor HTTP
    API_BASE = 'http://localhost:8083';
} else {
    // Fallback
    API_BASE = 'http://localhost:8083';
}

console.log('Hostname:', hostname);
console.log('Is Codespaces:', isCodespaces);
console.log('API Base URL:', API_BASE);

let token = localStorage.getItem('token');
let currentUser = localStorage.getItem('username');

document.addEventListener('DOMContentLoaded', () => {
    if (token) showMainApp();
    
    document.getElementById('auth-form').addEventListener('submit', handleLogin);
    document.getElementById('register-btn').addEventListener('click', handleRegister);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    
    // Adicionar dica visual
    const usernameField = document.getElementById('username');
    usernameField.addEventListener('focus', () => {
        showMessage('Campo "Nome" é necessário apenas para REGISTRO', 'success');
    });
});

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    console.log('Tentando login com:', email);
    
    if (!email || !password) {
        showMessage('Preencha email e senha para fazer login!', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        showMessage('Use seu email para fazer login!', 'error');
        return;
    }
    
    const url = `${API_BASE}/auth-service/auth/login/password`;
    console.log('URL:', url);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        console.log('Response status:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Login bem-sucedido:', data);
            token = data.accessToken || data.token;
            currentUser = email;
            localStorage.setItem('token', token);
            localStorage.setItem('username', email);
            showMessage('Login realizado!', 'success');
            showMainApp();
        } else {
            const errorText = await response.text();
            console.error('Erro na resposta:', errorText);
            showMessage('Email ou senha incorretos', 'error');
        }
    } catch (error) {
        console.error('Erro completo:', error);
        showMessage('Erro ao conectar com o servidor. Verifique se os serviços estão rodando.', 'error');
    }
}

async function handleRegister() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value.trim();
    
    console.log('Tentando registrar:', { username, email });
    
    if (!username || !password || !email) {
        showMessage('Para registrar, preencha TODOS os campos: nome, email e senha!', 'error');
        return;
    }
    
    if (password.length < 8) {
        showMessage('Senha deve ter no mínimo 8 caracteres!', 'error');
        return;
    }
    
    if (!email.includes('@')) {
        showMessage('Email inválido!', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth-service/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password, email })
        });
        
        if (response.ok) {
            showMessage('Registrado! Agora faça login (apenas email e senha)', 'success');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        } else {
            const errorData = await response.json();
            showMessage(errorData.message || 'Erro no registro', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Erro ao conectar com o servidor', 'error');
    }
}

function handleLogout() {
    localStorage.clear();
    location.reload();
}

function showMainApp() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('products-section').style.display = 'block';
    document.getElementById('cart-section').style.display = 'block';
    document.getElementById('orders-section').style.display = 'block';
    document.getElementById('username').textContent = currentUser;
    document.getElementById('logout-btn').style.display = 'block';
    
    loadProducts();
    loadCart();
    loadOrders();
}

async function loadProducts() {
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
        await fetch(`${API_BASE}/cart/items`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        showMessage('Adicionado!', 'success');
        loadCart();
    } catch (error) {
        showMessage('Erro', 'error');
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
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cart.items || cart.items.length === 0) {
        cartItems.innerHTML = '<p>Carrinho vazio</p>';
        checkoutBtn.style.display = 'none';
        return;
    }
    
    checkoutBtn.style.display = 'block';
    
    cartItems.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.productName}</strong><br>
                ${item.quantity}x R$ ${item.price.toFixed(2)} = R$ ${(item.quantity * item.price).toFixed(2)}
            </div>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        </div>
    `).join('') + `<p><strong>Total: R$ ${cart.totalAmount.toFixed(2)}</strong></p>`;
}

async function removeFromCart(itemId) {
    await fetch(`${API_BASE}/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadCart();
}

async function handleCheckout() {
    const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.ok) {
        showMessage('Pedido realizado!', 'success');
        loadCart();
        loadOrders();
    }
}

async function loadOrders() {
    const res = await fetch(`${API_BASE}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const orders = await res.json();
    
    const ordersList = document.getElementById('orders-list');
    if (!orders || orders.length === 0) {
        ordersList.innerHTML = '<p>Nenhum pedido</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(o => `
        <div class="order-card">
            Pedido #${o.id} - ${o.status} - R$ ${o.totalAmount.toFixed(2)}
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
