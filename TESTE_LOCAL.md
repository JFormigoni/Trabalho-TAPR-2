# Guia de Teste Local (Sem Docker)

Como o Docker não está disponível no momento, você pode testar os serviços localmente seguindo estes passos:

## Pré-requisitos
- Java 17 instalado
- Maven (ou usar os wrappers mvnw incluídos)

## Ordem de Inicialização

### 1. Service Discovery (Eureka) - Porta 8080
```bash
cd service-discovery
.\mvnw.cmd spring-boot:run
```

Aguarde até ver a mensagem: "Started Eureka Server"
Acesse: http://localhost:8080

### 2. Auth Service - Porta 8084
Em um novo terminal:
```bash
cd auth-service
.\mvnw.cmd spring-boot:run
```

### 3. Gateway Service - Porta 8083
Em um novo terminal:
```bash
cd gateway-service
.\mvnw.cmd spring-boot:run
```

### 4. Product Service - Porta 8085
Em um novo terminal:
```bash
cd product-service
.\mvnw.cmd spring-boot:run
```

### 5. Cart Service - Porta 8087
Em um novo terminal:
```bash
cd cart-service
.\mvnw.cmd spring-boot:run
```

### 6. Order Service - Porta 8086
Em um novo terminal:
```bash
cd order-service
.\mvnw.cmd spring-boot:run
```

## Verificação

Após iniciar todos os serviços, verifique:

1. **Eureka Dashboard**: http://localhost:8080
   - Deve mostrar todos os serviços registrados

2. **Teste Product Service**:
```bash
curl http://localhost:8085/api/tires
```

3. **Teste Cart Service**:
```bash
curl http://localhost:8087/api/cart/1
```

4. **Teste Order Service**:
```bash
curl http://localhost:8086/api/orders
```

## Observações

- Cada serviço precisa estar rodando em um terminal separado
- Aguarde alguns segundos entre a inicialização de cada serviço
- O Service Discovery deve ser o primeiro a iniciar
- Os serviços usam banco H2 em memória, então os dados são perdidos ao reiniciar
- RabbitMQ não estará disponível sem Docker (apenas afeta eventos do Auth Service)

## Alternativa: Usar Docker Desktop

Se você tiver o Docker Desktop instalado:

1. Inicie o Docker Desktop
2. Abra um terminal no diretório raiz do projeto
3. Execute:
```bash
docker compose up --build
```

Isso iniciará todos os serviços automaticamente, incluindo RabbitMQ.

## Testar Endpoints

Consulte o arquivo `API_EXAMPLES.md` para exemplos de requisições para cada serviço.
