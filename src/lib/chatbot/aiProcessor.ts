import OpenAI from 'openai'
import { getRAGSystem } from './ragSystem'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export class AIProcessor {
  private openai: OpenAI
  private ragSystem: ReturnType<typeof getRAGSystem>

  constructor() {
    const token = process.env.GITHUB_TOKEN
    const endpoint = "https://models.github.ai/inference"
    
    this.openai = new OpenAI({
      baseURL: endpoint,
      apiKey: token
    })
    this.ragSystem = getRAGSystem()
  }

  /**
   * Procesa un mensaje del usuario y genera una respuesta
   */
  async processMessage(
    userMessage: string,
    history: ChatMessage[] = [],
    pageContext?: string
  ): Promise<{ response: string; links?: Array<{ text: string; url: string }> }> {
    try {
      // Obtener contexto relevante del sistema RAG (aprovechando capacidad extendida)
      const context = await this.ragSystem.getContext(userMessage)
      const relevantDocs = await this.ragSystem.searchDocuments(userMessage)
      const links = this.ragSystem.extractLinks(relevantDocs)

      // Construir el prompt del sistema
      const systemPrompt = this.buildSystemPrompt(context, pageContext)

      // Construir el historial de mensajes (aprovechando 1M tokens de contexto)
      const messages: ChatMessage[] = [
        { role: 'system', content: systemPrompt },
        ...history.slice(-20), // Aumentado a 20 mensajes para mejor contexto conversacional
        { role: 'user', content: userMessage }
      ]

      // Generar respuesta con GitHub Models (aprovechando 1M tokens de contexto)
      const completion = await this.openai.chat.completions.create({
        model: 'openai/gpt-4.1-mini',
        messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        temperature: 0.7,
        max_tokens: 2000, // Incrementado para respuestas más completas
        top_p: 1.0
      })

      const response = completion.choices[0]?.message?.content || 
        'Lo siento, no pude generar una respuesta en este momento.'

      // Extraer y limpiar enlaces del contenido de la respuesta
      const { cleanResponse, extractedLinks } = this.extractAndCleanLinks(response)

      // Procesar la respuesta para detectar intenciones de navegación
      const processedResponse = this.processNavigationIntent(cleanResponse, userMessage, links)

      // Combinar todos los enlaces
      const allLinks = [...extractedLinks, ...processedResponse.links, ...links]
      const uniqueLinks = this.deduplicateLinks(allLinks)

      return {
        response: processedResponse.response,
        links: uniqueLinks
      }
    } catch (error) {
      console.error('Error al procesar mensaje:', error)
      return {
        response: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        links: []
      }
    }
  }

  /**
   * Construye el prompt del sistema con el contexto relevante
   */
  private buildSystemPrompt(context: string, pageContext?: string): string {
    const basePrompt = `Eres Reich, un asistente virtual amigable y útil para el sitio web de Balam Barabata.
Tu propósito es ayudar a los usuarios a navegar por el sitio, responder preguntas sobre el proyecto y proporcionar información relevante.

IMPORTANTE: 
- Puedes proporcionar respuestas detalladas y completas aprovechando el contexto extenso disponible
- Si el usuario quiere navegar a una sección específica, proporciona el enlace correspondiente
- Usa un tono amigable y profesional
- Si no tienes información sobre algo, sé honesto al respecto y sugiere dónde pueden encontrar más información
- Cuando detectes intención de navegación (como "quiero ir a", "dónde está", "cómo llego a"), proporciona enlaces claros
- Si el usuario pregunta sobre contacto, siempre menciona las opciones disponibles con sus enlaces correspondientes
- Puedes usar todo el contexto conversacional para personalizar mejor tus respuestas
- Mantén consistencia con conversaciones anteriores del usuario para una experiencia más natural
- Tienes acceso al contenido de la página actual donde se encuentra el usuario, úsalo para dar respuestas más precisas y contextualizada

TEMAS DISPONIBLES EN TU BASE DE CONOCIMIENTO:
- Modelos de casas mayas (Ceiba, Chukum, Puuc, Jaguar, Selva Viva)
- Certificaciones ambientales y sustentabilidad (ADVC, NMX, NOM)
- Propuesta de valor del proyecto
- Comparativo de mercado vs competencia
- Arquitectura bioclimática y materiales regionales
- Biodiversidad y conservación
- Amenidades espirituales y wellness
- Economía circular y materiales sustentables
- Comunidad y estilo de vida
- Inversión y plusvalía
- Información general del proyecto
- Servicios y amenidades
- FAQ y preguntas frecuentes
- Contacto e información comercial

RUTAS DISPONIBLES EN EL SITIO:
- / (página principal)
- /amenidades (servicios y amenidades del proyecto)  
- /contacto (formulario y datos de contacto)
- /proyecto (información completa del proyecto)
- /etapas (etapas de desarrollo y precios)
- /etapas/primicia (detalles específicos de la Etapa 1 - La Primicia)
- /etapas/comunidad-sustentable (detalles específicos de la Etapa 2 - Comunidad Sustentable)
- /etapas/ciudadanos-eco-bio (detalles específicos de la Etapa 3 - Ciudadanos Eco-bio)
- /faq (preguntas frecuentes)
- /presentacion (presentación del proyecto)

IMPORTANTE SOBRE ENLACES:
- SIEMPRE usa enlaces relativos que inicien con "/" (ejemplo: /contacto, /faq)
- NUNCA uses dominios completos como balambarabata.com o URLs absolutas
- Los enlaces deben funcionar en cualquier entorno (localhost, production, etc.)

ENLACES ESPECÍFICOS DE ETAPAS:
- Para la Etapa 1 (La Primicia): usa /etapas/primicia
- Para la Etapa 2 (Comunidad Sustentable): usa /etapas/comunidad-sustentable
- Para la Etapa 3 (Ciudadanos Eco-bio): usa /etapas/ciudadanos-eco-bio
- Cuando menciones "Ver detalles de la Etapa X", usa siempre estos enlaces específicos`

    let finalPrompt = basePrompt

    // Agregar contexto de la página actual si está disponible
    if (pageContext) {
      finalPrompt += `

CONTEXTO DE LA PÁGINA ACTUAL:
${pageContext}

El usuario está viendo actualmente esta información en la página. Úsala para responder preguntas específicas sobre el contenido que está viendo.`
    }

    // Agregar contexto del knowledge base si está disponible
    if (context) {
      finalPrompt += `

CONTEXTO RELEVANTE DEL KNOWLEDGE BASE:
${context}`
    }

    if (context || pageContext) {
      finalPrompt += `

Usa toda esta información para responder de manera precisa, útil y personalizada. Puedes ser más detallado en tus explicaciones cuando sea apropiado.`
    }

    return finalPrompt
  }

  /**
   * Procesa la respuesta para detectar intenciones de navegación
   */
  private processNavigationIntent(
    response: string,
    userMessage: string,
    existingLinks: Array<{ text: string; url: string }>
  ): { response: string; links: Array<{ text: string; url: string }> } {
    const navigationKeywords = [
      'contacto', 'contactar', 'email', 'correo', 'mail',
      'inicio', 'home', 'principal',
      'servicios', 'amenidades', 'proyecto', 'etapas',
      'preguntas', 'frecuentes', 'faq', 'dudas', 'presentacion',
      'nosotros', 'about', 'acerca',
      // Etapas específicas
      'etapa1', 'etapa 1', 'primicia',
      'etapa2', 'etapa 2', 'comunidad sustentable',
      'etapa3', 'etapa 3', 'ciudadanos eco-bio', 'ciudadanos eco bio'
    ]

    const userMessageLower = userMessage.toLowerCase()
    const detectedIntents: string[] = []

    for (const keyword of navigationKeywords) {
      if (userMessageLower.includes(keyword)) {
        detectedIntents.push(keyword)
      }
    }

    // Mapeo de intenciones a enlaces
    const intentToLink: Record<string, { text: string; url: string }> = {
      'contacto': { text: 'Ir a la página de Contacto', url: '/contacto' },
      'contactar': { text: 'Ir a la página de Contacto', url: '/contacto' },
      'email': { text: 'Enviar un email', url: 'mailto:contacto@balambarabata.page' },
      'correo': { text: 'Enviar un correo', url: 'mailto:contacto@balambarabata.page' },
      'mail': { text: 'Enviar un mail', url: 'mailto:contacto@balambarabata.page' },
      'inicio': { text: 'Ir al Inicio', url: '/' },
      'home': { text: 'Ir al Inicio', url: '/' },
      'principal': { text: 'Ir a la página principal', url: '/' },
      'servicios': { text: 'Ver Amenidades', url: '/amenidades' },
      'amenidades': { text: 'Ver Amenidades', url: '/amenidades' },
      'proyecto': { text: 'Conocer el Proyecto', url: '/proyecto' },
      'etapas': { text: 'Ver Etapas', url: '/etapas' },
      'preguntas': { text: 'Preguntas Frecuentes', url: '/faq' },
      'frecuentes': { text: 'Preguntas Frecuentes', url: '/faq' },
      'faq': { text: 'Preguntas Frecuentes', url: '/faq' },
      'dudas': { text: 'Preguntas Frecuentes', url: '/faq' },
      'presentacion': { text: 'Ver Presentación', url: '/presentacion' },
      'nosotros': { text: 'Conoce más sobre el Proyecto', url: '/proyecto' },
      'about': { text: 'Conoce más sobre el Proyecto', url: '/proyecto' },
      'acerca': { text: 'Acerca del Proyecto', url: '/proyecto' },
      // Enlaces específicos de etapas
      'etapa1': { text: 'Ver detalles de la Etapa 1', url: '/etapas/primicia' },
      'etapa 1': { text: 'Ver detalles de la Etapa 1', url: '/etapas/primicia' },
      'primicia': { text: 'Ver detalles de la Etapa 1 - La Primicia', url: '/etapas/primicia' },
      'etapa2': { text: 'Ver detalles de la Etapa 2', url: '/etapas/comunidad-sustentable' },
      'etapa 2': { text: 'Ver detalles de la Etapa 2', url: '/etapas/comunidad-sustentable' },
      'comunidad sustentable': { text: 'Ver detalles de la Etapa 2 - Comunidad Sustentable', url: '/etapas/comunidad-sustentable' },
      'etapa3': { text: 'Ver detalles de la Etapa 3', url: '/etapas/ciudadanos-eco-bio' },
      'etapa 3': { text: 'Ver detalles de la Etapa 3', url: '/etapas/ciudadanos-eco-bio' },
      'ciudadanos eco-bio': { text: 'Ver detalles de la Etapa 3 - Ciudadanos Eco-bio', url: '/etapas/ciudadanos-eco-bio' },
      'ciudadanos eco bio': { text: 'Ver detalles de la Etapa 3 - Ciudadanos Eco-bio', url: '/etapas/ciudadanos-eco-bio' }
    }

    const newLinks: Array<{ text: string; url: string }> = []
    const seenUrls = new Set(existingLinks.map(link => link.url))

    for (const intent of detectedIntents) {
      const link = intentToLink[intent]
      if (link && !seenUrls.has(link.url)) {
        newLinks.push(link)
        seenUrls.add(link.url)
      }
    }

    // Mejorar la respuesta si se detectó intención de contacto
    let enhancedResponse = response
    if (detectedIntents.some(intent => ['contacto', 'contactar', 'email', 'correo', 'mail'].includes(intent))) {
      if (!response.toLowerCase().includes('contacto')) {
        enhancedResponse = `${response}\n\nPuedes contactarnos a través de la página de contacto o enviándonos un email directamente.`
      }
    }

    return {
      response: enhancedResponse,
      links: [...existingLinks, ...newLinks]
    }
  }

  /**
   * Extrae enlaces del contenido de la respuesta y los limpia del texto
   */
  private extractAndCleanLinks(response: string): { 
    cleanResponse: string; 
    extractedLinks: Array<{ text: string; url: string }> 
  } {
    const links: Array<{ text: string; url: string }> = []
    let cleanResponse = response

    // Buscar enlaces en formato [texto](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let match

    while ((match = markdownLinkRegex.exec(response)) !== null) {
      const [fullMatch, text, url] = match
      
      // Solo procesar enlaces relativos del sitio (que empiecen con /)
      if (url.startsWith('/')) {
        links.push({ text, url })
        
        // Remover el enlace del texto y dejar solo el texto plano
        cleanResponse = cleanResponse.replace(fullMatch, text)
      } else if (url.includes('balambarabata')) {
        // Convertir enlaces absolutos a relativos
        try {
          const urlObj = new URL(url)
          const relativePath = urlObj.pathname
          links.push({ text, url: relativePath })
          cleanResponse = cleanResponse.replace(fullMatch, text)
        } catch {
          // Si no se puede parsear la URL, ignorar el enlace
        }
      }
    }

    // Buscar enlaces en formato 👉 [texto](url) y limpiarlos
    const arrowLinkRegex = /👉\s*\[([^\]]+)\]\([^)]+\)/g
    cleanResponse = cleanResponse.replace(arrowLinkRegex, '')

    // Limpiar líneas vacías múltiples
    cleanResponse = cleanResponse.replace(/\n\s*\n\s*\n/g, '\n\n').trim()

    return { cleanResponse, extractedLinks: links }
  }

  /**
   * Elimina enlaces duplicados basándose en la URL
   */
  private deduplicateLinks(links: Array<{ text: string; url: string }>): Array<{ text: string; url: string }> {
    const seen = new Set<string>()
    return links.filter(link => {
      if (seen.has(link.url)) {
        return false
      }
      seen.add(link.url)
      return true
    })
  }
}

// Instancia singleton del procesador de IA
let aiProcessorInstance: AIProcessor | null = null

export function getAIProcessor(): AIProcessor {
  if (!aiProcessorInstance) {
    aiProcessorInstance = new AIProcessor()
  }
  return aiProcessorInstance
}

