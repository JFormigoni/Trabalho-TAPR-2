# E-commerce de Pneus - Microserviços

Sistema de e-commerce de pneus desenvolvido com arquitetura de microserviços usando Spring Boot e Spring Cloud.

> ⚡ **[Início Rápido - 5 Minutos](INICIO_RAPIDO.md)** | 📚 **[Índice Completo](INDICE.md)** | 🎯 **[Apresentação](APRESENTACAO.md)**

## Arquitetura

- **Service Discovery (Eureka)**: Porta 8080
- **Gateway Service**: Porta 8083
- **Auth Service**: Porta 8084
- **Product Service (Pneus)**: Porta 8085
- **Order Service**: Porta 8086
- **Cart Service**: Porta 8087
- **RabbitMQ**: Portas 5672 (AMQP) e 15672 (Management)

## Executar o Projeto

```bash
docker-compose up --build
```

## Endpoints

### Product Service - Pneus

**Base URL**: `http://localhost:8085/api/tires`

- `GET /api/tires` - Listar todos os pneus
- `GET /api/tires/{id}` - Buscar pneu por ID
- `GET /api/tires/brand/{brand}` - Buscar pneus por marca
- `GET /api/tires/size/{size}` - Buscar pneus por tamanho (ex: 205/55R16)
- `GET /api/tires/search?width={width}&profile={profile}&diameter={diameter}` - Buscar por dimensões
- `GET /api/tires/season/{season}` - Buscar por temporada (ALL_SEASON, SUMMER, WINTER)
- `POST /api/tires` - Criar novo pneu
- `PUT /api/tires/{id}` - Atualizar pneu
- `DELETE /api/tires/{id}` - Deletar pneu (soft delete)
- `PATCH /api/tires/{id}/stock?quantity={quantity}` - Atualizar estoque

**Exemplo de Pneu**:
```json
{
  "brand": "Michelin",
  "model": "Primacy 4",
  "size": "205/55R16",
  "width": 205,
  "profile": 55,
  "diameter": 16,
  "loadIndex": "91",
  "speedRating": "V",
  "season": "ALL_SEASON",
  "price": 450.00,
  "stock": 50,
  "description": "Pneu de alta performance",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Cart Service - Carrinho

**Base URL**: `http://localhost:8087/api/cart`

- `GET /api/cart/{userId}` - Obter carrinho do usuário
- `POST /api/cart/{userId}/items` - Adicionar item ao carrinho
- `PUT /api/cart/{userId}/items/{itemId}?quantity={quantity}` - Atualizar quantidade
- `DELETE /api/cart/{userId}/items/{itemId}` - Remover item
- `DELETE /api/cart/{userId}` - Limpar carrinho

**Exemplo de Item do Carrinho**:
```json
{
  "tireId": 1,
  "tireBrand": "Michelin",
  "tireModel": "Primacy 4",
  "tireSize": "205/55R16",
  "price": 450.00,
  "quantity": 4
}
```

### Order Service - Pedidos

**Base URL**: `http://localhost:8086/api/orders`

- `GET /api/orders` - Listar todos os pedidos
- `GET /api/orders/{id}` - Buscar pedido por ID
- `GET /api/orders/user/{userId}` - Buscar pedidos do usuário
- `GET /api/orders/status/{status}` - Buscar pedidos por status
- `POST /api/orders` - Criar novo pedido
- `PATCH /api/orders/{id}/status?status={status}` - Atualizar status
- `DELETE /api/orders/{id}` - Cancelar pedido

**Status do Pedido**: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED

**Exemplo de Pedido**:
```json
{
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
}
```

### Auth Service

**Base URL**: `http://localhost:8084`

Endpoints de autenticação e gerenciamento de usuários (já implementados).

## Tecnologias

- Java 17
- Spring Boot 3.5.x
- Spring Cloud 2025.0.0
- Spring Data JPA
- H2 Database (em memória)
- Lombok
- Netflix Eureka
- Spring Cloud Gateway
- RabbitMQ
- Docker & Docker Compose

## Dados de Exemplo

O Product Service é inicializado com 8 pneus de exemplo de diferentes marcas (Michelin, Pirelli, Goodyear, Continental, Bridgestone, Yokohama).

## 📚 Documentação Completa

- **[COMO_EXECUTAR.md](COMO_EXECUTAR.md)** - Guia completo de como executar o projeto
- **[COMANDOS_RAPIDOS.md](COMANDOS_RAPIDOS.md)** - Comandos úteis para testar rapidamente
- **[API_EXAMPLES.md](API_EXAMPLES.md)** - Exemplos detalhados de requisições
- **[ESTRUTURA_PROJETO.md](ESTRUTURA_PROJETO.md)** - Arquitetura e estrutura dos serviços
- **[RESUMO_IMPLEMENTACAO.md](RESUMO_IMPLEMENTACAO.md)** - Resumo completo do que foi implementado
- **[TESTE_LOCAL.md](TESTE_LOCAL.md)** - Como testar sem Docker

## 🚀 Início Rápido

### Com Docker:
```bash
docker compose up --build
```

### Sem Docker:
```powershell
.\start-services.ps1
```

### Testar:
```powershell
.\test-endpoints.ps1
```

Ou acesse: http://localhost:8080 (Eureka Dashboard)
