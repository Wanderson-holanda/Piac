/**
 * Configuração ESLint para o projeto PIAC
 * 
 * Regras de linting para manter qualidade e consistência do código:
 * - Padrões ES6+ e React hooks
 * - Detecção de problemas comuns
 * - Formatação consistente
 */

export default {
  root: true,
  env: { 
    browser: true, 
    es2020: true,
    node: true 
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { 
    ecmaVersion: 'latest', 
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: { 
    react: { 
      version: '18.2' 
    } 
  },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Usando TypeScript para tipos
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  },
}
