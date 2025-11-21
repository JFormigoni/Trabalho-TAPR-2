# Como Executar o Projeto

## Opção 1: Com Docker (Recomendado)

Se você tiver o Docker Desktop instalado:

```bash
docker compose up --build
```

Isso iniciará todos os serviços automaticamente, incluindo RabbitMQ.

## Opção 2: Sem Docker (Manualmente)

### Método Automático (PowerShell)

Execute o script que inicia todos os serviços automaticamente:

```powershell
.\start-services.ps1
```

Este script abrirá uma janela separada para cada serviço.

### Método Manual

Abra 6 terminais diferentes e execute em cada um:

**Terminal 1 - Service Discovery (Eureka)**
```bash
cd service-discovery
.\mvnw.cmd spring-boot:run
```
Aguarde até ver: "Started Eureka Server"

**Terminal 2 - Auth Service**
```bash
cd auth-service
.\mvnw.cmd spring-boot:run
```

**Terminal 3 - Gateway Service**
```bash
cd gateway-service
.\mvnw.cmd spring-boot:run
```

**Terminal 4 - Product Service**
```bash
cd product-service
.\mvnw.cmd spring-boot:run
```

**Terminal 5 - Cart Service**
```bash
cd cart-service
.\mvnw.cmd spring-boot:run
```

**Terminal 6 - Order Service**
```bash
cd order-service
.\mvnw.cmd spring-boot:run
```

## Verificar se está funcionando

### 1. Eureka Dashboard
Acesse: http://localhost:8080

Você deve ver todos os serviços registrados.

### 2. Testar Endpoints

Execute o script de testes:
```powershell
.\test-endpoints.ps1
```

Ou teste manualmente:

**Listar pneus:**
```bash
curl http://localhost:8085/api/tires
```

**Ver carrinho:**
```bash
curl http://localhost:8087/api/cart/1
```

**Listar pedidos:**
```bash
curl http://localhost:8086/api/orders
```

## Portas dos Serviços

| Serviço | Porta | URL |
|---------|-------|-----|
| Service Discovery (Eureka) | 8080 | http://localhost:8080 |
| Gateway | 8083 | http://localhost:8083 |
| Auth Service | 8084 | http://localhost:8084 |
| Product Service | 8085 | http://localhost:8085/api/tires |
| Order Service | 8086 | http://localhost:8086/api/orders |
| Cart Service | 8087 | http://localhost:8087/api/cart/{userId} |

## Dados de Exemplo

O Product Service já vem com 8 pneus cadastrados:
- Michelin Primacy 4
- Pirelli P7 Cinturato
- Goodyear Eagle F1
- Continental WinterContact
- Bridgestone Turanza T005
- Yokohama BluEarth
- Michelin Pilot Sport 4
- Pirelli Scorpion Verde

## Próximos Passos

1. Acesse o Eureka Dashboard para ver todos os serviços
2. Teste os endpoints usando o arquivo `API_EXAMPLES.md`
3. Use o Postman ou Insomnia para testar as APIs
4. Consulte `ESTRUTURA_PROJETO.md` para entender a arquitetura

## Troubleshooting

**Erro: "Address already in use"**
- Algum serviço já está rodando na porta
- Pare o serviço anterior ou mude a porta no application.properties

**Serviços não aparecem no Eureka**
- Aguarde 30-60 segundos após iniciar cada serviço
- Verifique se o Service Discovery está rodando primeiro

**Erro de compilação**
- Execute: `.\mvnw.cmd clean install -DskipTests` em cada serviço
