# PIAC - Guia do Desenvolvedor

## 📋 Visão Geral Técnica

Este projeto é um sistema completo de indicações e dashboard desenvolvido em React 18 com Material-UI. O sistema possui autenticação baseada em roles e três tipos diferentes de dashboards.

## 🏗️ Arquitetura do Projeto

### Estrutura de Pastas
```
src/
├── components/           # Componentes reutilizáveis
│   ├── admin/           # Componentes específicos do admin
│   ├── client/          # Componentes específicos do cliente
│   ├── partner/         # Componentes específicos do parceiro
│   ├── DashboardLayout.jsx  # Layout padrão dos dashboards
│   └── ProtectedRoute.jsx   # Proteção de rotas por role
├── contexts/            # Contextos React (Estado Global)
│   └── AuthContext.jsx  # Gerenciamento de autenticação
├── pages/              # Páginas principais da aplicação
│   ├── AdminDashboard.jsx   # Dashboard administrativo
│   ├── ClientDashboard.jsx  # Dashboard do cliente
│   ├── Landing.jsx         # Página inicial
│   ├── Login.jsx          # Página de login
│   ├── PartnerDashboard.jsx # Dashboard do parceiro
│   └── Register.jsx       # Página de registro
├── services/           # Serviços e comunicação com API
│   └── authService.js   # Serviço de autenticação
├── App.jsx            # Componente raiz da aplicação
└── main.jsx          # Ponto de entrada React 18
```

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação
1. **Login**: Usuário fornece credenciais → `AuthContext.login()`
2. **Validação**: Credenciais validadas (mockado no momento)
3. **Armazenamento**: Token e dados do usuário salvos no `localStorage`
4. **Redirecionamento**: Usuário redirecionado baseado no `role`
5. **Proteção**: `ProtectedRoute` valida acesso às rotas

### Roles de Usuário
- **admin**: Acesso completo ao sistema
- **partner**: Dashboard de parceiros com indicações e comissões
- **client**: Dashboard de clientes com contratos e documentos

### Usuários de Teste (Desenvolvimento)
```javascript
const mockUsers = {
  'cliente@teste.com': { role: 'client', name: 'Cliente Teste' },
  'parceiro@teste.com': { role: 'partner', name: 'Parceiro Teste' },
  'admin@teste.com': { role: 'admin', name: 'Admin Teste' }
}
// Senha padrão: 123456
```

## 🎨 Sistema de Tema

### Configuração do Material-UI
```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },    // Azul PIAC
    secondary: { main: '#dc004e' },   // Rosa destaque
    background: { default: '#f5f5f5' } // Fundo cinza
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif'
  }
})
```

### Componentes Customizados
- **Botões**: Bordas arredondadas (8px), sem transformação de texto
- **Cards**: Bordas arredondadas (12px), sombra sutil
- **Layout**: Responsivo com breakpoints Material-UI

## 🛠️ Estado da Aplicação

### Context API (AuthContext)
```javascript
const contextValue = {
  user,              // Objeto do usuário logado
  login,             // Função de login
  register,          // Função de registro (placeholder)
  logout,            // Função de logout
  loading,           // Estado de carregamento
  isAuthenticated    // Boolean de autenticação
}
```

### LocalStorage
- `token`: JWT token (mockado)
- `user`: Dados do usuário em JSON

## 🚧 TODOs para Implementação Backend

### Autenticação Real
```javascript
// Substituir em AuthContext.jsx
const checkAuth = async () => {
  const userData = await authService.validateToken() // Implementar
  setUser(userData)
}
```

### Endpoints Necessários
```javascript
// authService.js - Implementar estas funções:
POST /api/auth/login        // Login de usuário
POST /api/auth/register     // Registro de usuário
GET  /api/auth/validate     // Validação de token
POST /api/auth/logout       // Logout seguro

// Dados específicos por role:
GET /api/partners/profile      // Dados do parceiro
GET /api/partners/indicacoes   // Indicações do parceiro
GET /api/clients/contratos     // Contratos do cliente
GET /api/admin/dashboard       // Métricas gerais
```

## 📊 Dados Mockados

### Estrutura de Dados
Os componentes atualmente usam dados mockados para demonstração:

```javascript
// Exemplo de dados de indicação
const mockIndicacao = {
  id: 1,
  cliente: 'Nome do Cliente',
  email: 'cliente@email.com',
  status: 'pendente',
  valor: 15000,
  data: '2025-01-25',
  comissao: 750
}

// Exemplo de contrato
const mockContrato = {
  id: 'CT-2025-001',
  titulo: 'Projeto de Estrutura',
  status: 'em_andamento',
  progresso: 65,
  valor: 25000,
  prazo: '2025-12-31'
}
```

## 🔄 Fluxo de Navegação

### Roteamento
```
/ (Landing)
├── /login → Login
├── /register → Register
└── /[role]/* → Dashboard baseado no role
    ├── /partner/* → PartnerDashboard
    ├── /client/* → ClientDashboard
    └── /admin/* → AdminDashboard
```

### Proteção de Rotas
1. `ProtectedRoute` verifica `isAuthenticated`
2. Se não autenticado → redireciona para `/login`
3. Se role incorreto → redireciona para dashboard correto
4. Se autorizado → renderiza componente

## 🎯 Padrões de Desenvolvimento

### Componentes
- **Functional Components** com hooks
- **Props destructuring** no parâmetro
- **Estado local** com `useState`
- **Efeitos** com `useEffect`
- **Hooks customizados** para lógica reutilizável

### Estilo
- **Material-UI** como sistema de design
- **Responsive design** com `useMediaQuery`
- **Theme** centralizado no App.jsx
- **Consistent spacing** usando sistema MUI

### Dados
- **Loading states** para operações assíncronas
- **Error handling** com try/catch
- **Mock data** estruturado para desenvolvimento
- **Service layer** para chamadas de API

## 🐛 Debugging

### Estados Importantes
```javascript
// No console do navegador:
localStorage.getItem('token')    // Verificar token
localStorage.getItem('user')     // Verificar dados do usuário
```

### Logs Úteis
- `AuthContext`: Erros de validação de token
- `ProtectedRoute`: Redirecionamentos de role
- Componentes: Estados de loading e erro

## 🚀 Deploy e Build

### Variáveis de Ambiente
```env
VITE_API_URL=http://localhost:3001/api  # URL da API backend
```

### Comandos
```bash
npm run dev      # Desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview da build
```

## 📈 Próximos Passos

1. **Backend API**: Implementar endpoints reais
2. **Autenticação JWT**: Sistema completo com refresh tokens
3. **Upload de Arquivos**: Sistema de documentos
4. **Notificações**: Real-time com WebSockets
5. **Testes**: Unit tests com Jest/Testing Library
6. **PWA**: Service workers para offline
7. **SEO**: Meta tags e estruturação

---

**Desenvolvido para PIAC Engenharia - Janeiro 2025**
