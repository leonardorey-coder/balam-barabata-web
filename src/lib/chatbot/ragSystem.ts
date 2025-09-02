import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
// Interfaz simple para documentos sin dependencias externas
interface SimpleDocument {
  pageContent: string
  metadata: DocumentMetadata
}

interface DocumentMetadata {
  title: string
  category: string
  source: string
  link?: string
  linkText?: string
  [key: string]: string | undefined
}

interface ProcessedDocument {
  content: string
  metadata: DocumentMetadata
}

export class RAGSystem {
  private documents: SimpleDocument[] = []
  private knowledgeBasePath: string
  private isLoaded: boolean = false

  constructor() {
    this.knowledgeBasePath = path.join(process.cwd(), 'src', 'data', 'knowledge-base')
  }

  /**
   * Carga y procesa todos los documentos Markdown del directorio knowledge-base
   */
  async loadDocuments(): Promise<void> {
    if (this.isLoaded) {
      return
    }

    try {
      const files = this.getMarkdownFiles(this.knowledgeBasePath)
      const processedDocs: ProcessedDocument[] = []

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8')
        const { data, content: markdownContent } = matter(content)
        
        // Convertir Markdown a texto plano
        const htmlContent = marked(markdownContent)
        const textContent = this.htmlToText(htmlContent as string)

        processedDocs.push({
          content: textContent,
          metadata: {
            title: data.title || path.basename(file, '.md'),
            category: data.category || 'general',
            source: file,
            ...data
          }
        })
      }

      // Dividir documentos en chunks más pequeños usando implementación propia
      for (const doc of processedDocs) {
        const chunks = this.splitText(doc.content, 1500, 300)
        for (const chunk of chunks) {
          this.documents.push({
            pageContent: chunk,
            metadata: doc.metadata
          })
        }
      }

      this.isLoaded = true
      console.log(`✅ Cargados ${this.documents.length} fragmentos de ${files.length} documentos`)
    } catch (error) {
      console.error('Error al cargar documentos:', error)
      throw error
    }
  }

  /**
   * Busca documentos relevantes basándose en una consulta usando búsqueda textual
   */
  async searchDocuments(query: string, k: number = 5): Promise<SimpleDocument[]> {
    if (!this.isLoaded) {
      await this.loadDocuments()
    }

    const queryLower = query.toLowerCase()
    const queryTerms = queryLower.split(/\s+/).filter(term => term.length > 2)
    
    // Calcular puntuación de relevancia para cada documento
    const scoredDocs = this.documents.map(doc => {
      const content = doc.pageContent.toLowerCase()
      const metadata = doc.metadata as DocumentMetadata
      
      let score = 0
      
      // Puntuación por coincidencias exactas de términos
      for (const term of queryTerms) {
        const exactMatches = (content.match(new RegExp(term, 'g')) || []).length
        score += exactMatches * 2
        
        // Bonus por coincidencias en el título
        if (metadata.title?.toLowerCase().includes(term)) {
          score += 3
        }
        
        // Bonus por coincidencias en categoría
        if (metadata.category?.toLowerCase().includes(term)) {
          score += 2
        }
      }
      
      // Puntuación por coincidencias parciales y palabras relacionadas
      score += this.getSemanticScore(content, queryLower)
      
      return { doc, score }
    })
    
    // Filtrar documentos con puntuación > 0 y ordenar por relevancia
    return scoredDocs
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(item => item.doc)
  }

  /**
   * Calcula puntuación semántica basada en términos relacionados
   */
  private getSemanticScore(content: string, query: string): number {
    const semanticTerms: Record<string, string[]> = {
      'contacto': ['teléfono', 'email', 'correo', 'whatsapp', 'comunicación', 'llamar'],
      'precio': ['costo', 'inversión', 'pago', 'dinero', 'financiamiento', 'descuento', 'plusvalía', 'valor'],
      'amenidades': ['servicios', 'spa', 'cenote', 'temazcal', 'gimnasio', 'restaurante', 'wellness', 'bienestar'],
      'etapas': ['fases', 'desarrollo', 'construcción', 'fundadores', 'preventa', 'primicia', 'comunidad', 'ciudadanos'],
      'proyecto': ['desarrollo', 'balam', 'barabata', 'sustentable', 'ecológico', 'maya', 'selva'],
      'lotes': ['terrenos', 'propiedades', 'disponibilidad', 'selección', 'metros', 'superficie'],
      // Nuevos términos para los archivos agregados
      'casas': ['modelos', 'arquitectura', 'construcción', 'vivienda', 'hogar', 'ceiba', 'chukum', 'puuc', 'jaguar', 'selva viva'],
      'sustentabilidad': ['certificaciones', 'ecológico', 'ambiental', 'verde', 'advc', 'conservación', 'biodiversidad'],
      'wellness': ['bienestar', 'salud', 'spa', 'temazcal', 'meditación', 'espiritual', 'holístico', 'sanación'],
      'arquitectura': ['bioclimática', 'diseño', 'materiales', 'construcción', 'maya', 'puuc', 'regional'],
      'conservación': ['biodiversidad', 'flora', 'fauna', 'especies', 'nativas', 'protección', 'ecología'],
      'materiales': ['economía circular', 'reciclaje', 'regionales', 'sustentables', 'piedra', 'madera', 'chukum'],
      'inversión': ['plusvalía', 'patrimonio', 'valor', 'mercado', 'competencia', 'precio', 'rentabilidad'],
      'comunidad': ['vida', 'convivencia', 'vecinos', 'actividades', 'eventos', 'social', 'club'],
      'certificaciones': ['advc', 'nmx', 'nom', 'semarnat', 'conanp', 'ambiental', 'sustentable'],
      'comparativo': ['mercado', 'competencia', 'precios', 'ventajas', 'aldea zamá', 'selvazama', 'mayakoba'],
      'cortesía': ['modelos', 'casas', 'arquitectura', 'diseños', 'vivienda', 'opciones']
    }
    
    let score = 0
    
    for (const [mainTerm, relatedTerms] of Object.entries(semanticTerms)) {
      if (query.includes(mainTerm)) {
        for (const relatedTerm of relatedTerms) {
          if (content.includes(relatedTerm)) {
            score += 1
          }
        }
      }
    }
    
    return score
  }

  /**
   * Genera contexto para el prompt basándose en los documentos relevantes
   */
  async getContext(query: string): Promise<string> {
    const relevantDocs = await this.searchDocuments(query, 6) // Aumentado para más contexto
    
    if (relevantDocs.length === 0) {
      return ''
    }

    const context = relevantDocs.map((doc, index) => {
      const metadata = doc.metadata as DocumentMetadata
      return `[Documento ${index + 1} - ${metadata.title}]\n${doc.pageContent}`
    }).join('\n\n---\n\n')

    return context
  }

  /**
   * Extrae enlaces relevantes de los documentos encontrados
   */
  extractLinks(documents: SimpleDocument[]): Array<{ text: string; url: string }> {
    const links: Array<{ text: string; url: string }> = []
    const seenUrls = new Set<string>()

    for (const doc of documents) {
      const metadata = doc.metadata as DocumentMetadata
      
      // Extraer enlaces del metadata
      if (metadata.link && !seenUrls.has(metadata.link)) {
        links.push({
          text: metadata.linkText || metadata.title,
          url: metadata.link
        })
        seenUrls.add(metadata.link)
      }

      // Extraer enlaces del contenido (si hay)
      const urlRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      let match
      while ((match = urlRegex.exec(doc.pageContent)) !== null) {
        const [, text, url] = match
        if (!seenUrls.has(url)) {
          links.push({ text, url })
          seenUrls.add(url)
        }
      }
    }

    return links
  }

  /**
   * Divide texto en chunks con solapamiento
   */
  private splitText(text: string, chunkSize: number, chunkOverlap: number): string[] {
    if (text.length <= chunkSize) {
      return [text]
    }

    const chunks: string[] = []
    let start = 0

    while (start < text.length) {
      let end = start + chunkSize
      
      // Si no es el último chunk, buscar un punto de ruptura natural
      if (end < text.length) {
        // Buscar el último espacio, punto o salto de línea dentro del chunk
        const chunk = text.substring(start, end)
        const lastSpace = Math.max(
          chunk.lastIndexOf(' '),
          chunk.lastIndexOf('.'),
          chunk.lastIndexOf('\n'),
          chunk.lastIndexOf('\r')
        )
        
        if (lastSpace > chunkSize * 0.5) { // Solo si el punto de ruptura no está demasiado cerca del inicio
          end = start + lastSpace + 1
        }
      }

      chunks.push(text.substring(start, end).trim())
      
      // Calcular la nueva posición de inicio con solapamiento
      start = end - chunkOverlap
      if (start < 0) start = 0
      if (start >= text.length) break
    }

    return chunks.filter(chunk => chunk.length > 0)
  }

  /**
   * Obtiene todos los archivos Markdown de un directorio
   */
  private getMarkdownFiles(dir: string): string[] {
    const files: string[] = []
    
    if (!fs.existsSync(dir)) {
      console.warn(`El directorio ${dir} no existe`)
      return files
    }

    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        files.push(...this.getMarkdownFiles(fullPath))
      } else if (item.endsWith('.md')) {
        files.push(fullPath)
      }
    }

    return files
  }

  /**
   * Convierte HTML a texto plano
   */
  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // Eliminar tags HTML
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim()
  }
}

// Instancia singleton del sistema RAG
let ragSystemInstance: RAGSystem | null = null

export function getRAGSystem(): RAGSystem {
  if (!ragSystemInstance) {
    ragSystemInstance = new RAGSystem()
  }
  return ragSystemInstance
}

