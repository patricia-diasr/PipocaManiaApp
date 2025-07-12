# 🎬 PipocaManiaApp

**PipocaMania** é um aplicativo mobile criado para **aprimorar a experiência de ida ao cinema**, tanto para o público quanto para os administradores da rede. A proposta é oferecer uma **plataforma moderna, prática e interativa** para explorar filmes, comprar ingressos e gerenciar sessões.  

Este projeto foi desenvolvido como parte da disciplina de **Projeto de Bloco em Desenvolvimento Front-end com Frameworks**.

---

## 📱 Funcionalidades

### 👤 Para Clientes:
- 🎞️ Visualizar filmes em cartaz e próximos lançamentos  
- 🕒 Acessar detalhes de sessões disponíveis  
- 🎟️ Selecionar assentos e comprar ingressos  
- ⭐ Avaliar filmes assistidos  
- 📝 Criar lista de “Quero assistir”

### 🛠️ Para Administradores:
- 🗓️ Cadastrar e editar sessões de filmes  
- 🪑 Visualizar mapa de assentos e bloquear lugares (venda presencial)  
- 📷 Ler QR codes de ingressos para validação de entrada

---

## 🧪 Tecnologias Utilizadas

- **React Native**: Desenvolvimento mobile com performance nativa para Android e iOS  
- **Expo**: Plataforma que simplifica testes e publicação do app, além de fornecer recursos como acesso à câmera  
- **Firebase**: Armazenamento de dados da aplicação (sessões, ingressos, listas, avaliações)  
- **TheMovieDB API**: Integração para obter dados reais sobre filmes (sinopses, trailers, elenco etc.)  
- **HTML5 e CSS3**: Estilização da interface garantindo visual moderno e responsivo

---

## 🚀 Como rodar o projeto localmente

> ⚠️ Pré-requisitos: [Node.js](https://nodejs.org), [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
# Clone o repositório
git clone https://github.com/patricia-diasr/PipocaManiaApp.git

# Acesse a pasta do projeto
cd PipocaManiaApp

# Instale as dependências
npm install

# Rode o projeto com o Expo
npm run start
