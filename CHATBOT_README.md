# Chatbot Sari - Documentación

## 📖 Descripción

Sari es un chatbot flotante inteligente diseñado para ayudar a los usuarios a navegar por el sitio web de Balam Barabata y responder preguntas sobre el proyecto. Utiliza tecnología RAG (Retrieval-Augmented Generation) para proporcionar respuestas precisas basadas en documentación en formato Markdown.

## ✨ Características

- **Interfaz flotante redonda**: Ubicada en la esquina inferior izquierda de la ventana
- **Diseño atractivo**: Con gradientes morados y rosas, animaciones suaves
- **Sistema RAG**: Procesamiento inteligente de documentos Markdown
- **Navegación asistida**: Proporciona enlaces directos a las secciones relevantes
- **Respuestas contextuales**: Basadas en la documentación del proyecto
- **Historial de conversación**: Mantiene el contexto de la conversación

## 🚀 Configuración

### 1. Configurar OpenAI API Key

Copia el archivo de ejemplo de variables de entorno:

```bash
cp .env.chatbot.example .env.local
```

Edita `.env.local` y agrega tu API key de OpenAI:

```env
OPENAI_API_KEY=tu_api_key_aqui
```

Puedes obtener una API key en: https://platform.openai.com/api-keys

### 2. Instalar dependencias

Las dependencias ya deberían estar instaladas, pero si necesitas reinstalarlas:

```bash
npm install
```

### 3. Ejecutar el proyecto

```bash
npm run dev
```

El chatbot aparecerá automáticamente en todas las páginas del sitio.

## 📁 Estructura de archivos

```
src/
├── components/
│   └── chatbot/
│       └── ChatBot.tsx          # Componente principal del chatbot
├── lib/
│   └── chatbot/
│       ├── ragSystem.ts         # Sistema RAG para procesamiento de documentos
│       └── aiProcessor.ts       # Procesador de IA con OpenAI
├── app/
│   └── api/
│       └── chatbot/
│           └── route.ts         # API endpoint para el chatbot
└── data/
    └── knowledge-base/          # Documentos Markdown con información
        ├── general.md
        ├── contacto.md
        ├── servicios.md
        └── faq.md
```

## 📝 Agregar más documentación

Para agregar más información que Sari pueda utilizar:

1. Crea un nuevo archivo `.md` en `src/data/knowledge-base/`
2. Usa el siguiente formato:

```markdown
---
title: Título del Documento
category: categoria
link: /ruta-opcional
linkText: Texto del enlace opcional
---

# Contenido del documento

Tu contenido aquí...
```

3. El sistema procesará automáticamente el nuevo documento

## 🎨 Personalización

### Cambiar posición del botón

En `src/components/chatbot/ChatBot.tsx`, modifica las clases CSS del botón:

```tsx
// Para esquina inferior derecha:
className="fixed bottom-6 right-6 ..."

// Para esquina superior izquierda:
className="fixed top-6 left-6 ..."
```

### Cambiar colores

Modifica las clases de gradiente en el componente:

```tsx
// Actual (morado a rosa):
className="bg-gradient-to-r from-purple-600 to-pink-600"

// Ejemplo azul a verde:
className="bg-gradient-to-r from-blue-600 to-green-600"
```

### Cambiar el mensaje de bienvenida

En `src/components/chatbot/ChatBot.tsx`, modifica el mensaje inicial:

```tsx
const [messages, setMessages] = useState<Message[]>([
  {
    id: '1',
    content: 'Tu mensaje de bienvenida personalizado aquí',
    role: 'assistant',
    timestamp: new Date()
  }
])
```

## 🧪 Casos de uso de ejemplo

### Navegación

- Usuario: "Quiero ir al contacto"
- Sari: "Claro, para contactarnos puedes ir a la página de contacto. [Enlace a contacto]"

- Usuario: "¿Dónde puedo enviarles un email?"
- Sari: "Puedes enviarnos un email a info@balambarabata.com o usar el formulario en la página de contacto. [Enlaces]"

### Información general

- Usuario: "¿Qué servicios ofrecen?"
- Sari: "Ofrecemos desarrollo web, aplicaciones móviles, consultoría tecnológica... [Enlace a servicios]"

- Usuario: "¿Cuánto cuesta un sitio web?"
- Sari: "Los precios varían según el proyecto. Tenemos planes desde $10,000 MXN... [Enlace a contacto para cotización]"

## 🔧 Solución de problemas

### El chatbot no aparece

1. Verifica que el componente esté importado en `src/app/layout.tsx`
2. Revisa la consola del navegador para errores
3. Asegúrate de que las dependencias estén instaladas

### Error de API Key

1. Verifica que la variable `OPENAI_API_KEY` esté en `.env.local`
2. Reinicia el servidor de desarrollo después de agregar la API key
3. Verifica que la API key sea válida en OpenAI

### Las respuestas no son relevantes

1. Asegúrate de que los documentos en `knowledge-base/` contengan la información necesaria
2. Revisa que los documentos tengan el formato correcto con frontmatter
3. Verifica que el sistema esté cargando los documentos (revisa los logs de la consola)

## 📞 Soporte

Si tienes problemas o preguntas sobre el chatbot, puedes:

1. Revisar esta documentación
2. Verificar los logs en la consola del navegador y del servidor
3. Contactar al equipo de desarrollo

## 🚀 Mejoras futuras

- [ ] Soporte multiidioma
- [ ] Análisis de sentimiento
- [ ] Métricas y analytics de uso
- [ ] Integración con CRM
- [ ] Modo oscuro
- [ ] Exportar conversaciones
- [ ] Comandos de voz
