# Exemplos de Requisições API

## Product Service - Pneus

### Listar todos os pneus
```bash
curl http://localhost:8085/api/tires
```

### Buscar pneu por ID
```bash
curl http://localhost:8085/api/tires/1
```

### Buscar pneus por marca
```bash
curl http://localhost:8085/api/tires/brand/Michelin
```

### Buscar pneus por dimensões
```bash
curl "http://localhost:8085/api/tires/search?width=205&profile=55&diameter=16"
```

### Criar novo pneu
```bash
curl -X POST http://localhost:8085/api/tires \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "Dunlop",
    "model": "Sport Maxx",
    "size": "225/45R17",
    "width": 225,
    "profile": 45,
    "diameter": 17,
    "loadIndex": "94",
    "speedRating": "W",
    "season": "SUMMER",
    "price": 580.00,
    "stock": 30,
    "description": "Pneu esportivo de alto desempenho",
    "imageUrl": "https://example.com/dunlop.jpg"
  }'
```

### Atualizar estoque
```bash
curl -X PATCH "http://localhost:8085/api/tires/1/stock?quantity=10"
```

## Cart Service - Carrinho

### Obter carrinho do usuário
```bash
curl http://localhost:8087/api/cart/1
```

### Adicionar item ao carrinho
```bash
curl -X POST http://localhost:8087/api/cart/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "tireId": 1,
    "tireBrand": "Michelin",
    "tireModel": "Primacy 4",
    "tireSize": "205/55R16",
    "price": 450.00,
    "quantity": 4
  }'
```

### Atualizar quantidade de item
```bash
curl -X PUT "http://localhost:8087/api/cart/1/items/1?quantity=2"
```

### Remover item do carrinho
```bash
curl -X DELETE http://localhost:8087/api/cart/1/items/1
```

### Limpar carrinho
```bash
curl -X DELETE http://localhost:8087/api/cart/1
```

## Order Service - Pedidos

### Listar todos os pedidos
```bash
curl http://localhost:8086/api/orders
```

### Buscar pedidos do usuário
```bash
curl http://localhost:8086/api/orders/user/1
```

### Criar novo pedido
```bash
curl -X POST http://localhost:8086/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [
      {
        "tireId": 1,
        "tireBrand": "Michelin",
        "tireModel": "Primacy 4",
        "tireSize": "205/55R16",
        "price": 450.00,
        "quantity": 4
      }
    ],
    "deliveryAddress": "Rua Exemplo, 123",
    "deliveryCity": "São Paulo",
    "deliveryState": "SP",
    "deliveryZipCode": "01234-567"
  }'
```

### Atualizar status do pedido
```bash
curl -X PATCH "http://localhost:8086/api/orders/1/status?status=CONFIRMED"
```

### Cancelar pedido
```bash
curl -X DELETE http://localhost:8086/api/orders/1
```

## Fluxo Completo de Compra

### 1. Listar pneus disponíveis
```bash
curl http://localhost:8085/api/tires
```

### 2. Adicionar pneus ao carrinho
```bash
curl -X POST http://localhost:8087/api/cart/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "tireId": 1,
    "tireBrand": "Michelin",
    "tireModel": "Primacy 4",
    "tireSize": "205/55R16",
    "price": 450.00,
    "quantity": 4
  }'
```

### 3. Ver carrinho
```bash
curl http://localhost:8087/api/cart/1
```

### 4. Criar pedido
```bash
curl -X POST http://localhost:8086/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [
      {
        "tireId": 1,
        "tireBrand": "Michelin",
        "tireModel": "Primacy 4",
        "tireSize": "205/55R16",
        "price": 450.00,
        "quantity": 4
      }
    ],
    "deliveryAddress": "Rua Exemplo, 123",
    "deliveryCity": "São Paulo",
    "deliveryState": "SP",
    "deliveryZipCode": "01234-567"
  }'
```

### 5. Limpar carrinho após pedido
```bash
curl -X DELETE http://localhost:8087/api/cart/1
```

### 6. Acompanhar pedido
```bash
curl http://localhost:8086/api/orders/1
```
