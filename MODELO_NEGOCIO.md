# Modelo de Negócio - E-commerce de Pneus

## 🎯 Visão Geral

Este sistema foi desenvolvido para gerenciar um e-commerce especializado em pneus, permitindo que clientes busquem, comparem e comprem pneus de diferentes marcas e especificações técnicas.

## 👥 Personas

### Cliente Final
- Busca pneus para seu veículo
- Compara preços e especificações
- Adiciona ao carrinho e finaliza compra
- Acompanha status do pedido

### Administrador
- Gerencia catálogo de pneus
- Controla estoque
- Processa pedidos
- Atualiza status de entrega

## 🔄 Jornada do Cliente

### 1. Descoberta
**Objetivo:** Encontrar o pneu ideal

**Ações:**
- Acessa o site/app
- Busca por marca (ex: Michelin, Pirelli)
- Busca por tamanho (ex: 205/55R16)
- Busca por dimensões específicas
- Filtra por temporada (verão, inverno, all-season)

**Endpoints:**
```
GET /api/tires
GET /api/tires/brand/Michelin
GET /api/tires/size/205/55R16
GET /api/tires/search?width=205&profile=55&diameter=16
GET /api/tires/season/ALL_SEASON
```

### 2. Comparação
**Objetivo:** Avaliar opções

**Informações disponíveis:**
- Marca e modelo
- Especificações técnicas (largura, perfil, diâmetro)
- Índice de carga e velocidade
- Temporada recomendada
- Preço
- Disponibilidade em estoque
- Descrição e imagem

**Endpoint:**
```
GET /api/tires/{id}
```

### 3. Seleção
**Objetivo:** Adicionar ao carrinho

**Ações:**
- Seleciona quantidade (geralmente 2 ou 4 pneus)
- Adiciona ao carrinho
- Continua comprando ou finaliza

**Endpoints:**
```
POST /api/cart/{userId}/items
GET /api/cart/{userId}
```

### 4. Revisão
**Objetivo:** Confirmar itens

**Ações:**
- Revisa itens no carrinho
- Ajusta quantidades se necessário
- Remove itens indesejados
- Vê total calculado

**Endpoints:**
```
GET /api/cart/{userId}
PUT /api/cart/{userId}/items/{itemId}?quantity=2
DELETE /api/cart/{userId}/items/{itemId}
```

### 5. Checkout
**Objetivo:** Finalizar compra

**Ações:**
- Informa endereço de entrega
- Confirma pedido
- Recebe número do pedido

**Endpoint:**
```
POST /api/orders
```

### 6. Acompanhamento
**Objetivo:** Monitorar entrega

**Ações:**
- Consulta status do pedido
- Recebe atualizações

**Status possíveis:**
- PENDING - Pedido recebido
- CONFIRMED - Pagamento confirmado
- PROCESSING - Separando produtos
- SHIPPED - Em transporte
- DELIVERED - Entregue
- CANCELLED - Cancelado

**Endpoints:**
```
GET /api/orders/{id}
GET /api/orders/user/{userId}
```

## 🏪 Operações do Administrador

### Gestão de Catálogo

**Adicionar novo pneu:**
```
POST /api/tires
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

**Atualizar pneu:**
```
PUT /api/tires/{id}
```

**Desativar pneu:**
```
DELETE /api/tires/{id}
```

### Gestão de Estoque

**Atualizar estoque:**
```
PATCH /api/tires/{id}/stock?quantity=10
```

**Consultar estoque:**
```
GET /api/tires/{id}
```

### Gestão de Pedidos

**Listar todos os pedidos:**
```
GET /api/orders
```

**Filtrar por status:**
```
GET /api/orders/status/PENDING
```

**Atualizar status:**
```
PATCH /api/orders/{id}/status?status=CONFIRMED
```

**Cancelar pedido:**
```
DELETE /api/orders/{id}
```

## 💰 Modelo de Precificação

### Fatores que influenciam o preço:
1. **Marca** - Marcas premium (Michelin, Pirelli) vs econômicas
2. **Tamanho** - Pneus maiores são mais caros
3. **Temporada** - Pneus de inverno tendem a ser mais caros
4. **Performance** - Índices de velocidade mais altos custam mais
5. **Tecnologia** - Recursos especiais (run-flat, baixa resistência)

### Exemplos de preços (no sistema):
- Yokohama BluEarth 185/65R15: R$ 320,00
- Continental WinterContact 195/65R15: R$ 380,00
- Michelin Primacy 4 205/55R16: R$ 450,00
- Bridgestone Turanza 215/60R16: R$ 490,00
- Pirelli P7 225/45R17: R$ 520,00
- Pirelli Scorpion 235/55R18: R$ 620,00
- Goodyear Eagle F1 245/40R18: R$ 680,00
- Michelin Pilot Sport 255/35R19: R$ 850,00

## 📊 Métricas de Negócio

### KPIs Importantes

1. **Taxa de Conversão**
   - Visitantes → Carrinhos criados
   - Carrinhos → Pedidos finalizados

2. **Ticket Médio**
   - Valor médio por pedido
   - Quantidade média de pneus por pedido

3. **Produtos Mais Vendidos**
   - Marcas mais populares
   - Tamanhos mais procurados
   - Temporadas preferidas

4. **Gestão de Estoque**
   - Taxa de ruptura
   - Giro de estoque
   - Produtos parados

5. **Satisfação do Cliente**
   - Taxa de cancelamento
   - Tempo de entrega
   - Pedidos repetidos

### Queries Úteis

**Pedidos por status:**
```
GET /api/orders/status/CONFIRMED
```

**Pedidos de um cliente:**
```
GET /api/orders/user/{userId}
```

**Pneus mais vendidos (implementar):**
```sql
SELECT tire_brand, tire_model, SUM(quantity) as total
FROM order_items
GROUP BY tire_brand, tire_model
ORDER BY total DESC
LIMIT 10
```

**Ticket médio (implementar):**
```sql
SELECT AVG(total_price) as ticket_medio
FROM orders
WHERE status = 'DELIVERED'
```

## 🎁 Oportunidades de Expansão

### Funcionalidades Futuras

1. **Recomendações Inteligentes**
   - Sugerir pneus baseado no veículo
   - "Clientes que compraram X também compraram Y"

2. **Programa de Fidelidade**
   - Pontos por compra
   - Descontos progressivos

3. **Serviços Adicionais**
   - Instalação de pneus
   - Alinhamento e balanceamento
   - Garantia estendida

4. **Comparador de Preços**
   - Comparar com concorrentes
   - Alertas de preço

5. **Avaliações e Reviews**
   - Clientes avaliam produtos
   - Fotos de instalação

6. **Busca por Veículo**
   - Selecionar marca/modelo/ano
   - Sistema sugere pneus compatíveis

7. **Notificações**
   - Email/SMS de confirmação
   - Atualizações de status
   - Promoções personalizadas

8. **Pagamentos**
   - Integração com gateways
   - Parcelamento
   - Múltiplas formas de pagamento

9. **Logística**
   - Rastreamento em tempo real
   - Integração com transportadoras
   - Cálculo de frete

10. **Analytics**
    - Dashboard administrativo
    - Relatórios de vendas
    - Análise de comportamento

## 🔐 Segurança e Compliance

### Dados Sensíveis
- Informações de pagamento (PCI-DSS)
- Dados pessoais (LGPD)
- Endereços de entrega

### Autenticação
- JWT tokens
- Roles (CUSTOMER, ADMIN)
- Refresh tokens

### Auditoria
- Log de todas as operações
- Histórico de alterações
- Rastreabilidade de pedidos

## 📈 Escalabilidade

### Arquitetura Atual
- Microserviços independentes
- Service Discovery (Eureka)
- API Gateway
- Banco de dados por serviço

### Próximos Passos
- Cache distribuído (Redis)
- Message broker (RabbitMQ já configurado)
- CDN para imagens
- Load balancer
- Auto-scaling

## 💡 Diferenciais Competitivos

1. **Busca Técnica Avançada**
   - Filtros por dimensões exatas
   - Busca por especificações técnicas

2. **Transparência**
   - Informações técnicas completas
   - Disponibilidade em tempo real

3. **Experiência do Usuário**
   - Interface intuitiva
   - Processo de compra simplificado

4. **Confiabilidade**
   - Sistema robusto
   - Alta disponibilidade
   - Rastreamento completo

## 🎯 Conclusão

Este sistema fornece uma base sólida para um e-commerce de pneus, com:
- ✅ Catálogo completo e pesquisável
- ✅ Carrinho de compras funcional
- ✅ Sistema de pedidos robusto
- ✅ Arquitetura escalável
- ✅ Pronto para expansão

O modelo de negócio está validado e pronto para implementação de funcionalidades adicionais conforme a demanda do mercado.
