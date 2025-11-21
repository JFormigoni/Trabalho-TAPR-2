# Comandos Rápidos

## Iniciar Projeto

### Com Docker
```bash
docker compose up --build
```

### Sem Docker (PowerShell)
```powershell
.\start-services.ps1
```

## Testar Endpoints

### Script Automático
```powershell
.\test-endpoints.ps1
```

### Comandos Individuais

#### Product Service (Pneus)
```bash
# Listar todos
curl http://localhost:8085/api/tires

# Buscar por ID
curl http://localhost:8085/api/tires/1

# Buscar Michelin
curl http://localhost:8085/api/tires/brand/Michelin

# Buscar por dimensões
curl "http://localhost:8085/api/tires/search?width=205&profile=55&diameter=16"

# Criar pneu
curl -X POST http://localhost:8085/api/tires -H "Content-Type: application/json" -d "{\"brand\":\"Dunlop\",\"model\":\"Sport\",\"size\":\"225/45R17\",\"width\":225,\"profile\":45,\"diameter\":17,\"loadIndex\":\"94\",\"speedRating\":\"W\",\"season\":\"SUMMER\",\"price\":580.00,\"stock\":30}"
```

#### Cart Service (Carrinho)
```bash
# Ver carrinho
curl http://localhost:8087/api/cart/1

# Adicionar item
curl -X POST http://localhost:8087/api/cart/1/items -H "Content-Type: application/json" -d "{\"tireId\":1,\"tireBrand\":\"Michelin\",\"tireModel\":\"Primacy 4\",\"tireSize\":\"205/55R16\",\"price\":450.00,\"quantity\":4}"

# Atualizar quantidade
curl -X PUT "http://localhost:8087/api/cart/1/items/1?quantity=2"

# Remover item
curl -X DELETE http://localhost:8087/api/cart/1/items/1

# Limpar carrinho
curl -X DELETE http://localhost:8087/api/cart/1
```

#### Order Service (Pedidos)
```bash
# Listar todos
curl http://localhost:8086/api/orders

# Buscar por ID
curl http://localhost:8086/api/orders/1

# Pedidos do usuário
curl http://localhost:8086/api/orders/user/1

# Criar pedido
curl -X POST http://localhost:8086/api/orders -H "Content-Type: application/json" -d "{\"userId\":1,\"items\":[{\"tireId\":1,\"tireBrand\":\"Michelin\",\"tireModel\":\"Primacy 4\",\"tireSize\":\"205/55R16\",\"price\":450.00,\"quantity\":4}],\"deliveryAddress\":\"Rua Exemplo, 123\",\"deliveryCity\":\"São Paulo\",\"deliveryState\":\"SP\",\"deliveryZipCode\":\"01234-567\"}"

# Atualizar status
curl -X PATCH "http://localhost:8086/api/orders/1/status?status=CONFIRMED"

# Cancelar
curl -X DELETE http://localhost:8086/api/orders/1
```

## Compilar Serviços

```bash
# Product Service
cd product-service
.\mvnw.cmd clean install -DskipTests

# Cart Service
cd cart-service
.\mvnw.cmd clean install -DskipTests

# Order Service
cd order-service
.\mvnw.cmd clean install -DskipTests

# Gateway Service
cd gateway-service
.\mvnw.cmd clean install -DskipTests

# Auth Service
cd auth-service
.\mvnw.cmd clean install -DskipTests
```

## URLs Importantes

| Serviço | URL |
|---------|-----|
| Eureka Dashboard | http://localhost:8080 |
| Gateway | http://localhost:8083 |
| Auth Service | http://localhost:8084 |
| Product Service | http://localhost:8085/api/tires |
| Order Service | http://localhost:8086/api/orders |
| Cart Service | http://localhost:8087/api/cart/1 |

## Fluxo Completo de Teste

```bash
# 1. Listar pneus
curl http://localhost:8085/api/tires

# 2. Adicionar ao carrinho
curl -X POST http://localhost:8087/api/cart/1/items -H "Content-Type: application/json" -d "{\"tireId\":1,\"tireBrand\":\"Michelin\",\"tireModel\":\"Primacy 4\",\"tireSize\":\"205/55R16\",\"price\":450.00,\"quantity\":4}"

# 3. Ver carrinho
curl http://localhost:8087/api/cart/1

# 4. Criar pedido
curl -X POST http://localhost:8086/api/orders -H "Content-Type: application/json" -d "{\"userId\":1,\"items\":[{\"tireId\":1,\"tireBrand\":\"Michelin\",\"tireModel\":\"Primacy 4\",\"tireSize\":\"205/55R16\",\"price\":450.00,\"quantity\":4}],\"deliveryAddress\":\"Rua Exemplo, 123\",\"deliveryCity\":\"São Paulo\",\"deliveryState\":\"SP\",\"deliveryZipCode\":\"01234-567\"}"

# 5. Ver pedido
curl http://localhost:8086/api/orders/1

# 6. Limpar carrinho
curl -X DELETE http://localhost:8087/api/cart/1
```

## PowerShell (Windows)

```powershell
# Listar pneus
Invoke-RestMethod -Uri "http://localhost:8085/api/tires" | ConvertTo-Json

# Ver carrinho
Invoke-RestMethod -Uri "http://localhost:8087/api/cart/1" | ConvertTo-Json

# Adicionar ao carrinho
$body = @{
    tireId = 1
    tireBrand = "Michelin"
    tireModel = "Primacy 4"
    tireSize = "205/55R16"
    price = 450.00
    quantity = 4
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8087/api/cart/1/items" -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json
```

## Parar Serviços

### Docker
```bash
docker compose down
```

### Manual
Pressione `Ctrl+C` em cada terminal onde os serviços estão rodando.
