# Estrutura do Projeto - E-commerce de Pneus

## Serviços Implementados

### 1. Product Service (Porta 8085)
Gerenciamento de pneus com funcionalidades completas:

**Entidades:**
- `Tire` - Pneu com todas as especificações técnicas

**Funcionalidades:**
- CRUD completo de pneus
- Busca por marca, tamanho, dimensões e temporada
- Controle de estoque
- Soft delete (desativação)
- 8 pneus de exemplo pré-cadastrados

**Tecnologias:**
- Spring Data JPA
- H2 Database
- Lombok
- Eureka Client

### 2. Cart Service (Porta 8087)
Gerenciamento de carrinho de compras:

**Entidades:**
- `Cart` - Carrinho do usuário
- `CartItem` - Item do carrinho

**Funcionalidades:**
- Carrinho por usuário
- Adicionar/remover itens
- Atualizar quantidades
- Cálculo automático do total
- Limpar carrinho

**Tecnologias:**
- Spring Data JPA
- H2 Database
- Lombok
- Eureka Client

### 3. Order Service (Porta 8086)
Gerenciamento de pedidos:

**Entidades:**
- `Order` - Pedido
- `OrderItem` - Item do pedido
- `OrderStatus` - Status do pedido (enum)

**Funcionalidades:**
- Criar pedidos
- Listar pedidos por usuário
- Filtrar por status
- Atualizar status do pedido
- Cancelar pedidos
- Controle de endereço de entrega

**Status disponíveis:**
- PENDING
- CONFIRMED
- PROCESSING
- SHIPPED
- DELIVERED
- CANCELLED

**Tecnologias:**
- Spring Data JPA
- H2 Database
- Lombok
- Eureka Client

### 4. Gateway Service (Porta 8083)
API Gateway com autenticação JWT:

**Funcionalidades:**
- Roteamento de requisições
- Filtro de autenticação JWT
- Controle de acesso por roles
- Integração com Eureka

**Tecnologias:**
- Spring Cloud Gateway
- JWT (java-jwt)
- Eureka Client

### 5. Auth Service (Porta 8084)
Serviço de autenticação (já implementado):

**Funcionalidades:**
- Registro de usuários
- Login com senha
- Magic link
- Geração de tokens JWT
- Publicação de eventos no RabbitMQ

**Tecnologias:**
- Spring Security
- JWT
- RabbitMQ
- H2 Database

### 6. Service Discovery (Porta 8080)
Eureka Server para descoberta de serviços

## Estrutura de Pacotes

### Product Service
```
com.example.productservice
├── config
│   └── DataInitializer.java
├── controller
│   └── TireController.java
├── dto
│   └── TireRequest.java
├── model
│   └── Tire.java
├── repository
│   └── TireRepository.java
└── service
    └── TireService.java
```

### Cart Service
```
com.example.cart_service
├── controller
│   └── CartController.java
├── dto
│   └── AddToCartRequest.java
├── model
│   ├── Cart.java
│   └── CartItem.java
├── repository
│   ├── CartRepository.java
│   └── CartItemRepository.java
└── service
    └── CartService.java
```

### Order Service
```
com.example.order_service
├── controller
│   └── OrderController.java
├── dto
│   ├── CreateOrderRequest.java
│   └── OrderItemRequest.java
├── model
│   ├── Order.java
│   ├── OrderItem.java
│   └── OrderStatus.java
├── repository
│   └── OrderRepository.java
└── service
    └── OrderService.java
```

## Banco de Dados

Cada serviço usa H2 Database em memória:
- **productdb** - Product Service
- **cartdb** - Cart Service
- **orderdb** - Order Service

Console H2 habilitado em todos os serviços.

## Comunicação

- **Síncrona**: REST APIs entre serviços
- **Assíncrona**: RabbitMQ para eventos (Auth Service)
- **Service Discovery**: Eureka para registro e descoberta

## Docker Compose

Todos os serviços estão configurados no `docker-compose.yml`:
- Rede compartilhada: `app-network`
- Volumes para hot reload
- Dependências configuradas
- RabbitMQ com management console

## Próximos Passos Sugeridos

1. Implementar integração entre Cart e Product Service para validar estoque
2. Adicionar webhook para atualizar estoque após criação de pedido
3. Implementar notificações via RabbitMQ
4. Adicionar validações de negócio
5. Implementar testes unitários e de integração
6. Adicionar documentação Swagger/OpenAPI
7. Implementar circuit breaker (Resilience4j)
8. Adicionar logs centralizados
9. Implementar métricas e monitoring
