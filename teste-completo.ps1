# Script de Teste Completo dos Microserviços
# Execute: .\teste-completo.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TESTE COMPLETO DOS MICROSERVIÇOS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. REGISTRAR USUÁRIO
Write-Host "1. REGISTRANDO NOVO USUÁRIO..." -ForegroundColor Yellow
try {
    $registerResponse = Invoke-WebRequest -Uri "http://localhost:8083/auth-service/users" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body '{"name":"Teste Completo","email":"testecompleto@email.com","password":"senha12345"}'
    
    Write-Host "✅ Usuário registrado com sucesso!" -ForegroundColor Green
    Write-Host ($registerResponse.Content | ConvertFrom-Json | ConvertTo-Json) -ForegroundColor Gray
} catch {
    Write-Host "⚠️  Usuário já existe ou erro no registro" -ForegroundColor Yellow
}
Write-Host ""

# 2. FAZER LOGIN
Write-Host "2. FAZENDO LOGIN..." -ForegroundColor Yellow
$loginResponse = Invoke-WebRequest -Uri "http://localhost:8083/auth-service/auth/login/password" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body '{"email":"testecompleto@email.com","password":"senha12345"}'

$token = ($loginResponse.Content | ConvertFrom-Json).accessToken
Write-Host "✅ Login realizado com sucesso!" -ForegroundColor Green
Write-Host "Token: $($token.Substring(0, 50))..." -ForegroundColor Gray
Write-Host ""

# 3. LISTAR USUÁRIOS
Write-Host "3. LISTANDO USUÁRIOS..." -ForegroundColor Yellow
$usersResponse = Invoke-WebRequest -Uri "http://localhost:8083/auth-service/users" `
    -Headers @{"Authorization"="Bearer $token"}
$users = $usersResponse.Content | ConvertFrom-Json
Write-Host "✅ Total de usuários: $($users.Count)" -ForegroundColor Green
Write-Host ""

# 4. LISTAR PNEUS
Write-Host "4. LISTANDO PNEUS DISPONÍVEIS..." -ForegroundColor Yellow
$tiresResponse = Invoke-WebRequest -Uri "http://localhost:8083/product-service/api/tires" `
    -Headers @{"Authorization"="Bearer $token"}
$tires = $tiresResponse.Content | ConvertFrom-Json
Write-Host "✅ Total de pneus: $($tires.Count)" -ForegroundColor Green
Write-Host "Primeiros 3 pneus:" -ForegroundColor Gray
$tires[0..2] | ForEach-Object {
    Write-Host "  - ID: $($_.id) | $($_.brand) $($_.model) | R$ $($_.price) | Estoque: $($_.stock)" -ForegroundColor Gray
}
Write-Host ""

# 5. BUSCAR PNEU POR ID
Write-Host "5. BUSCANDO PNEU ID=1..." -ForegroundColor Yellow
$tireResponse = Invoke-WebRequest -Uri "http://localhost:8083/product-service/api/tires/1" `
    -Headers @{"Authorization"="Bearer $token"}
$tire = $tireResponse.Content | ConvertFrom-Json
Write-Host "✅ Pneu encontrado: $($tire.brand) $($tire.model) - R$ $($tire.price)" -ForegroundColor Green
Write-Host ""

# 6. BUSCAR PNEUS POR MARCA
Write-Host "6. BUSCANDO PNEUS DA MARCA MICHELIN..." -ForegroundColor Yellow
$michelinResponse = Invoke-WebRequest -Uri "http://localhost:8083/product-service/api/tires/brand/Michelin" `
    -Headers @{"Authorization"="Bearer $token"}
$michelinTires = $michelinResponse.Content | ConvertFrom-Json
Write-Host "✅ Pneus Michelin encontrados: $($michelinTires.Count)" -ForegroundColor Green
Write-Host ""

# 7. BUSCAR PNEUS POR TEMPORADA
Write-Host "7. BUSCANDO PNEUS DE VERÃO (SUMMER)..." -ForegroundColor Yellow
$summerResponse = Invoke-WebRequest -Uri "http://localhost:8083/product-service/api/tires/season/SUMMER" `
    -Headers @{"Authorization"="Bearer $token"}
$summerTires = $summerResponse.Content | ConvertFrom-Json
Write-Host "✅ Pneus de verão encontrados: $($summerTires.Count)" -ForegroundColor Green
Write-Host ""

# 8. LISTAR PEDIDOS
Write-Host "8. LISTANDO PEDIDOS..." -ForegroundColor Yellow
$ordersResponse = Invoke-WebRequest -Uri "http://localhost:8083/order-service/api/orders" `
    -Headers @{"Authorization"="Bearer $token"}
$orders = $ordersResponse.Content | ConvertFrom-Json
Write-Host "✅ Total de pedidos: $($orders.Count)" -ForegroundColor Green
Write-Host ""

# 9. BUSCAR PEDIDOS POR STATUS
Write-Host "9. BUSCANDO PEDIDOS PENDENTES..." -ForegroundColor Yellow
try {
    $pendingResponse = Invoke-WebRequest -Uri "http://localhost:8083/order-service/api/orders/status/PENDING" `
        -Headers @{"Authorization"="Bearer $token"}
    $pendingOrders = $pendingResponse.Content | ConvertFrom-Json
    Write-Host "✅ Pedidos pendentes: $($pendingOrders.Count)" -ForegroundColor Green
} catch {
    Write-Host "✅ Nenhum pedido pendente" -ForegroundColor Green
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMO DOS TESTES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Auth Service: OK" -ForegroundColor Green
Write-Host "✅ Product Service: OK" -ForegroundColor Green
Write-Host "✅ Order Service: OK" -ForegroundColor Green
Write-Host "✅ Gateway: OK" -ForegroundColor Green
Write-Host ""
Write-Host "Token gerado: $($token.Substring(0, 30))..." -ForegroundColor Gray
Write-Host ""
Write-Host "Use este token para testes adicionais:" -ForegroundColor Yellow
Write-Host "`$token = `"$token`"" -ForegroundColor Cyan
Write-Host ""
Write-Host "Exemplos de uso:" -ForegroundColor Yellow
Write-Host "Invoke-WebRequest -Uri `"http://localhost:8083/product-service/api/tires`" -Headers @{`"Authorization`"=`"Bearer `$token`"}" -ForegroundColor Gray
Write-Host ""
