# E-Commerce de Pneus - Microserviços

Sistema de e-commerce para venda de pneus desenvolvido com arquitetura de microserviços.

## Membros da Equipe

- Rafael Feliz
- Lucas Arins
- Vinicius Aron
- João Eduardo Formigoni


## Aplicação

Site de e-commerce para venda de pneus com arquitetura de microserviços.

## Serviços Específicos

### Catálogo de Produtos
Serviço para gerenciar o cadastro de pneus (marcas, modelos, medidas, preços, estoque).

### Carrinho de Compras
Serviço para que os usuários possam adicionar e remover produtos antes de finalizar a compra.

### Gestão de Pedidos
Serviço para processar os pedidos, desde o pagamento até a entrega.

## Serviços Obrigatórios

### Autenticação
Para login de clientes e administradores.

### Service Discovery (Eureka)
Para que os microserviços se encontrem na rede.

### API Gateway
Para centralizar e proteger o acesso a todos os serviços.

## Tecnologias

- Java 17
- Spring Boot 3.5
- Spring Cloud (Eureka, Gateway)
- H2 Database
- Docker & Docker Compose

## Como Executar

### Com Docker Compose

**Local:**
```bash
docker-compose up --build
```

**No GitHub Codespaces:**
```bash
docker compose up --build
```

Aguarde 2-3 minutos para todos os serviços iniciarem.

### Sem Docker

Execute cada serviço em um terminal separado:

```bash
# Service Discovery
cd service-discovery
./mvnw spring-boot:run

# Gateway
cd gateway-service
./mvnw spring-boot:run

# Auth Service
cd auth-service
./mvnw spring-boot:run

# Product Service
cd product-service
./mvnw spring-boot:run

# Cart Service
cd cart-service
./mvnw spring-boot:run

# Order Service
cd order-service
./mvnw spring-boot:run
```

## Portas dos Serviços

- Service Discovery (Eureka): 8080
- Gateway: 8083
- Auth Service: 8084
- Product Service: 8085
- Order Service: 8086
- Cart Service: 8087

## Acessar

- Eureka Dashboard: http://localhost:8080
- API Gateway: http://localhost:8083
- Frontend: http://localhost:3000 (veja instruções abaixo)

## Como Usar o Frontend

### 1. Iniciar Servidor HTTP para o Frontend

O frontend precisa ser servido via HTTP (não pode abrir o arquivo diretamente por causa do CORS).

**Local - Com Python:**
```bash
cd frontend
python -m http.server 3000
```

**Local - Com Node.js:**
```bash
cd frontend
npx http-server -p 3000
```

**No Codespaces:**
```bash
cd frontend
python3 -m http.server 3000
```

### 2. Acessar o Frontend

**Local:** http://localhost:3000

**No Codespaces:** 
- O Codespaces abrirá automaticamente uma aba com a porta 3000
- Ou clique na aba "PORTS" e abra a porta 3000

### 3. Testar o Sistema

#### Registrar Usuário
1. Preencha os 3 campos:
   - Nome: teste
   - Email: teste@email.com
   - Senha: senha12345 (mínimo 8 caracteres)
2. Clique em "Registrar"

#### Fazer Login
1. Preencha apenas 2 campos:
   - Email: teste@email.com
   - Senha: senha12345
   - (deixe o campo Nome vazio)
2. Clique em "Entrar"

#### Usar o Sistema
- Veja os produtos listados
- Adicione produtos ao carrinho
- Veja o carrinho atualizado
- Clique em "Finalizar Pedido"
- Veja seus pedidos na lista

## Endpoints Principais

### Autenticação
- POST `/auth-service/users` - Registrar usuário
- POST `/auth-service/auth/login/password` - Login

### Produtos
- GET `/product-service/products` - Listar produtos
- GET `/product-service/products/{id}` - Buscar produto

### Carrinho
- GET `/cart-service/cart` - Ver carrinho
- POST `/cart-service/cart/items` - Adicionar item
- DELETE `/cart-service/cart/items/{id}` - Remover item

### Pedidos
- GET `/order-service/orders` - Listar pedidos
- POST `/order-service/orders` - Criar pedido

## Arquitetura

```
Frontend → Gateway → Serviços (Auth, Product, Cart, Order)
                  ↓
           Service Discovery (Eureka)
```

## Testando no GitHub Codespaces

### Passo 1: Iniciar Backend com Docker Compose
```bash
docker compose up --build
```

Aguarde 2-3 minutos. Você verá logs de todos os serviços.

### Passo 2: Abrir Novo Terminal
Clique no `+` no terminal para abrir um novo terminal.

### Passo 3: Iniciar Frontend
No novo terminal:
```bash
cd frontend
python3 -m http.server 3000
```

### Passo 4: Acessar as Portas
O Codespaces detectará automaticamente as portas. Clique na aba "PORTS" (ao lado de TERMINAL) e você verá:
- Porta 3000 (Frontend) - Clique no ícone de globo para abrir
- Porta 8080 (Eureka)
- Porta 8083 (Gateway)

### Passo 5: Usar o Frontend
Abra a porta 3000 e siga as instruções de teste abaixo.

## Troubleshooting

### Erro de CORS
Se aparecer erro de CORS no navegador:
- ✅ Use http://localhost:3000 (com servidor HTTP)
- ❌ NÃO abra index.html diretamente (file://)

### "Python não encontrado"
Instale Python: https://www.python.org/downloads/

Ou use Node.js: `npx http-server -p 3000`

### Serviços não iniciam
1. Verifique se as portas 8080-8087 estão livres
2. Aguarde 1-2 minutos após iniciar os serviços
3. Verifique o Eureka Dashboard (http://localhost:8080)

### Login não funciona
- Use o EMAIL para fazer login (não o nome)
- Senha deve ter 8+ caracteres
- Registre o usuário primeiro

## Observações

- Banco de dados H2 em memória (dados resetam ao reiniciar)
- JWT para autenticação (expira em 15 minutos)
- CORS configurado para desenvolvimento
- RabbitMQ publica eventos de criação de usuário
