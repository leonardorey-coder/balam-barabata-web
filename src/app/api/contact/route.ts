import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  return NextResponse.json({ message: 'API Contact funcionando correctamente' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, interes, mensaje } = body;

    // Validación básica
    if (!nombre || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que tenemos la API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Servicio de email no configurado' },
        { status: 500 }
      );
    }

    // Instanciar Resend solo cuando se necesita (evita fallas en build)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Configurar el email
    const emailData = {
      from: 'contacto@balambarabata.page',
      to: ['contacto@balambarabata.page'],
      subject: `Nuevo contacto desde Balam Barabata - ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2a4d3f 0%, #b86420 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Balam Barabata</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Nuevo mensaje desde el sitio web</p>
          </div>
          
          <div style="background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; padding: 30px;">
            <h2 style="color: #2a4d3f; margin-top: 0; margin-bottom: 20px;">Información de contacto:</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151; width: 120px;">Nombre:</td>
                <td style="padding: 12px 0; color: #6b7280;">${nombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 12px 0; color: #6b7280;"><a href="mailto:${email}" style="color: #2a4d3f; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151;">Teléfono:</td>
                <td style="padding: 12px 0; color: #6b7280;">${telefono || 'No proporcionado'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 12px 0; font-weight: bold; color: #374151;">Interés:</td>
                <td style="padding: 12px 0; color: #6b7280;">${interes || 'No especificado'}</td>
              </tr>
            </table>
            
            ${mensaje ? `
              <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2a4d3f; margin: 20px 0;">
                <h3 style="margin-top: 0; margin-bottom: 15px; color: #2a4d3f;">Mensaje:</h3>
                <p style="white-space: pre-wrap; margin: 0; line-height: 1.6; color: #374151;">${mensaje}</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Este mensaje fue enviado desde el formulario de contacto de <strong>Balam Barabata</strong>
              </p>
              <p style="margin: 10px 0 0; color: #9ca3af; font-size: 12px;">
                Fecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Enviar el email
    const { data, error } = await resend.emails.send(emailData);
    
    if (error) {
      return NextResponse.json(
        { error: 'Error al enviar el email', details: error.message },
        { status: 500 }
      );
    }

    // Responder con éxito
    return NextResponse.json(
      { message: 'Mensaje enviado correctamente', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
}
