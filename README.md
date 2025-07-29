# PIAC - Sistema de Indicações e Dashboard

Sistema completo de indicações e dashboard para empresas de engenharia, desenvolvido com React e Material-UI seguindo o plano de requisitos fornecido.

## 🚀 Funcionalidades Implementadas

### 🏠 Landing Page
- Página inicial responsiva com informações do sistema
- Links para login e cadastro
- Apresentação das principais funcionalidades

### 🔐 Autenticação
- Sistema de login e registro
- Autenticação baseada em JWT
- Proteção de rotas por perfil de usuário
- Suporte a 3 tipos de usuário: Cliente, Parceiro e Admin

### 👥 Dashboard do Parceiro
- **Visão Geral**: Estatísticas de indicações e comissões
- **Indicações**: Gerenciamento completo de indicações de clientes
- **Comissões**: Acompanhamento de comissões e pagamentos
- **Link Único**: Geração de link personalizado para indicações
- **Relatórios**: Análises e relatórios de performance

### 👤 Dashboard do Cliente
- **Visão Geral**: Resumo dos contratos e projetos
- **Contratos Ativos**: Acompanhamento detalhado de contratos
- **Documentos**: Acesso a documentos e arquivos dos projetos
- **Histórico**: Histórico completo de contratos
- **Perfil**: Gerenciamento de dados pessoais

### ⚙️ Dashboard Administrativo
- **Visão Geral**: Métricas gerais do sistema
- **Gestão de Contratos**: Controle de todos os contratos
- **Gestão de Parceiros**: Aprovação e gestão de parceiros
- **Comissões**: Controle de pagamentos de comissões
- **Relatórios**: Análises completas do negócio

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **UI Framework**: Material-UI (MUI) v5
- **Roteamento**: React Router DOM v6
- **Gráficos**: Recharts
- **Formulários**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Datas**: Day.js
- **Ícones**: Material-UI Icons

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── admin/           # Componentes do dashboard admin
│   ├── client/          # Componentes do dashboard cliente  
│   ├── partner/         # Componentes do dashboard parceiro
│   ├── DashboardLayout.jsx
│   └── ProtectedRoute.jsx
├── contexts/            # Contextos React
│   └── AuthContext.jsx
├── pages/              # Páginas principais
│   ├── AdminDashboard.jsx
│   ├── ClientDashboard.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── PartnerDashboard.jsx
│   └── Register.jsx
├── services/           # Serviços e APIs
│   └── authService.js
├── App.jsx            # Componente principal
└── main.jsx          # Ponto de entrada
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- NPM ou Yarn

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar em Desenvolvimento
```bash
npm run dev
```
O projeto estará disponível em: `http://localhost:3000`

### 3. Build para Produção
```bash
npm run build
```

### 4. Preview da Build
```bash
npm run preview
```

## 🔧 Configuração do Backend

Este frontend está preparado para se conectar com uma API backend. Configure a URL da API no arquivo `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

### Endpoints Esperados pela API:

#### Autenticação
- `POST /api/auth/login`
- `POST /api/auth/register` 
- `GET /api/auth/validate`

#### Parceiros
- `GET /api/partners/profile`
- `GET /api/partners/indicacoes`
- `POST /api/partners/indicacoes`
- `GET /api/partners/comissoes`
- `GET /api/partners/link-unico`

#### Clientes
- `GET /api/clients/profile`
- `GET /api/clients/contratos`
- `GET /api/clients/contratos/:id`
- `GET /api/clients/contratos/:contratoId/arquivos/:arquivoId`

#### Admin
- `GET /api/admin/dashboard`
- `GET /api/admin/contratos`
- `GET /api/admin/comissoes`
- `GET /api/admin/indicacoes`
- `PATCH /api/admin/partners/:partnerId/approve`

## 🎨 Customização do Tema

O sistema utiliza um tema personalizado do Material-UI que pode ser modificado no arquivo `App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  // ... outras configurações
})
```

## 🔐 Sistema de Autenticação

### Roles de Usuário:
- **client**: Acesso ao dashboard do cliente
- **partner**: Acesso ao dashboard do parceiro  
- **admin**: Acesso ao dashboard administrativo

### Fluxo de Autenticação:
1. Login/Registro através das páginas dedicadas
2. Token JWT armazenado no localStorage
3. Redirecionamento automático baseado no role do usuário
4. Proteção de rotas com o componente `ProtectedRoute`

## 📊 Dados de Demonstração

O sistema utiliza dados mockados para demonstração. Para conectar com dados reais, substitua as simulações nos componentes pelos calls da API real.

### Usuários de Teste (mockados):
- **Cliente**: cliente@teste.com / 123456
- **Parceiro**: parceiro@teste.com / 123456
- **Admin**: admin@teste.com / 123456

## 🌐 Deploy

### Netlify/Vercel
1. Conecte o repositório
2. Configure as variáveis de ambiente
3. Deploy automático

### Servidor Próprio
1. Execute `npm run build`
2. Sirva a pasta `dist` com um servidor web

## 🎯 Próximos Passos para Desenvolvimento

1. **Backend**: Implementar API Node.js + Express + MySQL
2. **Autenticação**: Implementar JWT completo no backend
3. **Upload de Arquivos**: Sistema de upload e download de documentos
4. **Notificações**: Sistema de notificações em tempo real
5. **Relatórios**: Geração de PDFs para relatórios
6. **Testes**: Implementar testes unitários e de integração
7. **PWA**: Transformar em Progressive Web App
8. **SEO**: Otimizações para motores de busca

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do repositório GitHub.

---

**Desenvolvido seguindo as especificações do plano de requisitos fornecido para a PIAC Engenharia.**
