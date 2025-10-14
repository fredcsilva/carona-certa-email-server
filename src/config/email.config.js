import dotenv from 'dotenv';

dotenv.config();

export const emailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development', // ← Adicione esta linha
};

export const validateConfig = () => {
  if (!emailConfig.apiKey) {
    throw new Error('RESEND_API_KEY não está configurada no arquivo .env');
  }
  if (!emailConfig.from) {
    throw new Error('EMAIL_FROM não está configurada no arquivo .env');
  }

  // Validação opcional: garantir que NODE_ENV seja válido
  const validEnvs = ['development', 'production', 'test'];
  if (!validEnvs.includes(emailConfig.nodeEnv)) {
    console.warn(`⚠️ NODE_ENV="${emailConfig.nodeEnv}" não é válido. Use: ${validEnvs.join(', ')}`);
  }
};