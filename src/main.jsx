/**
 * main.jsx - Ponto de entrada da aplicação React
 * 
 * Responsabilidades:
 * - Inicialização da aplicação React
 * - Configuração do React Router (BrowserRouter)
 * - Montagem do componente App no DOM
 * - Modo StrictMode para desenvolvimento
 * 
 * Estrutura:
 * - React.StrictMode: Ativa verificações extras em desenvolvimento
 * - BrowserRouter: Habilita roteamento do lado do cliente
 * - App: Componente principal da aplicação
 * 
 * O elemento 'root' é definido no index.html
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Cria root React 18 e renderiza a aplicação
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
