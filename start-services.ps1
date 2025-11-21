# Script para iniciar todos os serviços do e-commerce de pneus

Write-Host "=== Iniciando E-commerce de Pneus ===" -ForegroundColor Green
Write-Host ""

# Função para iniciar um serviço em uma nova janela
function Start-Service {
    param(
        [string]$ServiceName,
        [string]$ServicePath,
        [int]$Port
    )
    
    Write-Host "Iniciando $ServiceName na porta $Port..." -ForegroundColor Cyan
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$ServicePath'; Write-Host 'Iniciando $ServiceName...' -ForegroundColor Yellow; .\mvnw.cmd spring-boot:run"
    Start-Sleep -Seconds 2
}

# Verificar se estamos no diretório correto
if (-not (Test-Path "docker-compose.yml")) {
    Write-Host "ERRO: Execute este script no diretório raiz do projeto!" -ForegroundColor Red
    exit 1
}

# Obter o caminho completo do diretório atual
$RootPath = Get-Location

Write-Host "Diretório do projeto: $RootPath" -ForegroundColor Gray
Write-Host ""

# 1. Service Discovery (Eureka)
Start-Service -ServiceName "Service Discovery (Eureka)" -ServicePath "$RootPath\service-discovery" -Port 8080
Write-Host "Aguardando Service Discovery inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# 2. Auth Service
Start-Service -ServiceName "Auth Service" -ServicePath "$RootPath\auth-service" -Port 8084
Start-Sleep -Seconds 5

# 3. Gateway Service
Start-Service -ServiceName "Gateway Service" -ServicePath "$RootPath\gateway-service" -Port 8083
Start-Sleep -Seconds 5

# 4. Product Service
Start-Service -ServiceName "Product Service (Pneus)" -ServicePath "$RootPath\product-service" -Port 8085
Start-Sleep -Seconds 5

# 5. Cart Service
Start-Service -ServiceName "Cart Service" -ServicePath "$RootPath\cart-service" -Port 8087
Start-Sleep -Seconds 5

# 6. Order Service
Start-Service -ServiceName "Order Service" -ServicePath "$RootPath\order-service" -Port 8086

Write-Host ""
Write-Host "=== Todos os serviços foram iniciados! ===" -ForegroundColor Green
Write-Host ""
Write-Host "URLs dos serviços:" -ForegroundColor Cyan
Write-Host "  - Eureka Dashboard: http://localhost:8080" -ForegroundColor White
Write-Host "  - Gateway:          http://localhost:8083" -ForegroundColor White
Write-Host "  - Auth Service:     http://localhost:8084" -ForegroundColor White
Write-Host "  - Product Service:  http://localhost:8085/api/tires" -ForegroundColor White
Write-Host "  - Order Service:    http://localhost:8086/api/orders" -ForegroundColor White
Write-Host "  - Cart Service:     http://localhost:8087/api/cart/1" -ForegroundColor White
Write-Host ""
Write-Host "Aguarde alguns minutos para todos os serviços registrarem no Eureka." -ForegroundColor Yellow
Write-Host "Pressione qualquer tecla para sair..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
