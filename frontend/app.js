const API = 'http://localhost:8080';
let token = localStorage.getItem('token');

if (token) showApp();

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    if (res.ok) {
        const data = await res.json();
        token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        showApp();
    } else {
        msg('Erro no login', 'error');
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email: username + '@email.com' })
    });
    
    if (res.ok) {
        msg('Registrado! Faça login', 'success');
    } else {
        msg('Erro no registro', 'error');
    }
}

function logout() {
    token = null;
    localStorage.clear();
    location.reload();
}

function showApp() {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    document.getElementById('user-name').textContent = localStorage.getItem('username');
    loadProducts();
    loadCart();
    loadOrders();
}

async function loadProducts() {
    const res = await fetch(`${API}/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const products = await res.json();
    document.getElementById('products').innerHTML = products.map(p => `
        <div class="product">
            <strong>${p.name}</strong> - R$ ${p.price.toFixed(2)} (Estoque: ${p.stock})
            <button onclick="addToCart(${p.id})">Adicionar</button>
        </div>
    `).join('');
}

async function addToCart(productId) {
    await fetch(`${API}/cart/items`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity: 1 })
    });
    msg('Adicionado ao carrinho', 'success');
    loadCart();
}

async function loadCart() {
    const res = await fetch(`${API}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const cart = await res.json();
    
    if (!cart.items || cart.items.length === 0) {
        document.getElementById('cart').innerHTML = '<p>Carrinho vazio</p>';
        return;
    }
    
    document.getElementById('cart').innerHTML = cart.items.map(i => `
        <div class="cart-item">
            ${i.productName} - ${i.quantity}x R$ ${i.price.toFixed(2)} = R$ ${(i.quantity * i.price).toFixed(2)}
            <button onclick="removeFromCart(${i.id})">Remover</button>
        </div>
    `).join('') + `<p><strong>Total: R$ ${cart.totalAmount.toFixed(2)}</strong></p>`;
}

async function removeFromCart(itemId) {
    await fetch(`${API}/cart/items/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadCart();
}

async function checkout() {
    const res = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.ok) {
        msg('Pedido realizado!', 'success');
        loadCart();
        loadOrders();
    }
}

async function loadOrders() {
    const res = await fetch(`${API}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const orders = await res.json();
    
    if (!orders || orders.length === 0) {
        document.getElementById('orders').innerHTML = '<p>Nenhum pedido</p>';
        return;
    }
    
    document.getElementById('orders').innerHTML = orders.map(o => `
        <div class="order">
            Pedido #${o.id} - ${o.status} - R$ ${o.totalAmount.toFixed(2)}
        </div>
    `).join('');
}

function msg(text, type) {
    const el = document.getElementById('message');
    el.textContent = text;
    el.className = type + ' show';
    setTimeout(() => el.className = '', 3000);
}
