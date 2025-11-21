# ⚡ Início Rápido - 5 Minutos

## 🎯 Objetivo

Colocar o sistema funcionando em 5 minutos.

## 📋 Pré-requisitos

- Java 17 instalado
- Nada mais! (Maven está incluído via wrapper)

## 🚀 Passo a Passo

### 1️⃣ Iniciar Serviços (1 minuto)

Abra o PowerShell no diretório do projeto e execute:

```powershell
.\start-services.ps1
```

Isso abrirá 6 janelas, uma para cada serviço.

**Aguarde 2-3 minutos** para todos os serviços iniciarem.

### 2️⃣ Verificar Eureka (30 segundos)

Abra o navegador em:
```
http://localhost:8080
```

Você deve ver todos os serviços registrados:
- AUTH-SERVICE
- GATEWAY-SERVICE
- PRODUCT-SERVICE
- CART-SERVICE
- ORDER-SERVICE

### 3️⃣ Testar Endpoints (2 minutos)

Em outro PowerShell, execute:

```powershell
.\test-endpoints.ps1
```

Ou teste manualmente:

**Ver pneus disponíveis:**
```bash
curl http://localhost:8085/api/tires
```

**Ver carrinho:**
```bash
curl http://localhost:8087/api/cart/1
```

**Ver pedidos:**
```bash
curl http://localhost:8086/api/orders
```

### 4️⃣ Testar Fluxo Completo (1 minuto)

**PowerShell:**
```powershell
# 1. Listar pneus
Invoke-RestMethod -Uri "http://localhost:8085/api/tires" | ConvertTo-Json

# 2. Adicionar ao carrinho
$item = @{
    tireId = 1
    tireBrand = "Michelin"
    tireModel = "Primacy 4"
    tireSize = "205/55R16"
    price = 450.00
    quantity = 4
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8087/api/cart/1/items" -Method Post -Body $item -ContentType "application/json" | ConvertTo-Json

# 3. Ver carrinho
Invoke-RestMethod -Uri "http://localhost:8087/api/cart/1" | ConvertTo-Json

# 4. Criar pedido
$order = @{
    userId = 1
    items = @(
        @{
            tireId = 1
            tireBrand = "Michelin"
            tireModel = "Primacy 4"
            tireSize = "205/55R16"
            price = 450.00
            quantity = 4
        }
    )
    deliveryAddress = "Rua Exemplo, 123"
    deliveryCity = "São Paulo"
    deliveryState = "SP"
    deliveryZipCode = "01234-567"
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Uri "http://localhost:8086/api/orders" -Method Post -Body $order -ContentType "application/json" | ConvertTo-Json
```

## ✅ Pronto!

Seu sistema está funcionando! 🎉

## 📚 Próximos Passos

- **Explorar APIs:** Ver [API_EXAMPLES.md](API_EXAMPLES.md)
- **Entender arquitetura:** Ver [ESTRUTURA_PROJETO.md](ESTRUTURA_PROJETO.md)
- **Ver todos os comandos:** Ver [COMANDOS_RAPIDOS.md](COMANDOS_RAPIDOS.md)
- **Documentação completa:** Ver [INDICE.md](INDICE.md)

## 🐛 Problemas?

### Porta já em uso
```
Erro: Address already in use
```
**Solução:** Algum serviço já está rodando. Feche e tente novamente.

### Serviço não inicia
```
Erro: Could not find or load main class
```
**Solução:** Compile o serviço:
```bash
cd [nome-do-servico]
.\mvnw.cmd clean install -DskipTests
```

### Não aparece no Eureka
**Solução:** Aguarde 30-60 segundos. Os serviços levam um tempo para se registrar.

## 🎯 URLs Importantes

| Serviço | URL |
|---------|-----|
| Eureka Dashboard | http://localhost:8080 |
| Product Service | http://localhost:8085/api/tires |
| Cart Service | http://localhost:8087/api/cart/1 |
| Order Service | http://localhost:8086/api/orders |

## 💡 Dicas

1. **Use o Eureka Dashboard** para ver o status de todos os serviços
2. **Mantenha as janelas abertas** para ver os logs em tempo real
3. **Use Postman ou Insomnia** para testar as APIs de forma mais visual
4. **Consulte os logs** se algo não funcionar

## 🎓 Aprender Mais

- **Apresentação:** [APRESENTACAO.md](APRESENTACAO.md)
- **Modelo de Negócio:** [MODELO_NEGOCIO.md](MODELO_NEGOCIO.md)
- **Checklist:** [CHECKLIST_VERIFICACAO.md](CHECKLIST_VERIFICACAO.md)

---

**Tempo total:** ~5 minutos  
**Dificuldade:** Fácil  
**Status:** ✅ Pronto para usar
