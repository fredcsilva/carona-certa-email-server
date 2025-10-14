import { BaseTemplate } from './BaseTemplate.js';

export class NotificacaoTemplate extends BaseTemplate {
  renderHeader(data) {
    return ''; // Notificações não têm header colorido
  }

  renderBody(data) {
    const { titulo, mensagem } = data;
    
    const mensagemFormatada = mensagem
      .split('\n')
      .map(linha => linha.trim())
      .filter(linha => linha.length > 0)
      .map(linha => `<p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">${linha}</p>`)
      .join('');
    
    return `
      <tr>
        <td style="padding: 40px 30px;">
          <h2 style="color: #333; margin: 0 0 20px 0;">📬 ${titulo}</h2>
          <div>
            ${mensagemFormatada}
          </div>
        </td>
      </tr>
    `;
  }

  getBackgroundColor() {
    return '#f4f4f4';
  }
}