import { BaseTemplate } from './BaseTemplate.js';

export class VerificacaoTemplate extends BaseTemplate {
  renderHeader(data) {
    return `
      <tr>
        <td style="background: linear-gradient(135deg, #7E57C2 0%, #6A47A8 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 32px;">🚗 Carona Certa</h1>
        </td>
      </tr>
    `;
  }

  renderBody(data) {
    const { name, link } = data;
    
    return `
      <tr>
        <td style="padding: 40px 30px;">
          <h2 style="color: #333; margin: 0 0 20px 0;">Olá, ${name || 'usuário'}! 👋</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Bem-vindo ao <strong style="color: #7E57C2;">Carona Certa</strong>! 🎉
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
            Você está a apenas <strong>um passo</strong> de fazer parte da nossa comunidade de caronas colaborativas.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
            Para ativar sua conta e começar a usar o aplicativo, clique no botão abaixo:
          </p>
          
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
    `;
  }

  getFooterMessage() {
    return 'Se você não criou esta conta, ignore este e-mail.';
  }
}