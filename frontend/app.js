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
        const response = await fetch(`${API_BASE}/product-service/products`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('Carregando produtos, status:', response.status);
        
        if (response.ok) {
            const products = await response.json();
            console.log('Produtos carregados:', products);
            displayProducts(products);
        } else {
            console.error('Erro ao carregar produtos:', response.status);
            showMessage('Erro ao carregar produtos', 'error');
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        showMessage('Erro ao conectar com o serviço de produtos', 'error');
    }
}

function displayProducts(products) {
    const grid = document.getElementById('products-grid');
    
    if (!products || products.length === 0) {
        grid.innerHTML = '<p style="color: white; text-align: center;">Nenhum produto disponível</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.description || 'Sem descrição'}</p>
            <div class="product-price">R$ ${(product.price || 0).toFixed(2)}</div>
            <p>Estoque: ${product.stock || 0}</p>
            <button onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                ${product.stock > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
            </button>
        </div>
    `).join('');
}

async function addToCart(productId) {
    try {
        console.log('Adicionando produto ao carrinho:', productId);
        
        const response = await fetch(`${API_BASE}/cart-service/cart/items`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        
        console.log('Resposta adicionar ao carrinho:', response.status);
        
        if (response.ok) {
            showMessage('Produto adicionado ao carrinho!', 'success');
            loadCart();
        } else {
            const errorText = await response.text();
            console.error('Erro ao adicionar:', errorText);
            showMessage('Erro ao adicionar ao carrinho', 'error');
        }
    } catch (error) {
        console.error('Erro:', error);
        showMessage('Erro ao conectar com o serviço de carrinho', 'error');
    }
}

async function loadCart() {
    try {
        const response = await fetch(`${API_BASE}/cart-service/cart`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('Carregando carrinho, status:', response.status);
        
        if (response.ok) {
            const cart = await response.json();
            console.log('Carrinho carregado:', cart);
            displayCart(cart);
        } else {
            console.error('Erro ao carregar carrinho:', response.status);
            displayCart({ items: [] });
        }
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        displayCart({ items: [] });
    }
}

function displayCart(cart) {
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cart || !cart.items || cart.items.length === 0) {
        cartItems.innerHTML = '<p>Carrinho vazio</p>';
        checkoutBtn.style.display = 'none';
        return;
    }
    
    checkoutBtn.style.display = 'block';
    
    const total = cart.totalAmount || cart.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    cartItems.innerHTML = cart.items.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.productName || 'Produto'}</strong><br>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" style="padding: 0.25rem 0.5rem; font-size: 0.9rem;" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <span style="font-weight: bold;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" style="padding: 0.25rem 0.5rem; font-size: 0.9rem;">+</button>
                    <span style="margin-left: 0.5rem;">x R$ ${(item.price || 0).toFixed(2)} = R$ ${((item.quantity * item.price) || 0).toFixed(2)}</span>
                </div>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: #dc3545;">Remover</button>
        </div>
    `).join('') + `<div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem; border: 2px solid #667eea;"><strong style="font-size: 1.2rem; color: #667eea;">Total: R$ ${total.toFixed(2)}</strong></div>`;
}

async function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return;
    
    try {
        console.log('Atualizando quantidade:', itemId, newQuantity);
        
        const response = await fetch(`${API_BASE}/cart-service/cart/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        });
        
        if (response.ok) {
            loadCart();
        } else {
            showMessage('Erro ao atualizar quantidade', 'error');
        }
    } catch (error) {
        console.error('Erro ao atualizar quantidade:', error);
        showMessage('Erro ao conectar com o serviço', 'error');
    }
}

async function removeFromCart(itemId) {
    try {
        console.log('Removendo item do carrinho:', itemId);
        
        const response = await fetch(`${API_BASE}/cart-service/cart/items/${itemId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            showMessage('Item removido do carrinho', 'success');
            loadCart();
        } else {
            showMessage('Erro ao remover item', 'error');
        }
    } catch (error) {
        console.error('Erro ao remover item:', error);
        showMessage('Erro ao conectar com o serviço', 'error');
    }
}

async function handleCheckout() {
    try {
        console.log('Finalizando pedido...');
        
        const response = await fetch(`${API_BASE}/order-service/orders`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Resposta checkout:', response.status);
        
        if (response.ok) {
            showMessage('Pedido realizado com sucesso!', 'success');
            loadCart();
            loadOrders();
        } else {
            const errorText = await response.text();
            console.error('Erro no checkout:', errorText);
            showMessage('Erro ao finalizar pedido', 'error');
        }
    } catch (error) {
        console.error('Erro no checkout:', error);
        showMessage('Erro ao conectar com o serviço de pedidos', 'error');
    }
}

async function loadOrders() {
    try {
        const response = await fetch(`${API_BASE}/order-service/orders`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log('Carregando pedidos, status:', response.status);
        
        if (response.ok) {
            const orders = await response.json();
            console.log('Pedidos carregados:', orders);
            displayOrders(orders);
        } else {
            console.error('Erro ao carregar pedidos:', response.status);
            displayOrders([]);
        }
    } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
        displayOrders([]);
    }
}

function displayOrders(orders) {
    const ordersList = document.getElementById('orders-list');
    
    if (!orders || orders.length === 0) {
        ordersList.innerHTML = '<p style="color: white;">Nenhum pedido realizado</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <strong>Pedido #${order.id}</strong><br>
            Status: <span style="color: #667eea; font-weight: bold;">${order.status || 'PENDENTE'}</span><br>
            Total: R$ ${(order.totalAmount || 0).toFixed(2)}<br>
            <small>Data: ${order.createdAt ? new Date(order.createdAt).toLocaleString('pt-BR') : 'N/A'}</small>
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

function demoMode() {
    // Modo demo sem autenticação
    token = 'demo-token';
    currentUser = 'Demo User';
    localStorage.setItem('token', token);
    localStorage.setItem('username', currentUser);
    showMessage('Modo Demo ativado!', 'success');
    showMainApp();
}
