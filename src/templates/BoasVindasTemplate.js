import { BaseTemplate } from './BaseTemplate.js';

export class BoasVindasTemplate extends BaseTemplate {
  renderHeader(data) {
    return `
      <tr>
        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Bem-vindo! 🎉</h1>
        </td>
      </tr>
    `;
  }

  renderBody(data) {
    const { nome } = data;
    
    return `
      <tr>
        <td style="padding: 40px 30px;">
          <h2 style="color: #333; margin: 0 0 20px 0;">Olá, ${nome}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Ficamos muito felizes em ter você conosco! Seu cadastro foi realizado com sucesso.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
            Agora você já pode aproveitar todos os recursos da nossa plataforma.
          </p>
          
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
    `;
  }

  getFooterMessage() {
    return 'Se você não se cadastrou, ignore este email.';
  }
}