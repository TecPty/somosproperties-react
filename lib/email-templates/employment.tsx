export interface EmploymentEmailProps {
  name: string
  email: string
  phone: string
  education: string
  cvName?: string
  cvSize?: number
}

export const employmentEmailHTML = ({
  name,
  email,
  phone,
  education,
  cvName,
  cvSize,
}: EmploymentEmailProps): string => {
  const cvSizeKB = cvSize ? Math.round(cvSize / 1024) : 0

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #0066cc 0%, #003d99 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
      .header h1 { margin: 0; font-size: 24px; }
      .content { padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
      .field { margin-bottom: 20px; }
      .label { font-weight: bold; color: #0066cc; }
      .value { margin-top: 5px; color: #555; }
      .divider { border-top: 1px solid #ddd; margin: 20px 0; }
      .cta { margin-top: 30px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #0066cc; }
      .cta p { margin: 0; font-size: 14px; color: #666; }
      .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; border-top: 1px solid #ddd; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📋 Nueva Solicitud de Empleo</h1>
      </div>
      <div class="content">
        <div class="field">
          <div class="label">👤 Nombre</div>
          <div class="value">${name}</div>
        </div>
        
        <div class="field">
          <div class="label">📧 Email</div>
          <div class="value"><a href="mailto:${email}">${email}</a></div>
        </div>
        
        <div class="field">
          <div class="label">📞 Teléfono</div>
          <div class="value"><a href="tel:${phone}">${phone}</a></div>
        </div>
        
        <div class="field">
          <div class="label">🎓 Educación</div>
          <div class="value">${education}</div>
        </div>
        
        ${
          cvName
            ? `
        <div class="field">
          <div class="label">📄 Documento Adjunto</div>
          <div class="value">${cvName} (${cvSizeKB} KB)</div>
        </div>
        `
            : `
        <div class="field">
          <div class="label">📄 Documento</div>
          <div class="value" style="color: #999;">No adjunto</div>
        </div>
        `
        }
        
        <div class="divider"></div>
        
        <div class="cta">
          <p><strong>⏱️ Próximos pasos:</strong> El equipo de recursos humanos revisará esta solicitud y se contactará pronto con el candidato.</p>
        </div>
      </div>
      
      <div class="footer">
        <p>Solicitud enviada desde SOMOS Properties - Portal de Empleo</p>
        <p>Esta es una notificación automática, no responda a este email</p>
      </div>
    </div>
  </body>
</html>
  `.trim()
}
