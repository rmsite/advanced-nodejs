[![Build Status](https://travis-ci.com/rmanguinho/advanced-node.svg?branch=master)](https://travis-ci.com/rmanguinho/advanced-node)
[![Coverage Status](https://coveralls.io/repos/github/rmanguinho/advanced-node/badge.svg)](https://coveralls.io/github/rmanguinho/advanced-node)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

# **Advanced Node**

Essa API faz parte do treinamento do professor Rodrigo Manguinho (Mango).

O objetivo é mostrar como criar uma API com uma arquitetura bem definida e desacoplada, utilizando TDD (programação orientada a testes) como metodologia de trabalho, Clean Architecture para fazer a distribuição de responsabilidades em camadas, sempre seguindo os princípios do SOLID e, sempre que possível, aplicando Design Patterns para resolver alguns problemas comuns.


> ## Princípios

* Single Responsibility
* Open Closed
* Liskov Substitution
* Interface Segregation
* Dependency Inversion
* Separation of Concerns
* Don't Repeat Yourself
* You Aren't Gonna Need It
* Keep It Simple
* Composition Over Inheritance
* Small Commits

> ## Design Patterns

* Factory
* Adapter
* Composite
* Decorator
* Command
* Dependency Injection
* Abstract Server
* Composition Root
* Builder
* Template Method
* Singleton
* Chain of Responsibility
* Proxy

> ## Code Smells (Anti-Patterns)

* Blank Lines
* Comments
* Data Clumps
* Divergent Change
* Duplicate Code
* Inappropriate Intimacy
* Feature Envy
* Large Class
* Long Method
* Long Parameter List
* Middle Man
* Primitive Obsession
* Refused Bequest
* Shotgun Surgery
* Speculative Generality

> ## Metodologias e Designs

* TDD
* Clean Architecture
* DDD
* Refactoring
* GitFlow
* Modular Design
* Dependency Diagrams
* Use Cases
* Spike (Agile)

> ## Bibliotecas e Ferramentas

* NPM
* Typescript
* Git
* Jest
* Ts-Jest
* Jest-Mock-Extended
* TypeORM
* AWS-SDK
* Multer
* UUID
* Axios
* Postgres
* JsonWebToken
* Express
* Cors
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Rimraf
* In-Memory Postgres Server
* Module-Alias
* Npm Check
* Travis CI
* Coverals
* DotEnv
* Ts-Node-Dev

> ## Features do Typescript

* POO Avançado
* Strict Mode
* Interface
* TypeAlias
* Namespace
* Utility Types
* Modularização de Paths
* Configurações
* Build

> ## Features de Testes

* Testes Unitários
* Testes de Integração
* Cobertura de Testes
* Test Doubles
* Mocks
* Stubs
* Spies
* Fakes

## Rodando o projeto

* Clonar o repositório
* criar o arquivo .env e preencher as variáveis<br/>
<code> cp .env.example .env</code>
* instalar as dependências: <br/>
<code> npm install</code>
* rodar o docker para subir o localstack que é utilizado para simular o ambiente AWS <br/>
<code>docker-compose up -d</code>
* iniciar a aplicação <br/>
<code> npm run dev </code> desenvolvimento, ou<br/>
<code> npm start </code> em produção.

## Bônus
Você pode utilizar uma UI do localstack acessando https://app.localstack.cloud
