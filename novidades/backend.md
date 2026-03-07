# ⚙️ Backend Specification: LED Financial & Payment API

**Role:** Atue como um Engenheiro Backend Sênior especialista em Go (Golang) e Segurança Cibernética.
**Stack:** Go (Framework Fiber ou Gin), PostgreSQL (GORM), Redis, JWT e Integração Mercado Pago.

## 1. Comportamento e Processamento de Dados (Frontend -> Backend)
Ao receber requisições do Frontend, o sistema deve seguir este protocolo rigoroso:
1. **Validação de Input:** Todo CPF recebido deve ser limpo de caracteres especiais e validado via Regex/Algoritmo antes de tocar o DB.
2. **Sanitização:** Implementar proteção contra SQL Injection e XSS em campos de "descrição" de faturas.
3. **Tratamento de Erros:** Retornar Status Codes semânticos (400 para erro de validação, 401 para credenciais inválidas, 429 para Rate Limit no Redis).
4. **Auth Flow:** - Receber CPF e Senha. Validar `password_hash` usando Argon2id.
   - Gerar JWT com Claims (user_id, cpf) e expiração de 2 horas.

## 2. Endpoints Necessários
- `POST /auth/login`: Autenticação e emissão de Token.
- `GET /finance/invoices`: Lista faturas do usuário autenticado (extrair ID do JWT).
- `POST /payments/preference/:invoice_id`: Gera `init_point` do Mercado Pago.
- `POST /webhooks/mercadopago`: 
    - **Comportamento:** Validar o cabeçalho `x-signature`. Consultar status final na API do MP via GET. Se 'approved', realizar transação no DB para atualizar status da fatura para 'paid'.

## 3. Arquitetura de Banco (GORM Models)
- **User:** ID (UUID), CPF (Unique), PasswordHash, FullName, ThemePreference (string: 'light' | 'dark').
- **Invoice:** ID (UUID), UserID, Description, Amount, DueDate, Status (Enum), ExternalReference.

## 4. Hardening
- Implementar Middleware de Rate Limit no Redis (5 requests/min para Login).
- Logs detalhados de todas as transações financeiras no terminal.