# Clean Architecture e DDD com TypeScript

Projeto de estudo e implementação prática de **Clean Architecture** e **Domain-Driven Design (DDD)** em TypeScript. O código demonstra como separar regras de negócio, casos de uso e detalhes de infraestrutura para construir aplicações testáveis e de fácil manutenção.

## Objetivo

A proposta é manter o domínio independente de frameworks e tecnologias externas. Express, banco de dados e mecanismos de entrega ficam nas camadas externas, enquanto as regras de negócio permanecem isoladas e protegidas.

## Tecnologias

- TypeScript
- Node.js
- Express
- Sequelize
- SQLite
- Jest
- Supertest

## Conceitos demonstrados

- Entidades e objetos de valor
- Regras de negócio no domínio
- Casos de uso na camada de aplicação
- Inversão de dependência
- Contratos de repositório
- Adaptadores de infraestrutura
- Persistência desacoplada
- Testes unitários e de integração

## Arquitetura

```text
Domínio
  └── Entidades, objetos de valor e regras de negócio

Aplicação
  └── Casos de uso e contratos

Infraestrutura
  └── Persistência, ORM e implementações externas

Interface
  └── API HTTP, controllers e apresentação
```

As dependências apontam para as camadas internas. Dessa forma, o domínio não precisa conhecer Express, Sequelize ou qualquer detalhe de banco de dados.

## Executando o projeto

### Pré-requisitos

- Node.js
- npm

### Instalação

```bash
git clone https://github.com/pedroesteves2803/clean-architecture-ddd-typescript.git
cd clean-architecture-ddd-typescript
npm install
```

### Build

```bash
npm run build
```

### Testes

```bash
npm test
```

A suíte cobre regras de domínio, casos de uso e integrações HTTP, ajudando a garantir que cada camada possa evoluir com segurança.

## Por que este projeto é relevante

Este repositório demonstra competências importantes para aplicações backend:

- Modelagem orientada ao domínio
- Separação clara de responsabilidades
- Código independente de framework
- Testes como parte da arquitetura
- Uso de interfaces para reduzir acoplamento
- Organização preparada para evolução e manutenção

## Autor

Desenvolvido por **Pedro Esteves**.

- [LinkedIn](https://www.linkedin.com/in/pedrooesteves/)
- [GitHub](https://github.com/pedroesteves2803)
