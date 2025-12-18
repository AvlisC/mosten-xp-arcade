# 🎮 Motiva Game Center

## Visão Geral

O **Motiva Game Center** é uma aplicação de **gamificação corporativa** criada para resolver um problema real de **reconhecimento, engajamento e visibilidade de resultados** dentro da empresa, considerando diferentes realidades de trabalho: remoto e presencial.

Este projeto também teve um **segundo propósito importante**: **experimentar o uso de Inteligência Artificial na criação de aplicações do zero**, desde a concepção do produto, definição de regras de negócio, arquitetura técnica até a implementação.

A aplicação utiliza conceitos de jogos (XP, badges, ranking, passe mensal, loja e recompensas) para **motivar pessoas** e aumentar o engajamento proposto pela empresa de forma leve e divertida.

---

## 🎯 Problema que o Projeto Resolve

- Reconhecer esforços
- Aumentar a aderência para eventos que a empresa cria
- Tornar os esforços tangíveis e reconhecidos por toda empresa
- Aumentar a conexão entre times remotos e presenciais criando uma competitividade saudável.

O **Motiva Game Center** nasce como uma resposta prática, humana e tecnológica para esses desafios.

---

## 🤖 Uso de Inteligência Artificial

O projeto foi criado utilizando **IA como copiloto (Lovable)**, auxiliando em:

- Estruturação inicial da aplicação
- Aceleração no desenvolvimento
- Criação de componentes, temas e arquivos de configuração
- Geração de fluxos e validações

O objetivo foi **validar na prática** como IA combinado com a experiência pode acelerar o desenvolvimento de produtos reais, mantendo qualidade técnica e clareza de domínio.

---

## 🧠 Conceito de Gamificação

A gamificação foi pensada para:

- Incentivar **engajamento contínuo**
- Mostrar **claramente o que a pessoa ganha** ao atingir metas
- Criar senso de progresso, reconhecimento e pertencimento
- Reforçar comportamentos positivos no dia a dia

---

## 🏆 Principais Funcionalidades

### 🔹 Sistema de XP

Os usuários acumulam **XP (experiência)** com base em:

- Performance
- Feedbacks recebidos
- Tempo de casa (XP mensal automático)
- Cumprimento de obrigações (ex: apontamento de horas)

Cada critério possui uma quantidade específica de XP.

---

### 🔹 Badges & Conquistas

- Cada conquista possui um valor de XP
- Badges representam marcos importantes
- Visual retrô inspirado em **pixel art e jogos clássicos**

---

### 🔹 Ranking

- **Ranking individual** (XP total por pessoa)
- **Ranking por projeto/squad** (soma do XP do time)
- Atualização **em tempo real** via WebSocket

---

### 🔹 Passe Mensal

Sistema inspirado em _battle pass_:

- Progressão por níveis
- Cada nível pode conceder recompensas

---

### 🔹 Loja (Store)

- XP também gera **pontos**
- Pontos podem ser trocados por itens na loja
- Recompensas físicas, digitais ou simbólicas

---

### 🔹 Visão Individual

Cada pessoa possui um painel individual com:

- XP atual
- Nível do passe
- Metas pessoais
- Histórico de conquistas
- Progresso visual claro

---

### 🔹 Lançamento de Horas

- Gamificação do cumprimento de lançamento de horas
- Melhora índices de visibilidade de custo e alocação
- Gera XP adicional

---

## 🛡️ Regras & Segurança

Para evitar abusos:

- Nenhum usuário pode atribuir XP a si mesmo
- XP por feedback é atribuído apenas por responsáveis
- Regras claras e auditáveis

---

## 🧑‍💼 Painel Administrativo

A área administrativa permite:

- Gerenciar critérios de feedback
- Definir quantidade de XP por critério
- Avaliar colaboradores com base em itens objetivos e subjetivos
- Garantir que a avaliação humana complemente os números

---

## 🎨 Tema Visual

- Inspirado em **retro games** e **pixel art**
- Visual nostálgico, simples e engajador
- Linguagem visual clara para reforçar progresso e recompensa

---

## 🧱 Arquitetura & Tecnologias

### Frontend

- **React**
- **Tailwind CSS**
- **Radix UI**

### Backend

- **Node.js**

### Offline & Performance

- **WatermelonDB** para sincronização offline
- **IndexedDB** para cache e alta performance no browser

### Tempo Real

- **WebSockets** para atualização instantânea de ranking e eventos

---

## 🚀 Status do Projeto

🧪 Em evolução.
