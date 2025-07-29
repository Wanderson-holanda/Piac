# 🏗️ PIAC - Sistema de Indicações e Dashboard

Sistema web completo para empresa de engenharia, focado em **gestão de indicações de parceiros** e **dashboard de clientes**, com arquitetura moderna e design responsivo.

## 🎯 **Visão Geral**

O PIAC é uma plataforma que conecta:
- **👥 Parceiros** - Cadastram-se, indicam clientes e ganham comissões
- **👤 Clientes** - Visualizam contratos ativos, documentos e projetos  
- **👨‍💼 Administradores** - Controlam todo o sistema com dashboards analíticos

### **Principais Funcionalidades:**
- 📊 **Dashboards informativos** com métricas em tempo real
- 🔗 **Sistema de indicações** com links únicos para parceiros
- 💰 **Controle de comissões** automatizado e transparente
- 📋 **Gestão de contratos** com documentos e status
- 📈 **Relatórios analíticos** com gráficos interativos
- 🔐 **Autenticação segura** baseada em roles (JWT)

---

## 🛠️ **Stack Tecnológica**

### **Frontend (Implementado)**
```json
{
  "core": ["React 18", "TypeScript Ready", "Vite 5.4"],
  "ui": ["Material-UI v5", "Inter Font", "Recharts"],
  "routing": ["React Router v6", "Protected Routes"],
  "state": ["Context API", "React Hooks"],
  "forms": ["React Hook Form", "Yup Validation"],
  "http": ["Axios", "RESTful Client"],
  "utils": ["Day.js", "Lodash"],
  "dev": ["Terminal Logger", "HMR", "ESLint"]
}
```

### **Backend (Em Desenvolvimento)**
```json
{
  "server": ["Node.js", "Express", "Cors"],
  "database": ["MySQL", "Sequelize ORM"],
  "auth": ["JWT", "Passport.js", "bcrypt"],
  "security": ["Helmet", "Rate Limiting"],
  "upload": ["Multer", "File Validation"],
  "email": ["Nodemailer", "Templates"]
}
```

---

## 🏛️ **Arquitetura do Sistema**

```
┌─────────────────┐    ├─────────────────┤    ┌─────────────────┐
│   REACT APP     │◄──►│   EXPRESS API   │◄──►│   MYSQL DB      │
│  (Frontend)     │    │   (Backend)     │    │  (Database)     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • React Router  │    │ • JWT Auth      │    │ • Users         │
│ • Material-UI   │    │ • REST Routes   │    │ • Contracts     │
│ • Context API   │    │ • Middleware    │    │ • Indications   │
│ • Axios Client  │    │ • Sequelize ORM │    │ • Commissions   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🎨 **Design System Material-UI**

### **Cores da Marca:**
- 🔵 **Primary**: `#1976d2` (Azul PIAC)
- 🌸 **Secondary**: `#dc004e` (Rosa destaque)
- ⚪ **Background**: `#f5f5f5` (Cinza claro)

### **Tipografia:**
- **Fonte**: Inter (Google Fonts)
- **Títulos**: Weight 600 (Semi-bold)
- **Corpo**: Weight 400 (Regular)

### **Componentes Customizados:**
- Cards com bordas arredondadas (12px)
- Botões sem text-transform
- Tema responsivo mobile-first

---

## 📱 **Funcionalidades por Área**

### **💼 Dashboard Parceiro**
```jsx
✅ Visão Geral      // KPIs e métricas principais
✅ Indicações       // Formulário e histórico
✅ Comissões        // Controle de ganhos
✅ Link Único       // Geração automática
✅ Relatórios       // Gráficos interativos
```

### **👤 Dashboard Cliente**
```jsx
✅ Visão Geral      // Contratos ativos
✅ Contratos        // Detalhes e documentos
✅ Documentos       // Downloads de arquivos
✅ Projetos         // Acompanhamento status
✅ Histórico        // Contratos finalizados
```

### **👨‍💼 Dashboard Admin**
```jsx
✅ Overview         // KPIs do sistema
✅ Usuários         // Gestão clientes/parceiros
✅ Contratos        // Administração geral
✅ Comissões        // Controle pagamentos
✅ Relatórios       // Analytics avançados
```

---

## 🚀 **Como Rodar o Projeto**

### **Pré-requisitos:**
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### **Instalação:**
```bash
# Clone o repositório
git clone https://github.com/Wanderson-holanda/Piac.git

# Entre na pasta
cd Piac

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Acessar:**
```
🌐 Frontend: http://localhost:3002
📊 Terminal Logs: Visíveis no VS Code
```

---

## 🔐 **Usuários de Teste**

Para testar o sistema, use estas credenciais:

```javascript
// Cliente
Email: cliente@teste.com
Senha: 123456

// Parceiro  
Email: parceiro@teste.com
Senha: 123456

// Administrador
Email: admin@teste.com
Senha: 123456
```

---

## 📂 **Estrutura do Projeto**

```
src/
├── components/           # Componentes reutilizáveis
│   ├── common/          # Botões, inputs, cards
│   ├── partner/         # Específicos do parceiro
│   ├── client/          # Específicos do cliente
│   └── admin/           # Específicos do admin
├── contexts/            # Context API
│   └── AuthContext.jsx  # Autenticação global
├── pages/               # Páginas principais
│   ├── Landing.jsx      # Página inicial
│   ├── Login.jsx        # Autenticação
│   └── *Dashboard.jsx   # Dashboards por role
├── services/            # APIs e utilitários
│   ├── authService.js   # Serviços de auth
│   └── terminalLogger.js # Logs development
└── App.jsx             # Componente raiz
```

---

## 🔧 **Scripts Disponíveis**

```bash
npm run dev          # Servidor desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting do código
```

---

## 📊 **Sistema de Logs**

O projeto inclui um sistema avançado de logs que exibe informações coloridas diretamente no terminal do VS Code:

```javascript
// Tipos de log disponíveis
terminalLogger.info('Informação geral')
terminalLogger.auth('Login realizado', { user })
terminalLogger.error('Erro na API', { error })
terminalLogger.route('Navegação', { from, to })
```

### **Categorias:**
- 🔵 **INFO** - Informações gerais
- 🟢 **SUCCESS** - Operações bem-sucedidas  
- 🟡 **WARN** - Avisos importantes
- 🔴 **ERROR** - Erros e exceções
- 🟣 **AUTH** - Autenticação
- 🔷 **API** - Requisições HTTP

---

## 🎯 **Status do Projeto**

### **✅ Concluído (Frontend):**
- ✅ Arquitetura React moderna
- ✅ Sistema de autenticação mockado
- ✅ Dashboards completos (3 perfis)
- ✅ Design system Material-UI
- ✅ Responsividade mobile-first
- ✅ Sistema de logs avançado
- ✅ Documentação completa

### **🔄 Em Desenvolvimento (Backend):**
- 🔄 API REST com Express
- 🔄 Banco MySQL com Sequelize
- 🔄 Autenticação JWT real
- 🔄 Upload de documentos
- 🔄 Sistema de notificações

---

## 📝 **Próximos Passos**

1. **Backend Integration** - Conectar com API real
2. **File Upload** - Sistema de documentos
3. **PWA** - Progressive Web App
4. **Testing** - Testes automatizados
5. **CI/CD** - Deploy automatizado

---

## 🤝 **Contribuição**

Este projeto segue as melhores práticas de desenvolvimento:

- **Código limpo** e bem documentado
- **Componentização** máxima para reutilização
- **Acessibilidade** WCAG compliant
- **Performance** otimizada
- **Segurança** frontend implementada

---

## 📄 **Documentação Adicional**

- 📋 [**ARQUITETURA_COMPLETA.md**](./ARQUITETURA_COMPLETA.md) - Visão técnica detalhada
- 👨‍💻 [**DEVELOPER.md**](./DEVELOPER.md) - Guia para desenvolvedores
- 🎨 [**Design System**](./src/theme/) - Configurações de tema

---

## 📞 **Contato**

**Desenvolvido para PIAC Engenharia**
- 🌐 Website: [Em desenvolvimento]
- 📧 Email: [contato@piac.com]
- 🏢 Empresa: PIAC Engenharia

---

**Frontend pronto para integração com backend! 🚀**
