# 🚀 GitQuest: Aprenda GitHub Jogando

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-%5E18.2.0-blue)](https://reactjs.org/)

Bem-vindo ao **GitQuest**! Este não é apenas um projeto, é um exemplo vivo de como construir software de forma profissional, colaborativa e organizada.

**GitQuest** é um jogo interativo desenvolvido para ensinar as normas, os costumes e as melhores práticas do GitHub, do básico ao avançado. Mais importante, o próprio desenvolvimento deste projeto segue rigorosamente as práticas de mercado que ensinamos, incluindo uma arquitetura robusta, princípios de design de código e um fluxo de trabalho Git exemplar.

---

## 🧭 Nossa Filosofia e Metodologia

Acreditamos que a melhor maneira de aprender é fazendo. Por isso, o GitQuest é construído com as mesmas ferramentas e metodologias que você encontrará em equipes de desenvolvimento de alto desempenho.

### 🏗️ Arquitetura: MVVM com React

Adotamos a arquitetura **Model-View-ViewModel (MVVM)** por sua clareza e alinhamento natural com o ecossistema React. Isso nos permite manter uma separação de responsabilidades impecável.

*   **Model:** A camada de dados. Representa a estrutura dos dados vindos da nossa API (ex: `User`, `Lesson`) e a lógica de negócio relacionada a eles.
*   **View:** A interface do usuário. São os **componentes React (`.jsx`)**. Eles são responsáveis por renderizar o HTML (JSX) e capturar interações do usuário, mas não contêm lógica de negócio.
*   **ViewModel:** O cérebro da operação. No React, nossos **Custom Hooks** (ex: `useAuth`, `useUserProfile`) atuam como ViewModels. Eles gerenciam o estado, buscam dados do Model e expõem para a View apenas o que é necessário. A reatividade do React (atualização automática da View quando o estado do ViewModel muda) é o nosso *data binding*.

**Exemplo Prático:**
```jsx
// src/hooks/useUserProfile.js (NOSSO VIEWMODEL)
export function useUserProfile(userId) {
  const [user, setUser] = useState(null);
  // ... lógica para buscar dados da API (MODEL)
  return { user, isLoading, error };
}

// src/pages/ProfilePage.jsx (NOSSA VIEW)
function ProfilePage({ userId }) {
  const { user, isLoading } = useUserProfile(userId); // "Bind" com o ViewModel
  if (isLoading) return <Spinner />;
  return <h1>Bem-vindo, {user.name}!</h1>;
}

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
🌳 Nosso Fluxo de Trabalho no Git (Exemplo Prático)
Este projeto é um guia para as melhores práticas de Git e GitHub. Siga estas regras rigorosamente.

1. Modelo de Branching (Git Flow Simplificado)
main: A branch principal. Reflete o código que está em produção (ou estável). Nenhum commit é feito diretamente aqui.
develop: A branch de integração. Todas as novas funcionalidades são mescladas aqui antes de irem para a main.
feature/nome-da-feature: Branches criadas a partir da develop para desenvolver novas funcionalidades, correções de bugs, etc.
Ex: feature/auth-login, fix/user-profile-loading, docs/readme-update.
2. Convenção de Commits (Conventional Commits)
Usamos um padrão para as mensagens de commit para tornar o histórico legível e automatizável.

Formato: type(scope): description

Types:
feat: Nova funcionalidade.
fix: Correção de um bug.
docs: Alteração na documentação (README, etc.).
style: Alterações de formatação, sem afetar a lógica.
refactor: Refatoração de código que não adiciona funcionalidade nem corrige um bug.
test: Adição ou alteração de testes.
chore: Alterações em ferramentas de build, dependências, etc.
Exemplos:
feat(auth): implement user login form
fix(api): handle null response on user profile endpoint
docs(readme): add git workflow section
refactor(components): extract button logic into a shared component
3. Processo de Pull Request (PR)
Nunca commit diretamente em main ou develop.
Crie uma branch feature a partir da develop.
Faça seus commits seguindo a convenção.
Abra um Pull Request (PR) da sua branch feature para a branch develop.
O PR deve ter um título claro e uma descrição detalhando o que foi feito e por quê.
Peça para alguém revisar seu código (Code Review). Todas as sugestões devem ser discutidas e aplicadas.
Após a aprovação, faça o merge usando a opção "Squash and merge". Isso transforma todos os commits da sua feature em um único commit na develop, mantendo o histórico limpo.
Após o merge, delete sua branch feature.
🛠️ Como Começar
Pré-requisitos
Node.js v20.x (LTS) ou superior.
Git.
1. Clonar o Repositório
git clone https://github.com/SEU_USUARIO/gitquest-learning-game.git
cd gitquest-learning-game
2. Configurar o Backend
cd backend
npm install
cp .env.example .env # Edite o arquivo .env com suas configurações
npm run dev
A API estará rodando em http://localhost:3001.

3. Configurar o Frontend
Abra um novo terminal.
cd frontend
npm install
cp .env.example .env # Configure a URL da API (ex: VITE_API_URL=http://localhost:3001)
npm run dev
A aplicação estará disponível em http://localhost:5173.

🤝 Como Contribuir
Faça um Fork do projeto.
Crie uma branch para sua feature (git checkout -b feature/AmazingFeature).
Siga a convenção de commits (git commit -m 'feat: Add some AmazingFeature').
Push para a sua branch (git push origin feature/AmazingFeature).
Abra um Pull Request.
📝 Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE.md para mais detalhes.

---

Com este `README.md`, temos um documento poderoso. Ele não apenas informa, mas também educa e estabelece um padrão de excelência para todo o ciclo de vida do projeto.

Estamos mais do que prontos. O próximo passo é a criação do repositório e o `git init` para começar a seguir nosso próprio guia. O que acha?