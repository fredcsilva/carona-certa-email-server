import { BaseTemplate } from './BaseTemplate.js';

export class RecuperacaoSenhaTemplate extends BaseTemplate {
  renderHeader(data) {
    return `
      <tr>
        <td style="background-color: #ff6b6b; padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔒 Recuperação de Senha</h1>
        </td>
      </tr>
    `;
  }

  renderBody(data) {
    const { name, code } = data;
    
    return `
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
    `;
  }
}