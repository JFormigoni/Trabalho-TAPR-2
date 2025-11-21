# Checklist de Verificação

Use este checklist para verificar se tudo está funcionando corretamente.

## ✅ Compilação

- [ ] Product Service compila sem erros
  ```bash
  cd product-service
  .\mvnw.cmd clean compile -DskipTests
  ```

- [ ] Cart Service compila sem erros
  ```bash
  cd cart-service
  .\mvnw.cmd clean compile -DskipTests
  ```

- [ ] Order Service compila sem erros
  ```bash
  cd order-service
  .\mvnw.cmd clean compile -DskipTests
  ```

- [ ] Gateway Service compila sem erros
  ```bash
  cd gateway-service
  .\mvnw.cmd clean compile -DskipTests
  ```

- [ ] Auth Service compila sem erros
  ```bash
  cd auth-service
  .\mvnw.cmd clean compile -DskipTests
  ```

## ✅ Inicialização

- [ ] Service Discovery (Eureka) iniciou
  - URL: http://localhost:8080
  - Deve mostrar o dashboard do Eureka

- [ ] Auth Service iniciou
  - Porta: 8084
  - Deve aparecer no Eureka como "AUTH-SERVICE"

- [ ] Gateway Service iniciou
  - Porta: 8083
  - Deve aparecer no Eureka como "GATEWAY-SERVICE"

- [ ] Product Service iniciou
  - Porta: 8085
  - Deve aparecer no Eureka como "PRODUCT-SERVICE"

- [ ] Cart Service iniciou
  - Porta: 8087
  - Deve aparecer no Eureka como "CART-SERVICE"

- [ ] Order Service iniciou
  - Porta: 8086
  - Deve aparecer no Eureka como "ORDER-SERVICE"

## ✅ Product Service - Endpoints

- [ ] GET /api/tires - Lista todos os pneus
  ```bash
  curl http://localhost:8085/api/tires
  ```
  Deve retornar 8 pneus

- [ ] GET /api/tires/1 - Busca pneu por ID
  ```bash
  curl http://localhost:8085/api/tires/1
  ```
  Deve retornar o Michelin Primacy 4

- [ ] GET /api/tires/brand/Michelin - Busca por marca
  ```bash
  curl http://localhost:8085/api/tires/brand/Michelin
  ```
  Deve retornar 2 pneus Michelin

- [ ] GET /api/tires/search - Busca por dimensões
  ```bash
  curl "http://localhost:8085/api/tires/search?width=205&profile=55&diameter=16"
  ```
  Deve retornar pneus com essas dimensões

- [ ] POST /api/tires - Cria novo pneu
  ```bash
  curl -X POST http://localhost:8085/api/tires -H "Content-Type: application/json" -d "{\"brand\":\"Test\",\"model\":\"Test\",\"size\":\"205/55R16\",\"width\":205,\"profile\":55,\"diameter\":16,\"loadIndex\":\"91\",\"speedRating\":\"V\",\"season\":\"ALL_SEASON\",\"price\":400.00,\"stock\":10}"
  ```
  Deve criar e retornar o novo pneu

- [ ] PATCH /api/tires/1/stock - Atualiza estoque
  ```bash
  curl -X PATCH "http://localhost:8085/api/tires/1/stock?quantity=10"
  ```
  Deve atualizar o estoque

## ✅ Cart Service - Endpoints

- [ ] GET /api/cart/1 - Obtém carrinho vazio
  ```bash
  curl http://localhost:8087/api/cart/1
  ```
  Deve retornar carrinho vazio ou criar um novo

- [ ] POST /api/cart/1/items - Adiciona item
  ```bash
  curl -X POST http://localhost:8087/api/cart/1/items -H "Content-Type: application/json" -d "{\"tireId\":1,\"tireBrand\":\"Michelin\",\"tireModel\":\"Primacy 4\",\"tireSize\":\"205/55R16\",\"price\":450.00,\"quantity\":4}"
  ```
  Deve adicionar o item ao carrinho

- [ ] GET /api/cart/1 - Verifica item adicionado
  ```bash
  curl http://localhost:8087/api/cart/1
  ```
  Deve mostrar o carrinho com o item e total calculado

- [ ] PUT /api/cart/1/items/{itemId} - Atualiza quantidade
  ```bash
  curl -X PUT "http://localhost:8087/api/cart/1/items/1?quantity=2"
  ```
  Deve atualizar a quantidade

- [ ] DELETE /api/cart/1/items/{itemId} - Remove item
  ```bash
  curl -X DELETE http://localhost:8087/api/cart/1/items/1
  ```
  Deve remover o item

- [ ] DELETE /api/cart/1 - Limpa carrinho
  ```bash
  curl -X DELETE http://localhost:8087/api/cart/1
  ```
  Deve limpar todos os itens

## ✅ Order Service - Endpoints

- [ ] GET /api/orders - Lista pedidos vazios
  ```bash
  curl http://localhost:8086/api/orders
  ```
  Deve retornar lista vazia inicialmente

- [ ] POST /api/orders - Cria pedido
  ```bash
  curl -X POST http://localhost:8086/api/orders -H "Content-Type: application/json" -d "{\"userId\":1,\"items\":[{\"tireId\":1,\"tireBrand\":\"Michelin\",\"tireModel\":\"Primacy 4\",\"tireSize\":\"205/55R16\",\"price\":450.00,\"quantity\":4}],\"deliveryAddress\":\"Rua Exemplo, 123\",\"deliveryCity\":\"São Paulo\",\"deliveryState\":\"SP\",\"deliveryZipCode\":\"01234-567\"}"
  ```
  Deve criar e retornar o pedido com status PENDING

- [ ] GET /api/orders/1 - Busca pedido criado
  ```bash
  curl http://localhost:8086/api/orders/1
  ```
  Deve retornar o pedido com todos os detalhes

- [ ] GET /api/orders/user/1 - Lista pedidos do usuário
  ```bash
  curl http://localhost:8086/api/orders/user/1
  ```
  Deve retornar os pedidos do usuário 1

- [ ] PATCH /api/orders/1/status - Atualiza status
  ```bash
  curl -X PATCH "http://localhost:8086/api/orders/1/status?status=CONFIRMED"
  ```
  Deve atualizar o status para CONFIRMED

- [ ] GET /api/orders/status/CONFIRMED - Busca por status
  ```bash
  curl http://localhost:8086/api/orders/status/CONFIRMED
  ```
  Deve retornar pedidos confirmados

## ✅ Fluxo Completo

- [ ] 1. Listar pneus disponíveis
- [ ] 2. Adicionar pneu ao carrinho
- [ ] 3. Ver carrinho com total calculado
- [ ] 4. Criar pedido a partir do carrinho
- [ ] 5. Ver pedido criado
- [ ] 6. Atualizar status do pedido
- [ ] 7. Limpar carrinho

## ✅ Integração

- [ ] Todos os serviços aparecem no Eureka Dashboard
- [ ] Não há erros nos logs dos serviços
- [ ] Banco H2 está funcionando (dados persistem durante execução)
- [ ] Endpoints respondem em tempo adequado (< 2s)

## ✅ Documentação

- [ ] README.md está atualizado
- [ ] API_EXAMPLES.md tem exemplos funcionais
- [ ] ESTRUTURA_PROJETO.md descreve a arquitetura
- [ ] Scripts PowerShell funcionam

## 🐛 Troubleshooting

Se algum item falhar:

1. **Serviço não inicia:**
   - Verifique se a porta está livre
   - Verifique os logs de erro
   - Tente recompilar: `.\mvnw.cmd clean install -DskipTests`

2. **Serviço não aparece no Eureka:**
   - Aguarde 30-60 segundos
   - Verifique se o Eureka está rodando
   - Verifique a configuração em application.properties

3. **Endpoint retorna erro 404:**
   - Verifique se o serviço iniciou completamente
   - Verifique a URL e porta corretas
   - Verifique os logs do serviço

4. **Erro de compilação:**
   - Execute: `.\mvnw.cmd clean install -DskipTests`
   - Verifique se o Java 17 está instalado
   - Verifique se o JAVA_HOME está configurado

## ✅ Status Final

Após completar todos os itens acima, o projeto está:

- [ ] ✅ Totalmente funcional
- [ ] ✅ Pronto para demonstração
- [ ] ✅ Pronto para desenvolvimento adicional
