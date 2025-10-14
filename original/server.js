// ==========================================
// ARQUIVO: server.js
// ==========================================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// ==========================================
// TEMPLATES DE EMAIL
// ==========================================

function templateBoasVindas(nome) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Bem-vindo! 🎉</h1>
                  </td>
                </tr>
                <!-- Conteúdo -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333; margin: 0 0 20px 0;">Olá, ${nome}!</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Ficamos muito felizes em ter você conosco! Seu cadastro foi realizado com sucesso.
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                      Agora você já pode aproveitar todos os recursos da nossa plataforma.
                    </p>
                    <!-- Botão -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="https://seusite.com.br/login" style="display: inline-block; padding: 14px 30px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                            Acessar Plataforma
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f8f8; padding: 20px 30px; border-top: 1px solid #eee;">
                    <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                      Se você não se cadastrou, ignore este email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function templateRecuperacaoSenha(token) {
  const linkRecuperacao = `https://seusite.com.br/resetar-senha?token=${token}`;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background-color: #ff6b6b; padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔒 Recuperação de Senha</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Você solicitou a recuperação de senha da sua conta.
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                      Clique no botão abaixo para criar uma nova senha:
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="${linkRecuperacao}" style="display: inline-block; padding: 14px 30px; background-color: #ff6b6b; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
                            Resetar Senha
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #999; font-size: 14px; margin: 30px 0 0 0;">
                      ⏱️ Este link expira em 1 hora.
                    </p>
                    <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">
                      Se você não solicitou esta recuperação, ignore este email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function templateNotificacao(titulo, mensagem) {
  // Converte quebras de linha em <br> e mantém parágrafos
  const mensagemFormatada = mensagem
    .split('\n')
    .map(linha => linha.trim())
    .filter(linha => linha.length > 0)
    .map(linha => `<p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">${linha}</p>`)
    .join('');
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333; margin: 0 0 20px 0;">📬 ${titulo}</h2>
                    <div>
                      ${mensagemFormatada}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// ==========================================
// ROTAS DA API
// ==========================================

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'Servidor de Email está funcionando! 📧',
    versao: '1.0.0'
  });
});

// Rota para enviar email de boas-vindas
app.post('/email/boas-vindas', async (req, res) => {
  try {
    const { nome, email } = req.body;

    // Validação
    if (!nome || !email) {
      return res.status(400).json({ 
        erro: 'Nome e email são obrigatórios' 
      });
    }

    // Envia o email
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: 'Bem-vindo ao nosso sistema! 🎉',
      html: templateBoasVindas(nome),
    });

    if (error) {
      console.error('Erro Resend:', error);
      return res.status(400).json({ erro: error.message });
    }

    res.json({ 
      sucesso: true, 
      mensagem: 'Email de boas-vindas enviado!',
      id: data.id 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ 
      erro: 'Erro ao enviar email',
      detalhes: error.message 
    });
  }
});

// Rota para enviar email de recuperação de senha
app.post('/email/recuperar-senha', async (req, res) => {
  try {
    const { email, name, code } = req.body;

    // Validação: agora espera email e code (não token)
    if (!email || !code) {
      console.error('❌ Faltam campos: email ou code');
      return res.status(400).json({ 
        erro: 'Email e código são obrigatórios' 
      });
    }

    console.log('📧 Enviando email de recuperação para:', email, 'com código:', code);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: '🔒 Recuperação de Senha - Carona Certa',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F1F8E9;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F1F8E9; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <tr>
                      <td style="background-color: #ff6b6b; padding: 40px 20px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔒 Recuperação de Senha</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="color: #333; margin: 0 0 20px 0;">Olá, ${name || 'usuário'}!</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                          Você solicitou a recuperação de senha da sua conta no <strong style="color: #7E57C2;">Carona Certa</strong>.
                        </p>
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                          Use o código abaixo para redefinir sua senha:
                        </p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                          <div style="display: inline-block; background-color: #F1F8E9; border: 2px dashed #7E57C2; border-radius: 8px; padding: 20px 40px;">
                            <span style="font-size: 32px; font-weight: bold; color: #7E57C2; letter-spacing: 8px;">${code}</span>
                          </div>
                        </div>
                        
                        <p style="color: #999; font-size: 14px; margin: 30px 0 10px 0; text-align: center;">
                          ⏱️ Este código expira em <strong>15 minutos</strong>.
                        </p>
                        <p style="color: #999; font-size: 14px; margin: 10px 0 0 0; text-align: center;">
                          Se você não solicitou esta recuperação, ignore este email.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="background-color: #F8F8F8; padding: 25px 30px; border-top: 1px solid #eee; text-align: center;">
                        <p style="color: #999; font-size: 12px; margin: 0;">
                          &copy; 2025 Carona Certa - Todos os direitos reservados
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('❌ Erro Resend:', error);
      return res.status(400).json({ erro: error.message });
    }

    console.log('✅ Email de recuperação enviado para:', email);
    res.json({ 
      sucesso: true, 
      mensagem: 'Email de recuperação enviado!',
      id: data.id 
    });
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    res.status(500).json({ 
      erro: 'Erro ao enviar email',
      detalhes: error.message 
    });
  }
});

// Rota para enviar notificação customizada
app.post('/email/notificacao', async (req, res) => {
  try {
    const { email, titulo, mensagem } = req.body;

    if (!email || !titulo || !mensagem) {
      return res.status(400).json({ 
        erro: 'Email, título e mensagem são obrigatórios' 
      });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: titulo,
      html: templateNotificacao(titulo, mensagem),
    });

    if (error) {
      console.error('Erro Resend:', error);
      return res.status(400).json({ erro: error.message });
    }

    res.json({ 
      sucesso: true, 
      mensagem: 'Notificação enviada!',
      id: data.id 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ 
      erro: 'Erro ao enviar email',
      detalhes: error.message 
    });
  }
});

// Rota para enviar email com anexo
app.post('/email/com-anexo', async (req, res) => {
  try {
    const { email, assunto, mensagem, anexoBase64, nomeArquivo } = req.body;

    if (!email || !assunto || !mensagem) {
      return res.status(400).json({ 
        erro: 'Email, assunto e mensagem são obrigatórios' 
      });
    }

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: assunto,
      html: templateNotificacao(assunto, mensagem),
    };

    // Adiciona anexo se fornecido
    if (anexoBase64 && nomeArquivo) {
      emailData.attachments = [{
        filename: nomeArquivo,
        content: anexoBase64,
      }];
    }

    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error('Erro Resend:', error);
      return res.status(400).json({ erro: error.message });
    }

    res.json({ 
      sucesso: true, 
      mensagem: 'Email com anexo enviado!',
      id: data.id 
    });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ 
      erro: 'Erro ao enviar email',
      detalhes: error.message 
    });
  }
});

// Template para e-mail de verificação
function templateVerificacao(nome, link) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F1F8E9;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F1F8E9; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #7E57C2 0%, #6A47A8 100%); padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px;">🚗 Carona Certa</h1>
                  </td>
                </tr>
                <!-- Conteúdo -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #333; margin: 0 0 20px 0;">Olá, ${nome || 'usuário'}! 👋</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Bem-vindo ao <strong style="color: #7E57C2;">Carona Certa</strong>! 🎉
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                      Você está a apenas <strong>um passo</strong> de fazer parte da nossa comunidade de caronas colaborativas.
                    </p>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                      Para ativar sua conta e começar a usar o aplicativo, clique no botão abaixo:
                    </p>
                    <!-- Botão -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <a href="${link}" style="display: inline-block; padding: 16px 40px; background-color: #7E57C2; color: #ffffff; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; box-shadow: 0 4px 12px rgba(126, 87, 194, 0.3);">
                            ✅ Confirmar E-mail
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                      Após a confirmação, você poderá fazer login e aproveitar todos os recursos do app! 🚀
                    </p>
                    <!-- Link alternativo -->
                    <div style="margin-top: 30px; padding: 20px; background-color: #F1F8E9; border-radius: 8px;">
                      <p style="color: #999; font-size: 13px; margin: 0 0 10px 0; text-align: center;">
                        Se o botão não funcionar, copie e cole este link no navegador:
                      </p>
                      <p style="color: #7E57C2; font-size: 12px; word-break: break-all; margin: 0; text-align: center;">
                        ${link}
                      </p>
                    </div>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background-color: #F8F8F8; padding: 25px 30px; border-top: 1px solid #eee; text-align: center;">
                    <p style="color: #999; font-size: 13px; margin: 0 0 10px 0;">
                      Se você não criou esta conta, ignore este e-mail.
                    </p>
                    <p style="color: #999; font-size: 12px; margin: 0;">
                      &copy; 2025 Carona Certa - Todos os direitos reservados
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// POST /email/verificacao - Envia e-mail de verificação
app.post('/email/verificacao', async (req, res) => {
  try {
    const { email, link, name } = req.body;

    // Validação
    if (!email || !link) {
      return res.status(400).json({ 
        erro: 'Email e link são obrigatórios' 
      });
    }

    // Envia o email usando o template
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: [email],
      subject: '✅ Confirme seu e-mail - Carona Certa',
      html: templateVerificacao(name, link),
    });

    if (error) {
      console.error('❌ Erro Resend:', error);
      return res.status(400).json({ erro: error.message });
    }

    console.log('✅ E-mail de verificação enviado para:', email);
    res.json({ 
      sucesso: true,
      mensagem: 'E-mail de verificação enviado com sucesso',
      id: data.id 
    });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    res.status(500).json({ 
      erro: 'Erro ao enviar e-mail de verificação',
      detalhes: error.message 
    });
  }
});

// Tratamento de erro 404
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📧 Servidor de email configurado com Resend`);
  console.log(`\nRotas disponíveis:`);
  console.log(`  POST /email/boas-vindas`);
  console.log(`  POST /email/recuperar-senha`);
  console.log(`  POST /email/notificacao`);
  console.log(`  POST /email/com-anexo`);
});