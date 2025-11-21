# Script para testar os endpoints do e-commerce de pneus

Write-Host "=== Testando Endpoints do E-commerce de Pneus ===" -ForegroundColor Green
Write-Host ""

# Função para fazer requisição e exibir resultado
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [string]$Body = $null
    )
    
    Write-Host "Testando: $Name" -ForegroundColor Cyan
    Write-Host "URL: $Url" -ForegroundColor Gray
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri $Url -Method Get -ErrorAction Stop
        } else {
            $headers = @{
                "Content-Type" = "application/json"
            }
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Body $Body -Headers $headers -ErrorAction Stop
        }
        
        Write-Host "✓ Sucesso!" -ForegroundColor Green
        Write-Host "Resposta:" -ForegroundColor Yellow
        $response | ConvertTo-Json -Depth 3 | Write-Host
    } catch {
        Write-Host "✗ Erro: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "---" -ForegroundColor Gray
    Write-Host ""
}

# Aguardar um pouco para garantir que os serviços estão prontos
Write-Host "Aguardando serviços iniciarem..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# 1. Testar Product Service
Write-Host "=== PRODUCT SERVICE ===" -ForegroundColor Magenta
Test-Endpoint -Name "Listar todos os pneus" -Url "http://localhost:8085/api/tires"
Test-Endpoint -Name "Buscar pneu por ID" -Url "http://localhost:8085/api/tires/1"
Test-Endpoint -Name "Buscar pneus Michelin" -Url "http://localhost:8085/api/tires/brand/Michelin"

# 2. Testar Cart Service
Write-Host "=== CART SERVICE ===" -ForegroundColor Magenta
Test-Endpoint -Name "Obter carrinho do usuário 1" -Url "http://localhost:8087/api/cart/1"

# Adicionar item ao carrinho
$cartItem = @{
    tireId = 1
    tireBrand = "Michelin"
    tireModel = "Primacy 4"
    tireSize = "205/55R16"
    price = 450.00
    quantity = 4
} | ConvertTo-Json

Test-Endpoint -Name "Adicionar item ao carrinho" -Url "http://localhost:8087/api/cart/1/items" -Method "POST" -Body $cartItem

Test-Endpoint -Name "Ver carrinho atualizado" -Url "http://localhost:8087/api/cart/1"

# 3. Testar Order Service
Write-Host "=== ORDER SERVICE ===" -ForegroundColor Magenta
Test-Endpoint -Name "Listar todos os pedidos" -Url "http://localhost:8086/api/orders"

# Criar pedido
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

Test-Endpoint -Name "Criar novo pedido" -Url "http://localhost:8086/api/orders" -Method "POST" -Body $order

Test-Endpoint -Name "Listar pedidos após criação" -Url "http://localhost:8086/api/orders"

Write-Host "=== Testes Concluídos ===" -ForegroundColor Green
Write-Host ""
Write-Host "Para mais exemplos, consulte o arquivo API_EXAMPLES.md" -ForegroundColor Cyan
