# Market API

A **Market API** é uma API de e-commerce desenvolvida utilizando a **Clean Architecture**, permitindo a gestão de produtos, carrinho de compras e categorias de forma escalável e modular. A API oferece endpoints para a adição, atualização e remoção de produtos, além de funcionalidades para o gerenciamento do carrinho e categorias de produtos.

## Funcionalidades

### Carrinho de Compras
- **Adicionar Produto ao Carrinho**: Permite ao usuário adicionar um produto ao carrinho.
- **Atualizar Produto no Carrinho**: Permite ao usuário atualizar a quantidade de um produto no carrinho.
- **Deletar Produto do Carrinho**: Permite ao usuário remover um produto do carrinho.
- **Obter Carrinho**: Exibe todos os produtos no carrinho do usuário.

### Produtos
- **Criar Produto**: Permite ao administrador criar um novo produto no catálogo.
- **Editar Produto**: Permite ao administrador editar as informações de um produto existente.
- **Deletar Produto**: Permite ao administrador excluir um produto do catálogo.
- **Listar Produtos**: Permite obter a lista de produtos disponíveis no catálogo.
- **Obter Detalhes do Produto**: Exibe os detalhes de um produto específico.

### Categorias
- **Criar Categoria**: Permite ao administrador criar novas categorias de produtos.
- **Editar Categoria**: Permite ao administrador editar as informações de uma categoria existente.
- **Deletar Categoria**: Permite ao administrador excluir uma categoria.
- **Listar Categorias**: Permite listar todas as categorias de produtos.

## Arquitetura

A API foi projetada utilizando a **Clean Architecture**, garantindo uma separação clara entre as camadas do sistema e facilitando a manutenção e escalabilidade. A estrutura básica do projeto segue os princípios da Clean Architecture, dividindo a aplicação em camadas que são:

- **Module**
- **Entities (Entidades)**: Representa os objetos de domínio (ex.: Produto, Carrinho, Categoria).
- **Use Cases (Casos de Uso)**: Regras de negócios e operações que a API deve executar (ex.: adicionar produto ao carrinho, criar produto, etc.).
- **Interface Adapters (Adaptadores de Interface)**: Camada responsável pela conversão de dados entre as camadas externas (como controllers e requests) e o modelo de domínio.
- **Frameworks & Drivers (Frameworks e Drivers)**: Camada que contém as implementações de infraestrutura, como bancos de dados, APIs externas e servidores web.

## Tecnologias Utilizadas

- **Backend**: Node.js
- **Framework**: Express.js
- **Banco de Dados**: MongoDB
- **Testes**: Jest
- **Arquitetura**: Clean Architecture
- **Autenticação**: JWT (JSON Web Tokens)
- **Validação**: Joi

## Endpoints

### 1. **Carrinho de Compras**
