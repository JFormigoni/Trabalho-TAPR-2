# 1116AN-nginx

E-commerce com Microsserviços (Trabalho-TAPR-2 Reestruturado)

Este projeto é uma reestruturação do projeto original para implementar um sistema de e-commerce baseado em microsserviços, seguindo a arquitetura hexagonal.

Arquitetura de Microsserviços

O sistema é composto pelos seguintes microsserviços:

O acesso externo é feito através do nginx na porta 80, que roteia para o gateway-service.

Roles de Usuário

As roles de usuário foram ajustadas para:

•
CUSTOMER: Cliente da loja, pode visualizar produtos e fazer pedidos.

•
ADMIN: Administrador da loja, pode gerenciar produtos e pedidos.

Estrutura de Pastas (Arquitetura Hexagonal)

Os serviços auth-service, product-service e order-service seguem a estrutura de pastas da Arquitetura Hexagonal:

•
application/: Contém as portas de entrada (usecase) e a lógica de negócio (service).

•
domain/: O core do negócio (Entidades, Value Objects, Portas de saída/Repositórios).

•
infrastructure/: Adaptadores de saída (Persistência, Configurações).

•
interfaces/: Adaptadores de entrada (Controllers, DTOs).

Como Executar o Projeto (Docker Compose)

1.
Navegue até o diretório raiz do projeto:

2.
Construa e inicie os contêineres:

3.
Acesse o Eureka Dashboard (Opcional): Acesse http://localhost:8080 para ver os serviços registrados.

4.
Acesse a Aplicação: O acesso à API é feito através do nginx na porta 80 (ou localhost). Todas as requisições devem passar pelo gateway-service.

•
Exemplo de Rota (Product Service): http://localhost/products

•
Exemplo de Rota (Auth Service): http://localhost/auth/register



Próximos Passos (Desenvolvimento)

•
Implementar a lógica de segurança no gateway-service para as novas rotas (/products, /orders).

•
Implementar a comunicação inter-serviços (ex: order-service chamando product-service para verificar estoque).

•
Configurar um banco de dados persistente (ex: PostgreSQL) em vez do H2 em memória.

