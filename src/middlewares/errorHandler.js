/**
 * Middleware de tratamento de erros centralizado
 */
export const errorHandler = (err, req, res, next) => {
  console.error('❌ Erro capturado:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({
    erro: message,
    detalhes: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

/**
 * Middleware para rotas não encontradas
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    path: req.originalUrl,
  });
};