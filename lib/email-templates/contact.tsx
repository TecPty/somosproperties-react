// lib/email-templates/contact.tsx

export interface ContactEmailProps {
  name: string
  email: string
  phone: string
  consultationType?: string
  message: string
  propertyTitle?: string
  source?: string
}

export const contactEmailHTML = ({
  name,
  email,
  phone,
  consultationType,
  message,
  propertyTitle,
  source,
}: ContactEmailProps): string => {
  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />")

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background-color: #f9fafb; border-radius: 8px; overflow: hidden; }
        .header { background-color: #3898EC; padding: 32px 24px; text-align: center; }
        .header h1 { margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; }
        .content { padding: 32px 24px; }
        .content > p { margin: 0 0 24px 0; font-size: 14px; color: #555555; line-height: 1.6; }
        .card { background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 24px 0; }
        .card-item { margin-bottom: 16px; }
        .card-label { margin: 0 0 4px 0; font-size: 12px; font-weight: bold; color: #666666; text-transform: uppercase; }
        .card-value { margin: 0; font-size: 16px; color: #333333; font-weight: 500; }
        .card-value a { color: #3898EC; text-decoration: none; }
        .message-box { background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; font-size: 14px; color: #333333; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
        .cta { text-align: center; margin: 32px 0; }
        .cta a { display: inline-block; background-color: #3898EC; color: #ffffff; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; }
        .footer { border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px; font-size: 12px; color: #999999; text-align: center; }
        .footer p { margin: 0 0 8px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 Nuevo Contacto</h1>
        </div>
        <div class="content">
          <p>Hola,</p>
          <p>Has recibido un nuevo contacto a través de <strong>somosproperties.com</strong>. A continuación se muestran los detalles:</p>
          
          <div class="card">
            <div class="card-item">
              <p class="card-label">👤 Nombre</p>
              <p class="card-value">${name}</p>
            </div>
            
            <div class="card-item">
              <p class="card-label">✉️ Email</p>
              <p class="card-value"><a href="mailto:${email}">${email}</a></p>
            </div>
            
            <div class="card-item">
              <p class="card-label">📞 Teléfono</p>
              <p class="card-value"><a href="tel:${phone}">${phone}</a></p>
            </div>
            
            ${consultationType ? `
            <div class="card-item">
              <p class="card-label">📋 Tipo de Consulta</p>
              <p class="card-value">${consultationType}</p>
            </div>
            ` : ""}
            
            ${propertyTitle ? `
            <div class="card-item">
              <p class="card-label">🏠 Propiedad</p>
              <p class="card-value">${propertyTitle}</p>
            </div>
            ` : ""}
            
            ${source ? `
            <div class="card-item">
              <p class="card-label">🔗 Origen</p>
              <p class="card-value">${source}</p>
            </div>
            ` : ""}
          </div>
          
          <div>
            <p class="card-label">💬 Mensaje</p>
            <div class="message-box">${escapedMessage}</div>
          </div>
          
          <div class="cta">
            <a href="mailto:${email}?subject=Re: Tu contacto en SOMOS Properties">Responder a ${name}</a>
          </div>
          
          <div class="footer">
            <p>SOMOS Properties</p>
            <p>📧 info@somosproperties.com | 🌐 somosproperties.com | 📍 Panamá</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
