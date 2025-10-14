# 📧 Servidor de Email - Carona Certa

Servidor de envio de emails utilizando Resend, refatorado seguindo princípios SOLID e boas práticas.

## 🏗️ Arquitetura

```
servidor-email/
├── src/
│   ├── config/           # Configurações da aplicação
│   ├── services/         # Lógica de negócio
│   ├── templates/        # Templates de email (Template Method Pattern)
│   ├── controllers/      # Controladores de rotas
│   ├── routes/          # Definição de rotas
│   ├── middlewares/     # Middlewares (error handling, etc)
│   └── app.js           # Configuração do Express
├── server.js            # Ponto de entrada
├── .env                 # Variáveis de ambiente
└── package.json
```

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais
```

## ⚙️ Configuração (.env)

```env
RESEND_API_KEY=sua_chave_aqui
EMAIL_FROM=Carona Certa<contato@caronacerta.com.br>
PORT=3000
NODE_ENV=development
```

## 🎯 Como Usar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📡 Endpoints

### Health Check
```bash
GET /
GET /health
```

### Enviar Email de Boas-Vindas
```bash
POST /email/boas-vindas
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@exemplo.com"
}
```

### Enviar Email de Verificação
```bash
POST /email/verificacao
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "name": "João Silva",
  "link": "https://app.com/verify?token=abc123"
}
```

### Enviar Email de Recuperação de Senha
```bash
POST /email/recuperar-senha
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "name": "João Silva",
  "code": "123456"
}
```

### Enviar Notificação
```bash
POST /email/notificacao
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "titulo": "Nova Atualização",
  "mensagem": "Sua conta foi atualizada com sucesso."
}
```

### Enviar Email com Anexo
```bash
POST /email/com-anexo
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "assunto": "Documento Importante",
  "mensagem": "Segue anexo o documento solicitado.",
  "anexoBase64": "base64_do_arquivo",
  "nomeArquivo": "documento.pdf"
}
```

## 🎨 Princípios SOLID Aplicados

- **SRP**: Cada classe tem uma única responsabilidade
- **OCP**: Templates extensíveis sem modificar código base
- **LSP**: Templates podem ser substituídos entre si
- **ISP**: Interfaces específicas para cada necessidade
- **DIP**: Dependências abstraídas e injetadas

## 🔧 Extensibilidade

### Adicionar Novo Template

1. Crie novo arquivo em `src/templates/`:
```javascript
import { BaseTemplate } from './BaseTemplate.js';

export class MeuNovoTemplate extends BaseTemplate {
  renderHeader(data) {
    return `<tr>...</tr>`;
  }

  renderBody(data) {
    return `<tr>...</tr>`;
  }
}
```

2. Adicione método no Controller:
```javascript
async enviarMeuEmail(req, res, next) {
  const template = new MeuNovoTemplate();
  // ...
}
```

3. Adicione rota em `email.routes.js`

## 📝 Logs

O servidor registra automaticamente:
- ✅ Emails enviados com sucesso
- ❌ Erros no envio
- 📨 Requisições recebidas (modo dev)

## 🐛 Tratamento de Erros

Todos os erros são capturados e tratados centralizadamente em `errorHandler.js`.

## 🧪 Testando

```bash
# Teste básico
curl http://localhost:3000/health

# Teste envio de email
curl -X POST http://localhost:3000/email/boas-vindas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@exemplo.com"}'
```

## 📦 Dependências

- **express**: Framework web
- **resend**: Serviço de envio de emails
- **dotenv**: Gerenciamento de variáveis de ambiente
- **cors**: Habilitar CORS

## 🔒 Segurança

- Validação de inputs
- Tratamento de erros sem expor stack traces em produção
- CORS configurado
- Variáveis sensíveis em .env

## 📄 Licença

MIT