# 🚀 Ford Vehicle Dashboard

Sistema web corporativo desenvolvido como parte do Desafio Sprint 07 - SENAI CIMATEC, utilizando Angular e Node.js para monitoramento de veículos e visualização de KPIs em tempo real.

---

## 📌 Visão Geral do Projeto

O Ford Vehicle Dashboard é uma aplicação web que consome uma API REST desenvolvida em Node.js + Express, permitindo o gerenciamento e monitoramento de veículos de alta performance da Ford, como:
- Mustang
- Ranger
- Bronco
- Territory

O sistema fornece dados de telemetria, indicadores de desempenho e uma experiência de usuário moderna com foco em performance e responsividade.

---

## 🏗️ Estrutura do Projeto

A raiz do projeto é composta por duas subpastas principais que dividem as responsabilidades do ecossistema:
- Pasta api_ford: Contém o Back-end desenvolvido em Node.js e Express.
- Pasta ford-dashboard: Contém o Front-end desenvolvido em Angular (versão 20.3.26).

---

## ✨ Funcionalidades

### 🔐 Autenticação de Usuários
O sistema possui login reativo com validação de credenciais em tempo real, além de um mecanismo de auto-login gerenciado via localStorage para manter a sessão ativa de forma segura.

### 🎬 Experiência de Usuário (UX)
Conta com uma animação premium (efeito de zoom + subida) no card principal da página Home. Essa animação é controlada de forma dinâmica através de sessionStorage, sendo executada estritamente no primeiro acesso pós-login para evitar exaustão visual.

### 🔎 Busca Inteligente (RxJS)
A listagem traz um filtro reativo de chassis (VIN) otimizado com os operadores debounceTime e distinctUntilChanged da biblioteca RxJS. Essa abordagem evita requisições duplicadas ou desnecessárias à API enquanto o usuário digita.

### 📊 Dashboard Interativo
Permite a alternância rápida e dinâmica entre os modelos de veículos. A seleção atualiza instantaneamente no painel as imagens do carro correspondente, métricas de combustível, odômetro, mapas e coordenadas de geolocalização.

### 📱 Interface Responsiva
O design é totalmente adaptável para dispositivos mobile, tablets e desktops. A Sidebar (menu lateral) possui transições suaves e seu estado de abertura é controlado globalmente via serviço reativo.

---

## 🧠 Arquitetura do Sistema

### 🧩 Front-end (Angular 20.3.26)
- Login Component: Responsável pela interface de autenticação e validação do formulário.
- Home Component: Tela de boas-vindas que exibe o card principal animado.
- Dashboard Component: Centraliza os KPIs, filtros de busca e monitoramento em tempo real.

### ⚙️ Serviços Globais
- AuthService: Gerencia o consumo da API REST e o estado de autenticação do usuário.
- MenuService: Controla de forma reativa a visibilidade e o comportamento da Sidebar.

---

## 🛠️ Tecnologias Utilizadas

O ecossistema de desenvolvimento foi construído com as seguintes tecnologias: Framework Core Angular 20.3.26, Linguagem TypeScript, Programação Reativa com RxJS, Design e Estilização com Bootstrap 5 e CSS3 Customizado, e ambiente Back-end com Node.js e Express.

---

## 🚀 Como Executar o Projeto

### 📌 Pré-requisitos
Para rodar a aplicação localmente, é necessário ter instalado em sua máquina o Git e o Node.js (versão LTS recomendada).

### 📥 1. Clonar o repositório
Abra o seu terminal na pasta onde deseja salvar o projeto e digite o comando de clonagem:
git clone https://github.com/AndreikSarli/desafio-sprint-7-angular.git

### 🖥️ 2. Rodar o Back-end (API)
Abra um terminal na pasta raiz do projeto clonado. Em seguida, acesse a pasta da API digitando o comando:
cd api_ford
Depois, instale todos os pacotes necessários digitando:
npm install
Por fim, inicie o servidor do back-end executando o comando:
npm start
A API será iniciada e estará ativa para receber requisições através do endereço local: http://localhost:3001

### 🌐 3. Rodar o Front-end (Angular)
Abra um segundo terminal (em uma nova janela ou aba), também localizado na raiz do projeto clonado. Acesse a pasta do front-end digitando o comando:
cd ford-dashboard
Instale as dependências específicas do Angular executando:
npm install
Em seguida, suba o servidor local de desenvolvimento do framework digitando o comando:
ng serve

### 🚀 4. Acessar a aplicação
Com os dois servidores rodando simultaneamente nos terminais anteriores, abra o seu navegador de preferência e digite o endereço padrão do Angular:
http://localhost:4200

---

## 📌 Observações Importantes

É fundamental que o servidor do back-end (api_ford) esteja rodando antes de interagir com a interface, garantindo que o front-end funcione corretamente. A aplicação utiliza o localStorage para manter a autenticação estável e persistente, e o sessionStorage para coordenar as animações de interface sem repetições exaustivas. É altamente recomendado o uso do Node.js LTS para evitar conflitos de versão.

---

## 🎯 Objetivo Acadêmico

Este projeto foi projetado e implementado com foco prático no consumo de APIs REST, estruturação de arquitetura modular corporativa com Angular, aplicação avançada de programação reativa com a biblioteca RxJS, design centrado na experiência do usuário (UX/UI) e integração completa de ponta a ponta entre os ambientes de front-end e back-end.