'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  links?: Array<{
    text: string
    url: string
  }>
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! Soy Reich 👋 Tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Solo hacer scroll automático para mensajes del usuario, no para respuestas de Reich
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      // Solo hacer scroll automático si el último mensaje es del usuario
      if (lastMessage.role === 'user') {
        scrollToBottom()
      }
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Pequeño delay para evitar conflictos con animaciones
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Función para extraer el contenido de texto de la página actual
  const getPageContext = (): string => {
    try {
      // Obtener el contenido principal de la página, excluyendo el chatbot y elementos de navegación
      const mainContent = document.querySelector('main') || document.body
      
      // Clonar el contenido para no afectar el DOM original
      const clone = mainContent.cloneNode(true) as HTMLElement
      
      // Remover elementos que no queremos incluir en el contexto
      const elementsToRemove = [
        // Chatbot
        '[class*="chatbot"]', '[id*="chatbot"]',
        // Navigation
        'nav', 'header', 'footer',
        // Scripts y estilos
        'script', 'style', 'link',
        // Elementos ocultos
        '[style*="display: none"]', '[style*="visibility: hidden"]',
        // Otros elementos irrelevantes
        '.sr-only', '.visually-hidden', '[aria-hidden="true"]'
      ]
      
      elementsToRemove.forEach(selector => {
        clone.querySelectorAll(selector).forEach(el => el.remove())
      })
      
      // Obtener solo el texto, limpio de tags HTML
      let textContent = clone.textContent || clone.innerText || ''
      
      // Limpiar el texto: espacios múltiples, saltos de línea excesivos
      textContent = textContent
        .replace(/\s+/g, ' ')           // Espacios múltiples a uno
        .replace(/\n\s*\n/g, '\n')     // Saltos de línea múltiples
        .trim()                         // Eliminar espacios al inicio/fin
      
      // Limitar la longitud del contexto para evitar tokens excesivos
      const maxLength = 3000 // Aproximadamente 1000-1500 tokens
      if (textContent.length > maxLength) {
        textContent = textContent.substring(0, maxLength) + '...'
      }
      
      return textContent
    } catch (error) {
      console.warn('Error al extraer contexto de la página:', error)
      return ''
    }
  }

  // Detectar cambios en el viewport para manejar el teclado virtual
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Obtener el contexto de la página actual
      const pageContext = getPageContext()
      
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          history: messages,
          pageContext: pageContext
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        links: data.links
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Mensajes predeterminados que los usuarios pueden usar
  const quickActions = [
    "Explícame la página",
    "Llévame a Amenidades", 
    "Quiero saber de las etapas"
  ]

  const handleQuickAction = async (message: string) => {
    if (isLoading) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Obtener el contexto de la página actual
      const pageContext = getPageContext()
      
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          history: messages,
          pageContext: pageContext
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        links: data.links
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Botón flotante del chatbot */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-purple-500/25 transition-shadow"
            aria-label="Abrir chat con Reich"
          >
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200"
            style={{ 
              height: 'min(calc(var(--vh, 1vh) * 70), 500px)',
              maxHeight: 'calc(var(--vh, 1vh) * 85)'
            }}
          >
            {/* Header del chat */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 sm:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base sm:text-lg">Reich</h3>
                  <p className="text-white/80 text-xs">Tu asistente virtual</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-blue-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                    <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-2xl ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                    }`}>
                      {message.role === 'user' ? (
                        <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <div className="text-xs sm:text-sm prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                              strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                              em: ({children}) => <em className="italic">{children}</em>,
                              ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                              li: ({children}) => <li className="text-gray-800">{children}</li>,
                              a: ({href, children}) => (
                                <a 
                                  href={href} 
                                  className="text-purple-600 hover:text-purple-800 underline"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {children}
                                </a>
                              ),
                              h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                              h2: ({children}) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                              h3: ({children}) => <h3 className="text-sm font-semibold mb-1">{children}</h3>
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )}
                      {message.links && message.links.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                          {message.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              className="block text-xs sm:text-sm text-purple-600 hover:text-purple-800 underline font-medium"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              👉 {link.text}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-2xl shadow-sm border border-gray-100">
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin text-gray-500" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensaje */}
            <div className="p-2 sm:p-4 bg-white border-t border-gray-200">
              {/* Botones de acciones rápidas */}
              {messages.length <= 1 && (
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-2">Prueba preguntando:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        disabled={isLoading}
                        className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 hover:border-gray-300"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-full text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent touch-manipulation"
                  style={{ fontSize: '16px' }}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

