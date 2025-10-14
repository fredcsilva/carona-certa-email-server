import { createApp } from './src/app.js';
import { emailConfig, validateConfig } from './src/config/email.config.js';

/**
 * Inicialização do servidor
 * Ponto de entrada da aplicação
 */
const startServer = async () => {
  try {
    // Valida configurações
    validateConfig();

    // Cria aplicação
    const app = createApp();

    // Inicia servidor
    const server = app.listen(emailConfig.port, () => {
      console.log('🚀 ========================================');
      console.log(`📧 Servidor de Email iniciado`);
      console.log(`🌐 Porta: ${emailConfig.port}`);
      console.log(`📬 Email from: ${emailConfig.from}`);
      console.log(`🔧 Ambiente: ${emailConfig.nodeEnv}`); // ← Use emailConfig.nodeEnv
      console.log('🚀 ========================================');
      console.log('\n📋 Rotas disponíveis:');
      console.log('  GET  /');
      console.log('  GET  /health');
      console.log('  POST /email/boas-vindas');
      console.log('  POST /email/recuperar-senha');
      console.log('  POST /email/verificacao');
      console.log('  POST /email/notificacao');
      console.log('  POST /email/com-anexo');
      console.log('\n✅ Servidor pronto para receber requisições!\n');
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n⚠️  ${signal} recebido. Encerrando servidor gracefully...`);
      server.close(() => {
        console.log('✅ Servidor encerrado com sucesso');
        process.exit(0);
      });

      // Forçar encerramento após 10 segundos
      setTimeout(() => {
        console.error('❌ Forçando encerramento após timeout');
        process.exit(1);
      }, 10000);
    };

    // Sinais de encerramento
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Tratamento de erros não capturados
    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Unhandled Rejection at:', promise);
      console.error('❌ Reason:', reason);
      process.exit(1);
    });

    process.on('uncaughtException', (error) => {
      console.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error.message);
    process.exit(1);
  }
};

startServer();