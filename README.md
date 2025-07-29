# 🏗️ PIAC - Sistema de Indicações e Dashboard

Sistema web moderno para empresa de engenharia, focado em **gestão de indicações de parceiros** e **dashboard de clientes**, com interface responsiva e sistema de autenticação baseado em roles.

## 🎯 **Visão Geral**

O PIAC conecta três tipos de usuários:
- **👥 Parceiros** - Cadastram-se, indicam clientes e ganham comissões
- **👤 Clientes** - Visualizam contratos ativos, documentos e projetos  
- **👨‍💼 Administradores** - Controlam todo o sistema com dashboards analíticos

### **Principais Funcionalidades:**
- 📊 **Dashboards informativos** com métricas em tempo real
- 🔗 **Sistema de indicações** com links únicos para parceiros
- 💰 **Controle de comissões** automatizado e transparente
- 📋 **Gestão de contratos** com documentos e status
- 📈 **Relatórios analíticos** com gráficos interativos
- 🔐 **Autenticação segura** baseada em roles

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- ⚛️ **React 18** com Vite
- 🎨 **Material-UI v5** (design system)
- 🛣️ **React Router v6** (navegação)
- 📊 **Recharts** (gráficos interativos)
- 🎯 **Context API** (gerenciamento de estado)
- 📝 **React Hook Form + Yup** (formulários e validação)

### **Desenvolvimento**
- 🔍 **ESLint** (qualidade de código)
- 🔄 **Hot Module Replacement** (desenvolvimento rápido)
- 📝 **Terminal Logger** (sistema de logs personalizado)

---

## 🚀 **Como Executar**

### **Pré-requisitos:**
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### **Instalação e Execução:**
```bash
# Clone o repositório
git clone https://github.com/Wanderson-holanda/Piac.git

# Entre na pasta do projeto
cd Piac

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### **Acesso:**
```
🌐 Aplicação: http://localhost:3000
📊 Logs: Visíveis no terminal do VS Code
```

---

## 🔐 **Credenciais de Teste**

Use estas credenciais para testar o sistema:

| Perfil | Email | Senha |
|--------|-------|--------|
| 👤 **Cliente** | `cliente@teste.com` | `123456` |
| 👥 **Parceiro** | `parceiro@teste.com` | `123456` |
| 👨‍💼 **Admin** | `admin@teste.com` | `123456` |

---

## 📱 **Funcionalidades por Perfil**

### **💼 Dashboard Parceiro**
- ✅ Visão geral com KPIs e métricas
- ✅ Indicações realizadas e status
- ✅ Controle de comissões
- ✅ Gráficos de performance
- ✅ Metas mensais

### **👤 Dashboard Cliente**
- ✅ Contratos ativos
- ✅ Documentos e downloads
- ✅ Acompanhamento de projetos
- ✅ Histórico de contratos

### **👨‍💼 Dashboard Admin**
- ✅ Overview geral do sistema
- ✅ Gestão de usuários
- ✅ Administração de contratos
- ✅ Controle de comissões
- ✅ Relatórios avançados

---

## 📂 **Estrutura do Projeto**

```
src/
├── components/           
│   ├── common/          # Componentes reutilizáveis (StatsCard, etc.)
│   ├── partner/         # Componentes específicos do parceiro
│   ├── client/          # Componentes específicos do cliente
│   └── admin/           # Componentes específicos do admin
├── contexts/            
│   └── AuthContext.jsx  # Gerenciamento de autenticação
├── pages/               
│   └── Login.jsx        # Página de autenticação
├── services/            
│   └── terminalLogger.js # Sistema de logs personalizado
└── App.jsx             # Componente principal
```

---

## 🎨 **Design System**

### **Características:**
- 🎨 **Material-UI v5** como base
- 📱 **Mobile-first** e totalmente responsivo
- 🎯 **UX moderno** com glassmorphism e animações
- 🌈 **Tema personalizado** com cores da marca
- ♿ **Acessibilidade** implementada

### **Componentes Personalizados:**
- 📊 **StatsCard** - Cards de métricas com indicadores de tendência
- 🎛️ **DashboardLayout** - Layout base com sidebar animada
- 🔐 **ProtectedRoute** - Rotas protegidas por perfil

---

## 🔧 **Scripts Disponíveis**

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção  
npm run preview      # Preview do build
npm run lint         # Verificação de código
```

---

## 📊 **Sistema de Logs**

O projeto inclui um sistema avançado de logs com categorias coloridas:

- 🔵 **INFO** - Informações gerais
- 🟢 **SUCCESS** - Operações bem-sucedidas
- 🟡 **WARN** - Avisos importantes
- 🔴 **ERROR** - Erros e exceções
- 🟣 **AUTH** - Autenticação e autorização
- 🔷 **ROUTE** - Navegação entre páginas

---

## 📈 **Status do Projeto**

### **✅ Implementado:**
- ✅ Interface completa com UX/UI moderno
- ✅ Sistema de autenticação mockado
- ✅ Dashboards para todos os perfis
- ✅ Componentes reutilizáveis
- ✅ Responsividade total
- ✅ Sistema de logs integrado

### **🔄 Próximos Passos:**
- 🔄 Integração com backend (API REST)
- 🔄 Banco de dados real
- 🔄 Upload de documentos
- 🔄 Sistema de notificações
- � Testes automatizados

---

## 🤝 **Contribuição**

O projeto segue boas práticas de desenvolvimento:
- **Código limpo** e bem documentado
- **Componentização** para máxima reutilização
- **Performance** otimizada
- **Acessibilidade** implementada

---

**Sistema pronto para integração com backend! 🚀**
