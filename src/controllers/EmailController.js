import { EmailService } from '../services/EmailService.js';
import { BoasVindasTemplate } from '../templates/BoasVindasTemplate.js';
import { RecuperacaoSenhaTemplate } from '../templates/RecuperacaoSenhaTemplate.js';
import { VerificacaoTemplate } from '../templates/VerificacaoTemplate.js';
import { NotificacaoTemplate } from '../templates/NotificacaoTemplate.js';

/**
 * Controller seguindo princípio SRP
 * Responsável por orquestrar o envio de diferentes tipos de email
 */
export class EmailController {
  constructor() {
    this.emailService = new EmailService();
  }

  /**
   * Envia email de boas-vindas
   */
  async enviarBoasVindas(req, res, next) {
    try {
      const { nome, email } = req.body;

      if (!nome || !email) {
        return res.status(400).json({
          erro: 'Nome e email são obrigatórios',
        });
      }

      const template = new BoasVindasTemplate();
      const result = await this.emailService.sendWithTemplate(
        template,
        { nome },
        email,
        'Bem-vindo ao nosso sistema! 🎉'
      );

      res.json({
        sucesso: true,
        mensagem: 'Email de boas-vindas enviado!',
        id: result.id,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Envia email de recuperação de senha
   */
  async enviarRecuperacaoSenha(req, res, next) {
    try {
      const { email, name, code } = req.body;

      if (!email || !code) {
        console.error('❌ Faltam campos: email ou code');
        return res.status(400).json({
          erro: 'Email e código são obrigatórios',
        });
      }

      console.log('📧 Enviando email de recuperação para:', email, 'com código:', code);

      const template = new RecuperacaoSenhaTemplate();
      const result = await this.emailService.sendWithTemplate(
        template,
        { name, code },
        email,
        '🔒 Recuperação de Senha - Carona Certa'
      );

      console.log('✅ Email de recuperação enviado para:', email);
      res.json({
        sucesso: true,
        mensagem: 'Email de recuperação enviado!',
        id: result.id,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Envia email de verificação
   */
  async enviarVerificacao(req, res, next) {
    try {
      const { email, link, name } = req.body;

      if (!email || !link) {
        return res.status(400).json({
          erro: 'Email e link são obrigatórios',
        });
      }

      const template = new VerificacaoTemplate();
      const result = await this.emailService.sendWithTemplate(
        template,
        { name, link },
        email,
        '✅ Confirme seu e-mail - Carona Certa'
      );

      console.log('✅ E-mail de verificação enviado para:', email);
      res.json({
        sucesso: true,
        mensagem: 'E-mail de verificação enviado com sucesso',
        id: result.id,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Envia notificação customizada
   */
  async enviarNotificacao(req, res, next) {
    try {
      const { email, titulo, mensagem } = req.body;

      if (!email || !titulo || !mensagem) {
        return res.status(400).json({
          erro: 'Email, título e mensagem são obrigatórios',
        });
      }

      const template = new NotificacaoTemplate();
      const result = await this.emailService.sendWithTemplate(
        template,
        { titulo, mensagem },
        email,
        titulo
      );

      res.json({
        sucesso: true,
        mensagem: 'Notificação enviada!',
        id: result.id,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Envia email com anexo
   */
  async enviarComAnexo(req, res, next) {
    try {
      const { email, assunto, mensagem, anexoBase64, nomeArquivo } = req.body;

      if (!email || !assunto || !mensagem) {
        return res.status(400).json({
          erro: 'Email, assunto e mensagem são obrigatórios',
        });
      }

      const template = new NotificacaoTemplate();
      const html = template.render({ titulo: assunto, mensagem });

      const attachments = [];
      if (anexoBase64 && nomeArquivo) {
        attachments.push({
          filename: nomeArquivo,
          content: anexoBase64,
        });
      }

      const result = await this.emailService.sendEmail({
        to: email,
        subject: assunto,
        html,
        attachments,
      });

      res.json({
        sucesso: true,
        mensagem: 'Email com anexo enviado!',
        id: result.id,
      });
    } catch (error) {
      next(error);
    }
  }
}