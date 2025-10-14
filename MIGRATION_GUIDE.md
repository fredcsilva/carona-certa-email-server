# 📝 Guia de Migração - Servidor de Email

## 🔄 Passos para Migração

### 1️⃣ **Backup do Código Atual**
```bash
# Faça backup do server.js atual
cp server.js server.js.backup
```

### 2️⃣ **Criar Nova Estrutura de Pastas**
```bash
mkdir -p src/config
mkdir -p src/services
mkdir -p src/templates
mkdir -p src/controllers
mkdir -p src/routes
mkdir -p src/middlewares
```

### 3️⃣ **Copiar Arquivos para Nova Estrutura**

Crie os seguintes arquivos na nova estrutura:

**Configuração:**
- `src/config/email.config.js`

**Templates:**
- `src/templates/BaseTemplate.js`
- `src/templates/BoasVindasTemplate.js`
- `src/templates/RecuperacaoSenhaTemplate.js`
- `src/templates/VerificacaoTemplate.js`
- `src/templates/NotificacaoTemplate.js`

**Services:**
- `src/services/EmailService.js`

**Controllers:**
- `src/controllers/EmailController.js`

**Routes:**
- `src/routes/email.routes.js`

**Middlewares:**
- `src/middlewares/errorHandler.js`

**App:**
- `src/app.js`

**Raiz:**
- `server.js` (novo)
- `package.json` (atualizar)
- `README.md`

### 4️⃣ **Atualizar package.json**
```bash
# Atualizar versão e scripts
npm install
```

### 5️⃣ **Testar Servidor**
```bash
# Iniciar em modo desenvolvimento
npm run dev

# Testar health check
curl http://localhost:3000/health

# Testar envio de email
curl -X POST http://localhost:3000/email/verificacao \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "name": "Teste",
    "link": "https://exemplo.com/verify"
  }'
```

### 6️⃣ **Verificar Backend Java**

O backend Java **NÃO precisa de mudanças**! As rotas continuam as mesmas:

✅ `POST /email/verificacao` - Funciona
✅ `POST /email/recuperar-senha` - Funciona
✅ `POST /email/boas-vindas` - Funciona

### 7️⃣ **Remover Arquivo Antigo (Opcional)**
```bash
# Após confirmar que tudo funciona
rm server.js.backup
```

---

## ✅ Checklist de Migração

- [ ] Backup do código atual criado
- [ ] Nova estrutura de pastas criada
- [ ] Todos os arquivos copiados
- [ ] package.json atualizado
- [ ] `npm install` executado
- [ ] Servidor inicia sem erros
- [ ] Health check responde OK
- [ ] Email de teste enviado com sucesso
- [ ] Backend Java continua funcionando
- [ ] Arquivo antigo removido

---

## 🆘 Troubleshooting

### Erro: "Cannot find module"
```bash
# Verifique se todas as pastas foram criadas
# Verifique se os arquivos têm extensão .js
# Verifique se package.json tem "type": "module"
```

### Erro: "RESEND_API_KEY não encontrada"
```bash
# Verifique se o arquivo .env existe
# Verifique se as variáveis estão corretas
cat .env
```

### Servidor não inicia
```bash
# Verifique logs de erro
# Verifique se a porta 3000 está livre
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

---

## 🎯 Benefícios da Nova Arquitetura

✅ **Código organizado e modular**
✅ **Fácil de testar**
✅ **Fácil de manter**
✅ **Fácil de estender**
✅ **Segue boas práticas**
✅ **Pronto para crescer**

## 🚀 Próximos Passos

Após migração bem-sucedida:
1. Adicionar testes unitários
2. Adicionar CI/CD
3. Dockerizar aplicação
4. Adicionar monitoring/logging
5. Implementar rate limiting