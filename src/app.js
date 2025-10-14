import express from 'express';
import cors from 'cors';
import emailRoutes from './routes/email.routes.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

/**
 * Configuração da aplicação Express
 * Seguindo princípio de Separação de Responsabilidades
 */
export const createApp = () => {
  const app = express();

  // Middlewares globais
  app.use(cors());
  app.use(express.json());

  // Log de requisições em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(`📨 ${req.method} ${req.path}`);
      next();
    });
  }

  // Rota de teste/health check
  app.get('/', (req, res) => {
    res.json({
      mensagem: 'Servidor de Email está funcionando! 📧',
      versao: '2.0.0',
      status: 'healthy',
    });
  });

  app.get('/health', (req, res) => {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  });

  // Rotas de email
  app.use('/email', emailRoutes);

  // Tratamento de erros (deve vir por último)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};