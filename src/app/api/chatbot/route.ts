import { NextRequest, NextResponse } from 'next/server'
import { getAIProcessor } from '@/lib/chatbot/aiProcessor'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, history = [], pageContext } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      )
    }

    // Verificar que el GitHub Token esté configurado
    if (!process.env.GITHUB_TOKEN) {
      console.error('GITHUB_TOKEN no está configurado')
      return NextResponse.json(
        { error: 'El servicio de chat no está configurado correctamente' },
        { status: 500 }
      )
    }

    // Procesar el mensaje con el sistema de IA
    const aiProcessor = getAIProcessor()
    const result = await aiProcessor.processMessage(message, history, pageContext)

    return NextResponse.json({
      response: result.response,
      links: result.links || []
    })
  } catch (error) {
    console.error('Error en el endpoint del chatbot:', error)
    
    // Manejo específico de errores de GitHub Models
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('token')) {
        return NextResponse.json(
          { error: 'Error de configuración del servicio' },
          { status: 500 }
        )
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Demasiadas solicitudes. Por favor, intenta más tarde.' },
          { status: 429 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Error al procesar el mensaje' },
      { status: 500 }
    )
  }
}

// Manejar otros métodos HTTP
export async function GET() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  )
}
