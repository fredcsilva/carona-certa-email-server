FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar código
COPY . .

# Expor porta
EXPOSE 3000

# Usar variáveis de ambiente
ENV NODE_ENV=production

# Comando de inicialização
CMD ["node", "server.js"]