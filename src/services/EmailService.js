import { Resend } from 'resend';
import { emailConfig } from '../config/email.config.js'; 

/**
 * Serviço de envio de emails seguindo princípio SRP (Single Responsibility)
 * Responsável apenas por enviar emails usando o Resend
 */
export class EmailService {
  constructor() {
    this.resend = new Resend(emailConfig.apiKey);
    this.from = emailConfig.from;
  }

  /**
   * Envia um email usando template
   * @param {string} to - Email do destinatário
   * @param {string} subject - Assunto do email
   * @param {string} html - Conteúdo HTML do email
   * @param {Array} attachments - Anexos opcionais
   * @returns {Promise} Resultado do envio
   */
  async sendEmail({ to, subject, html, attachments = [] }) {
    try {
      console.log(`📧 Enviando email para: ${to}`);
      
      const emailData = {
        from: this.from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      };

      if (attachments.length > 0) {
        emailData.attachments = attachments;
      }

      const { data, error } = await this.resend.emails.send(emailData);

      if (error) {
        console.error('❌ Erro Resend:', error);
        throw new Error(error.message || 'Erro ao enviar email');
      }

      console.log(`✅ Email enviado com sucesso para: ${to}`);
      return {
        success: true,
        message: 'Email enviado com sucesso',
        id: data.id,
      };

    } catch (error) {
      console.error(`❌ Falha ao enviar email para ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Envia email com template específico
   * @param {Object} template - Instância do template
   * @param {Object} data - Dados para o template
   * @param {string} to - Email do destinatário
   * @param {string} subject - Assunto do email
   * @returns {Promise} Resultado do envio
   */
  async sendWithTemplate(template, data, to, subject) {
    const html = template.render(data);
    return await this.sendEmail({ to, subject, html });
  }
}