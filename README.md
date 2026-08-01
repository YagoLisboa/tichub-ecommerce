# TechHub Commerce: 🚀E-commerce Fullstack Profissional

<div align="center">

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4+-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma_ORM-5.0+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Better_SQLite3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PrimeVue](https://img.shields.io/badge/PrimeVue-3.40+-00897B?style=for-the-badge&logo=primevue&logoColor=white)](https://primevue.org/)

*Projeto Desenvolvido para a Residência Tecnológica — TIC Hub 12 (Universidade Estadual do Ceará - UECE)*

</div>

---

## 📌 Visão Geral do Projeto

O **TechHub Commerce** é uma aplicação de e-commerce Fullstack de alta performance, projetada e desenvolvida sob rigorosos padrões de engenharia de software corporativa. O sistema adota os princípios de **Clean Architecture, SOLID, MVVM/MVC, Tipagem Estrita (TypeScript) de Ponta a Ponta sem uso de `any`, Cibersegurança Proativa e Experiência de Usuário (UX/UI) de Nível Sênior**.

Este repositório consolida a entrega técnica da Residência Tecnológica TIC Hub 12 - Trilha Programação FullStack da UECE, servindo como demonstração de competência técnica avançada no desenvolvimento de soluções digitais escaláveis e seguras. (A Residência em Tecnologia da Informação e Comunicação 12 é um programa de capacitação profissional e tecnológica executado pela Universidade Estadual do Ceará (UECE), coordenado pela Softex, com parceria do Instituto iRede (iRede) e do Instituto Federal do Ceará (IFCE), e incentivo do Ministério da Ciência, Tecnologia e Inovação (MCTI)).

---

## 🏗️🏛️ Padrões de Arquitetura de Software: MVVM, MVC & Clean Code

O projeto foi estruturado de forma desacoplada, separando claramente as responsabilidades de domínio, persistência, regras de negócio e apresentação.

### 1. Arquitetura do Backend: Padrão MVC (Node.js / Express / TypeScript)
O backend adota o padrão **Model-View-Controller (MVC)** combinado com padrão em camadas desacopladas (**Layered Architecture / Service-Repository Pattern**):
- **Routers (`/routers`):** Responsáveis unicamente pelo mapeamento de endpoints HTTP, injeção de dependências e aplicação de middlewares de segurança.
- **Controllers (`/controllers`):** Camada de interface HTTP. Valida entradas estritamente via **Zod**, delega o processamento ao serviço e trata o ciclo de vida da resposta (`req`, `res`, `next`).
- **Services (`/services`):** Concentra a lógica de negócio pura e regras transacionais da aplicação, isolada de frameworks de transporte (HTTP) ou ORM.
- **Repositories (`/repositories`):** Abstração de persistência de dados. Utiliza o **Prisma ORM** acoplado ao driver de alta performance `better-sqlite3`.
- **Entities & DTOs (`/entities`):** Modelagem de domínio rica, desacoplando o banco de dados das regras centrais, garantindo encapsulamento e integridade de tipos.

### 2. Arquitetura do Frontend: Padrão MVVM (Vue 3 / TypeScript / Vite / Composition API)
O frontend adota o padrão **Model-View-ViewModel**:
- **Model (`/models`):** Contém classes de domínio reativas encapsuladas (ex: a classe Cart que gerencia estado, cálculos por .reduce(), adições sem duplicidade e persistência lógica).
- **View (`/views`):** Telas de interface puras (HomeView, ProductDetailView, etc.) focadas na estrutura visual combinada com Tailwind CSS e PrimeVue.
- **ViewModel (`<script setup> / Composition API`):** Gerencia a reatividade, ciclo de vida (mounted), requisições assíncronas via Axios e o mapeamento de dados entre o Model e a View.

 E foi construído utilizando a **Composition API** do Vue 3 combinada com a tipagem estrita do **TypeScript**:

- **Componentização Avançada:** Isolamento de componentes reutilizáveis (`ProductCard`, drawers, etc.).
- **Gerenciamento de Estado Orientado a Objetos:** A classe `Cart` encapsula toda a lógica reativa do carrinho de compras aplicando métodos funcionais modernos (`.reduce()`, `.some()`, `.filter()`).
- **Roteamento Dinâmico:** Gerenciado pelo `Vue Router` com layouts aninhados (`ConsumerLayout` e `AdminLayout`) e *Navigation Guards* para controle de acesso baseada em papéis (*RBAC*).

---

## 🚫 Eliminação Absoluta do Tipo any (Type Safety Rigoroso)
Um dos diferenciais de qualidade desta implementação foi o **compromisso intransigente com a tipagem estrita (Zero any Policy):**
- **Contratos Fortes:** Todas as entidades, DTOs, payloads de requisições, respostas de API, props de componentes e estados globais possuem tipagem explícita via TypeScript interfaces ou types (`PropType, CartItem, ProductAPI`, etc.).
- **Validação de Limites em Runtime com Zod:** No backend, o uso de esquemas Zod garante que dados vindos de requisições externas sejam tipados e validados em tempo de execução, prevenindo poluição de tipos e falhas de contrato.

---

## ⭐ Decisão de Projeto em Destaque: Transição de Mock Estático para Banco de Dados Relacional Real
Como um **plus ou diferencial** que vai muito além dos requisitos básicos propostos inicialmente, tomamos a decisão arquitetural crítica de **abandonar o consumo de objetos estáticos/mocks na componentização** e implementar um banco de dados relacional real local.
- **Por que fizemos isso?** Sistemas reais não sobrevivem a dados hardcoded estáticos. Queríamos simular um cenário de produção corporativa autêntico.
- **Como foi implementado:**  
**I- Integrei o SQLite** utilizando o driver de alta performance *better-sqlite3* acoplado ao **Prisma ORM**.
**II- Criei seeds automáticos** baseados em dados reais de e-commerce para popular o banco relacional com categorias e produtos estruturados.
**III- O frontend consome dinamicamente esses dados via paginação real** (`skip/take`), *rotas de busca por ID* e *carregamento de imagens reais*, transformando componentes visuais estáticos em instâncias vivas de um sistema fullstack integrado.

---

## 🛡️ Cibersegurança & Padrões Restritivos

A segurança da aplicação não foi tratada como um aditivo, mas como um pilar estrutural:
1. **Validação de Entrada Rigorosa (Zero Trust):** Todos os payloads de requisição e parâmetros de URL são validados estritamente no backend utilizando **Zod**, bloqueando injeções, payloads malformados ou poluição de parâmetros.
2. **Controle de Acesso Baseado em Funções (RBAC):** Rotas administrativas críticas exigem autenticação via tokens criptografados e verificação de privilégios (`adminOnly` middleware).
3. **CORS e Headers de Segurança:** Configuração restritiva de CORS permitindo apenas origens confiáveis e sanitização de logs globais de auditoria via middleware.
4. **Proteção de Domínio:** Entidades de domínio encapsuladas para impedir mutações diretas indevidas fora do escopo transacional.

---

## 🚀 Principais Funcionalidades

- **Vitrine Dinâmica com Paginação de Alta Performance:** Consumo de API RESTful com paginação eficiente (`skip`/`take`) via parâmetros de query otimizados.
- **Carrinho de Compras Reativo com Miniaturas:** Adição inteligente de itens com prevenção de duplicidade, controle de quantidades, cálculo automático de totais por `.reduce()` e renderização de miniaturas visuais.
- **Página de Detalhes Dinâmica (`/product/:id`):** Rota dedicada para inspeção detalhada de produtos buscando diretamente do banco de dados relacional.
- **Painel Administrativo Protegido:** Gestão restrita de recursos da plataforma através de rotas blindadas por autenticação.
- **Design System Profissional:** Integração harmônica entre **Tailwind CSS** para layout responsivo e os componentes de alta performance do **PrimeVue**.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Frontend** | Vue.js 3 (Composition API / MVVM)  | Framework progressivo reativo baseado em componentes |
| **Frontend** | TypeScript | Tipagem estrita e segurança em tempo de compilação (Zero "any")|
| **Frontend** | Vite | Empacotador e servidor de desenvolvimento ultrarrápido |
| **UI & Styling**| Tailwind CSS & PrimeVue | Design system moderno, responsivo e componentizado |
| **Backend** | Node.js & Express (MVC) | Ambiente de execução e framework web robusto |
| **Database** | SQLite & Better-SQLite3 | Banco de dados relacional leve e de altíssima performance |
| **ORM** | Prisma ORM | Mapeamento objeto-relacional seguro e type-safe |
| **Validação** | Zod | Validação declarativa de esquemas de dados em tempo de execução |
| **Comunicação**| Axios | Cliente HTTP baseado em Promises |

---

## 📂 Estrutura de Diretórios do Projeto

```text
techhub-commerce/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Modelagem relacional do banco de dados
│   │   └── dev.db              # Arquivo SQLite local
│   ├── src/
│   │   ├── controllers/        # Controladores HTTP (Tratamento de Requisições - MVC)
│   │   ├── entities/           # Entidades de Domínio (Clean Architecture)
│   │   ├── middlewares/        # Middlewares de Autenticação, Logs e Segurança
│   │   ├── repositories/       # Repositórios de Acesso a Dados (Prisma)
│   │   ├── routers/            # Roteadores da API REST
│   │   ├── schemas/            # Schemas de Validação Zod
│   │   ├── services/           # Regras de Negócio e Casos de Uso
│   │   └── server.ts           # Ponto de entrada do servidor Express
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/         # Componentes visuais isolados (ProductCard, etc.)
    │   ├── models/             # Modelos e Classes de Domínio reativas (MVVM, Cart)
    │   ├── router/             # Configuração de rotas e Guards do Vue Router
    │   ├── stores/             # Gerenciamento de estado global (Pinia)
    │   ├── views/              # Páginas da aplicação (HomeView, ProductDetailView, etc.)
    │   ├── App.vue             # Componente raiz
    │   └── main.ts             # Ponto de entrada do Vue
    └── package.json
```

---

## 🏃 Como Rodar e Experimentar o Projeto

Para executar o ambiente completo em sua máquina local, certifique-se de ter o **Node.js (v20+)** instalado.

### 1. Clonar o Repositório e Configurar o Backend
Abra um terminal na pasta do backend e execute os comandos abaixo:

```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Execute as migrações do banco de dados Prisma e seed inicial
npx prisma migrate dev --name init

# Inicie o servidor de desenvolvimento do backend
npm run dev
```
*O servidor backend estará rodando em `http://localhost:3000`.*

### 2. Configurar e Iniciar o Frontend
Abra um **novo terminal** na pasta do frontend e execute:

```bash
# Entre na pasta do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento do Vue/Vite
npm run dev
```
*O frontend estará disponível em `http://localhost:5173`.*

---

## 📋 Critérios de Avaliação Atendidos (TIC Hub 12)

- [x] **Arquitetura Limpa e Desacoplada (MVC & MVVM):** Separação estrita entre rotas, modelos, visões, controladores, serviços, repositórios e domínio.
- [x] **Tipagem Estrita (TypeScript):** Garantia absoluta de segurança de tipos em todo o código pela ausência total de tipos `any` implícitos críticos; interfaces e contratos estritos em toda a aplicação.
- [x] **Banco de Dados Real Relacional (Plus):** Substituição total de objetos estáticos por persistência real via Prisma ORM e SQLite.
- [x] **Segurança e Validação:** Barreiras robustas contra dados corrompidos utilizando Zod e tratamento centralizado de exceções.
- [x] **Experiência do Usuário (UX/UI):** Interface fluida, responsiva, com feedback visual imediato, paginação de vitrine, miniaturas no carrinho e páginas de detalhes dedicadas.
- [x] **Documentação Profissional:** Apresentação técnica de nível corporativo voltada para avaliação de excelência acadêmica e de mercado.

---

<div align="center">

*Desenvolvido com ☕, dedicação  e excelência técnica para a Residência Tecnológica TIC Hub 12 — UECE - IFCE - iRede.*

***Feito com <img width="15" height="15" alt="coracao" src="https://github.com/user-attachments/assets/a4d02748-d0f1-46bb-b490-6c86dc06a6e3" /> por Yago Lisboa.***
</div>
