# 🧪 Guia de Teste dos Endpoints - Backend

## 📋 Índice
1. [Auth Service - Autenticação](#auth-service)
2. [Product Service - Produtos](#product-service)
3. [Cart Service - Carrinho](#cart-service)
4. [Order Service - Pedidos](#order-service)

---

## 🔐 Auth Service

### 1. Registrar Novo Usuário
```bash
curl -X POST http://localhost:8083/auth-service/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"João Silva\",\"email\":\"joao@email.com\",\"password\":\"senha12345\"}"
```

**Resposta esperada:** Status 201 Created
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com"
}
```

### 2. Login com Senha
```bash
curl -X POST http://localhost:8083/auth-service/auth/login/password ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"joao@email.com\",\"password\":\"senha12345\"}"
```

**Resposta esperada:** Status 200 OK
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer"
}
```

**⚠️ IMPORTANTE:** Copie o `accessToken` para usar nos próximos testes!

### 3. Listar Todos os Usuários
```bash
curl -X GET http://localhost:8083/auth-service/users ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 4. Buscar Usuário por ID
```bash
curl -X GET http://localhost:8083/auth-service/users/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📦 Product Service (Tires/Pneus)

### 1. Listar Todos os Pneus
```bash
curl -X GET http://localhost:8083/product-service/api/tires ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8083/product-service/api/tires" -Headers @{"Authorization"="Bearer $token"}
```

**Resposta esperada:** Lista de pneus
```json
[
  {
    "id": 1,
    "brand": "Michelin",
    "model": "Primacy 4",
    "size": "205/55R16",
    "price": 450.00,
    "stock": 50,
    "season": "ALL_SEASON"
  }
]
```

### 2. Buscar Pneu por ID
```bash
curl -X GET http://localhost:8083/product-service/api/tires/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 3. Buscar por Marca
```bash
curl -X GET http://localhost:8083/product-service/api/tires/brand/Michelin ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 4. Buscar por Tamanho
```bash
curl -X GET http://localhost:8083/product-service/api/tires/size/205/55R16 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 5. Buscar por Temporada
```bash
curl -X GET http://localhost:8083/product-service/api/tires/season/SUMMER ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Temporadas disponíveis:** SUMMER, WINTER, ALL_SEASON

### 6. Criar Novo Pneu
```bash
curl -X POST http://localhost:8083/product-service/api/tires ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI" ^
  -H "Content-Type: application/json" ^
  -d "{\"brand\":\"Pirelli\",\"model\":\"P Zero\",\"size\":\"245/40R18\",\"width\":245,\"profile\":40,\"diameter\":18,\"loadIndex\":\"97\",\"speedRating\":\"Y\",\"season\":\"SUMMER\",\"price\":750.00,\"stock\":20,\"description\":\"Pneu esportivo\"}"
```

---

## 🛒 Cart Service

### 1. Ver Carrinho do Usuário
```bash
curl -X GET http://localhost:8083/cart-service/api/cart/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8083/cart-service/api/cart/1" -Headers @{"Authorization"="Bearer $token"}
```

**Nota:** Substitua `1` pelo ID do usuário

**Resposta esperada:**
```json
{
  "id": 1,
  "userId": 1,
  "items": [],
  "totalAmount": 0.0
}
```

### 2. Adicionar Item ao Carrinho
```bash
curl -X POST http://localhost:8083/cart-service/api/cart/1/items ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI" ^
  -H "Content-Type: application/json" ^
  -d "{\"tireId\":1,\"quantity\":2}"
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8083/cart-service/api/cart/1/items" -Method POST -Headers @{"Authorization"="Bearer $token";"Content-Type"="application/json"} -Body '{"tireId":1,"quantity":2}'
```

### 3. Atualizar Quantidade de Item
```bash
curl -X PUT http://localhost:8083/cart-service/api/cart/1/items/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI" ^
  -H "Content-Type: application/json" ^
  -d "{\"quantity\":5}"
```

### 4. Remover Item do Carrinho
```bash
curl -X DELETE http://localhost:8083/cart-service/api/cart/1/items/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 5. Limpar Carrinho
```bash
curl -X DELETE http://localhost:8083/cart-service/api/cart/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 📋 Order Service

### 1. Listar Todos os Pedidos
```bash
curl -X GET http://localhost:8083/order-service/api/orders ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8083/order-service/api/orders" -Headers @{"Authorization"="Bearer $token"}
```

### 2. Buscar Pedido por ID
```bash
curl -X GET http://localhost:8083/order-service/api/orders/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 3. Buscar Pedidos por Usuário
```bash
curl -X GET http://localhost:8083/order-service/api/orders/user/1 ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8083/order-service/api/orders/user/1" -Headers @{"Authorization"="Bearer $token"}
```

### 4. Buscar Pedidos por Status
```bash
curl -X GET http://localhost:8083/order-service/api/orders/status/PENDING ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Status possíveis:** PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED

### 5. Criar Novo Pedido
```bash
curl -X POST http://localhost:8083/order-service/api/orders ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI" ^
  -H "Content-Type: application/json" ^
  -d "{\"userId\":1,\"items\":[{\"tireId\":1,\"quantity\":2,\"price\":450.00}],\"totalAmount\":900.00}"
```

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8083/order-service/api/orders" -Method POST -Headers @{"Authorization"="Bearer $token";"Content-Type"="application/json"} -Body '{"userId":1,"items":[{"tireId":1,"quantity":2,"price":450.00}],"totalAmount":900.00}'
```

### 6. Atualizar Status do Pedido
```bash
curl -X PUT http://localhost:8083/order-service/api/orders/1/status ^
  -H "Authorization: Bearer SEU_TOKEN_AQUI" ^
  -H "Content-Type: application/json" ^
  -d "{\"status\":\"CONFIRMED\"}"
```

---

## 🔄 Fluxo Completo de Teste

### Passo 1: Criar Usuário e Fazer Login
```bash
# 1. Registrar
curl -X POST http://localhost:8083/auth-service/users -H "Content-Type: application/json" -d "{\"name\":\"Teste User\",\"email\":\"teste@email.com\",\"password\":\"senha12345\"}"

# 2. Login
curl -X POST http://localhost:8083/auth-service/auth/login/password -H "Content-Type: application/json" -d "{\"email\":\"teste@email.com\",\"password\":\"senha12345\"}"
```

### Passo 2: Listar Produtos
```bash
curl -X GET http://localhost:8083/product-service/products -H "Authorization: Bearer SEU_TOKEN"
```

### Passo 3: Adicionar ao Carrinho
```bash
curl -X POST http://localhost:8083/cart-service/cart/items -H "Authorization: Bearer SEU_TOKEN" -H "Content-Type: application/json" -d "{\"productId\":1,\"quantity\":2}"
```

### Passo 4: Ver Carrinho
```bash
curl -X GET http://localhost:8083/cart-service/cart -H "Authorization: Bearer SEU_TOKEN"
```

### Passo 5: Finalizar Pedido
```bash
curl -X POST http://localhost:8083/order-service/orders -H "Authorization: Bearer SEU_TOKEN"
```

### Passo 6: Ver Pedidos
```bash
curl -X GET http://localhost:8083/order-service/orders -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🛠️ Ferramentas Alternativas

### Usando PowerShell (Invoke-WebRequest)
```powershell
# Registrar usuário
Invoke-WebRequest -Uri "http://localhost:8083/auth-service/users" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"name":"João","email":"joao@email.com","password":"senha12345"}'

# Login
$response = Invoke-WebRequest -Uri "http://localhost:8083/auth-service/auth/login/password" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"joao@email.com","password":"senha12345"}'
$token = ($response.Content | ConvertFrom-Json).accessToken

# Listar produtos
Invoke-WebRequest -Uri "http://localhost:8083/product-service/products" -Headers @{"Authorization"="Bearer $token"}
```

### Usando Postman
1. Importe a coleção de endpoints
2. Configure a variável `{{token}}` após o login
3. Execute os requests na ordem desejada

---

## 📊 Verificação de Saúde dos Serviços

### Eureka Dashboard
```
http://localhost:8080
```

### Endpoints Diretos (sem Gateway)
- Auth Service: http://localhost:8084
- Product Service: http://localhost:8085
- Order Service: http://localhost:8086
- Cart Service: http://localhost:8087

---

## ⚠️ Notas Importantes

1. **Token JWT:** Sempre use o token obtido no login nos headers das requisições
2. **Gateway:** Todas as requisições passam pelo Gateway (porta 8083)
3. **CORS:** Configurado para aceitar requisições de qualquer origem
4. **Dados em Memória:** Os dados são perdidos ao reiniciar os serviços (H2 Database)

---

## 🐛 Troubleshooting

### Erro 401 Unauthorized
- Verifique se o token está correto
- Verifique se o token não expirou
- Faça login novamente

### Erro 404 Not Found
- Verifique se a URL está correta
- Verifique se o serviço está rodando
- Verifique o Eureka Dashboard

### Erro 500 Internal Server Error
- Verifique os logs do serviço
- Verifique se todos os serviços estão rodando
- Verifique se o banco de dados está acessível
