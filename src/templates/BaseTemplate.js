/**
 * Template base seguindo o padrão Template Method
 * Define a estrutura comum de todos os emails
 */
export class BaseTemplate {
  constructor() {
    if (new.target === BaseTemplate) {
      throw new Error('BaseTemplate é uma classe abstrata');
    }
  }

  /**
   * Template Method - define o esqueleto do algoritmo
   */
  render(data) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${this.getBackgroundColor()};">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: ${this.getBackgroundColor()}; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                  ${this.renderHeader(data)}
                  ${this.renderBody(data)}
                  ${this.renderFooter(data)}
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  /**
   * Métodos abstratos que devem ser implementados pelas subclasses
   */
  renderHeader(data) {
    throw new Error('Método renderHeader() deve ser implementado');
  }

  renderBody(data) {
    throw new Error('Método renderBody() deve ser implementado');
  }

  /**
   * Métodos com implementação padrão que podem ser sobrescritos
   */
  getBackgroundColor() {
    return '#F1F8E9';
  }

  renderFooter(data) {
    return `
      <tr>
        <td style="background-color: #F8F8F8; padding: 25px 30px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #999; font-size: 13px; margin: 0 0 10px 0;">
            ${this.getFooterMessage()}
          </p>
          <p style="color: #999; font-size: 12px; margin: 0;">
            &copy; ${new Date().getFullYear()} Carona Certa - Todos os direitos reservados
          </p>
        </td>
      </tr>
    `;
  }

  getFooterMessage() {
    return 'Se você não solicitou esta ação, ignore este e-mail.';
  }
}