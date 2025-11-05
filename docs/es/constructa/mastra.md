# Integración de Mastra AI

Este documento proporciona instrucciones completas de configuración y uso para la integración de Mastra AI en Constructa Starter.

## Descripción General

Constructa Starter incluye un asistente de IA consciente del repositorio impulsado por [Mastra](https://mastra.ai), un framework de agentes de IA que permite a los LLMs realizar acciones y acceder a herramientas externas. La integración presenta:

- **Agente de Base de Código**: Un asistente de código senior que puede acceder a archivos almacenados en tu bucket MinIO/S3
- **Integración de Herramientas**: Herramientas personalizadas para recuperar contenido de archivos desde almacenamiento de objetos
- **Interfaz de Chat**: Interfaz de chat moderna construida con componentes de [Assistant UI](https://assistant-ui.com)
- **Respuestas en Streaming**: Respuestas de IA en tiempo real con visualización de llamadas a herramientas

## Arquitectura

### Componentes

1. **Agente Mastra** (`src/mastra/agents/codebase-agent.ts`)
   - Impulsado por GPT-4.1-nano vía SDK de OpenAI
   - Configurado con instrucciones para asistencia consciente del repositorio
   - Integrado con herramientas personalizadas para acceso a archivos

2. **Herramienta de Acceso a Archivos** (`src/mastra/tools/get-file-from-object-store.tool.ts`)
   - Recupera contenido de texto UTF-8 desde buckets MinIO/S3
   - Límites de bytes configurables (por defecto: 500KB)
   - Maneja truncamiento de archivos y metadatos

3. **Capa de Almacenamiento** (`src/mastra/storage.ts`)
   - Se integra con infraestructura existente de S3/MinIO
   - Proporciona interfaz unificada para operaciones de archivos

4. **Endpoint API** (`src/routes/api/chat.tsx`)
   - Ruta del lado del servidor que maneja solicitudes de chat
   - Transmite respuestas de IA con llamadas a herramientas
   - Validación Zod para payloads de mensajes

5. **Interfaz de Chat** (`src/routes/dashboard/chat/`)
   - Interfaz de chat basada en React con autenticación
   - Muestra archivos disponibles desde almacenamiento de documentos
   - Transmisión de mensajes en tiempo real con visualización de llamadas a herramientas

## Prerequisitos

Antes de configurar Mastra, asegúrate de tener:

- ✅ **Clave API de OpenAI** - Requerida para funcionalidad LLM
- ✅ **Configuración de MinIO/S3** - Para acceso a almacenamiento de archivos
- ✅ **Autenticación** - El usuario debe haber iniciado sesión para acceder al chat
- ✅ **Carga de Documentos** - Los archivos deben ser subidos vía página de Documentos para acceso de IA

## Instrucciones de Configuración

### 1. Configuración de Entorno

Agrega tu clave API de OpenAI a tu archivo `.env`:

```bash
# Configuración de IA
OPENAI_API_KEY="sk-your-openai-api-key-here"
```

### 2. Verificar Dependencias

Los siguientes paquetes están incluidos automáticamente:

```json
{
  "@mastra/core": "0.17.1",
  "@ai-sdk/openai": "2.0.32",
  "@assistant-ui/react": "^0.11.15",
  "@assistant-ui/react-ai-sdk": "^1.1.0",
  "@assistant-ui/react-data-stream": "^0.11.0",
  "@assistant-ui/react-markdown": "^0.11.0",
  "@assistant-ui/styles": "^0.2.1"
}
```

### 3. Acceder a la Interfaz de Chat

1. Iniciar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

2. Navegar a `/dashboard/chat` en tu navegador

3. Iniciar sesión si se solicita

4. Subir documentos vía `/dashboard/documents` para que la IA los referencie

## Guía de Uso

### Interacción Básica de Chat

1. **Acceder al Chat**: Navegar a la sección "Chat" en la barra lateral
2. **Ver Archivos Disponibles**: La interfaz muestra archivos que has subido a tu bucket MinIO
3. **Hacer Preguntas**: Escribe preguntas sobre tu base de código o documentos subidos
4. **Referenciar Archivos**: Menciona rutas de archivos específicas (ej. `src/lib/api.ts`) para que la IA obtenga el contenido

### Herramienta de Acceso a Archivos

La IA puede recuperar automáticamente contenido de archivos cuando mencionas rutas de archivos. Por ejemplo:

- "¿Qué hay en `src/components/Button.tsx`?"
- "Muéstrame el esquema de base de datos en `src/db/schema.ts`"
- "Explica la lógica de autenticación en `src/server/auth.server.ts`"

### Visualización de Llamadas a Herramientas

Cuando la IA usa herramientas, verás:
- **Indicadores de llamadas a herramientas** en los mensajes de chat
- **Estado de recuperación de archivos** con metadatos (bytes, estado de truncamiento)
- **Resultados de herramientas estructurados** para mejor legibilidad

### Mejores Prácticas

#### Referencias a Archivos
- Usar rutas de archivos exactas de la sección "Archivos disponibles"
- Incluir la ruta completa (ej. `src/routes/api/chat.tsx`)
- La IA automáticamente obtendrá y analizará el contenido de los archivos

#### Tipos de Preguntas
- **Explicación de código**: "¿Qué hace esta función?"
- **Preguntas de arquitectura**: "¿Cómo está implementada la autenticación?"
- **Ayuda para depuración**: "¿Por qué no se está renderizando este componente?"
- **Documentación**: "Crea un README para esta característica"

#### Gestión de Contexto
- Subir archivos relevantes antes de hacer preguntas
- Referenciar múltiples archivos en una sola conversación
- La IA mantiene el contexto a través de la conversación

## Opciones de Configuración

### Configuración del Agente

El agente de base de código está configurado en `src/mastra/agents/codebase-agent.ts`:

```typescript
export const codebaseAgent = new Agent({
  name: 'codebase-agent',
  instructions: [
    'You are a senior code assistant for this repository.',
    'When a prompt references files or code, use the get-file-from-object-store tool to retrieve the exact content before answering.',
    'Always mention the object key(s) you consulted, adapt verbosity to user directions, and escalate with follow-up questions when file context is ambiguous.',
  ].join(' '),
  model: openai('gpt-4.1-nano'),
  tools: {
    getFileFromObjectStore,
  },
});
```

### Límites de Acceso a Archivos

Configurar límites de recuperación de archivos en `src/mastra/tools/get-file-from-object-store.tool.ts`:

```typescript
const DEFAULT_MAX_BYTES = 512_000; // límite por defecto de 500 KB
```

### Selección de Modelo

Cambiar el modelo de IA modificando la configuración del agente:

```typescript
model: openai('gpt-4'), // u otros modelos de OpenAI
```

## Solución de Problemas

### Problemas Comunes

#### "S3 bucket is not configured"
- Asegúrate de que tu configuración de MinIO/S3 sea correcta en `.env`
- Verifica que la variable de entorno `S3_BUCKET` esté establecida

#### "No files synced yet"
- Sube documentos vía la página de Documentos primero
- Los archivos deben estar almacenados en tu bucket MinIO/S3 configurado

#### "OpenAI API key missing"
- Agrega `OPENAI_API_KEY` a tu archivo `.env`
- Asegúrate de que la clave sea válida y tenga suficientes créditos

#### Chat no se carga
- Verifica la consola del navegador para errores
- Verifica el estado de autenticación
- Asegúrate de que todas las variables de entorno requeridas estén establecidas

### Modo de Depuración

Habilita registro detallado estableciendo:

```bash
DEBUG=mastra:*
```

### Consideraciones de Rendimiento

- **Límites de Tamaño de Archivo**: Los archivos grandes se truncan automáticamente para prevenir desbordamiento de tokens
- **Limitación de Tasa**: Los límites de tasa de la API de OpenAI se aplican a todas las solicitudes
- **Caché**: Considera implementar caché de respuestas para archivos frecuentemente accedidos

## Uso Avanzado

### Herramientas Personalizadas

Agregar nuevas herramientas creándolas en `src/mastra/tools/` y registrándolas en el agente:

```typescript
// Ejemplo de herramienta personalizada
export const customTool = createTool({
  id: 'custom-tool',
  description: 'Descripción de lo que hace esta herramienta',
  inputSchema: z.object({ /* validación de entrada */ }),
  execute: async ({ context }) => {
    // Implementación de la herramienta
  },
});
```

### Múltiples Agentes

Crea agentes adicionales en `src/mastra/agents/` y regístralos en `src/mastra/index.ts`.

### Backends de Almacenamiento Personalizados

Extiende la capa de almacenamiento para soportar fuentes de archivos adicionales más allá de MinIO/S3.

## Consideraciones de Seguridad

- **Gestión de Claves API**: Nunca confirmes claves API en control de versiones
- **Acceso a Archivos**: La IA solo puede acceder a archivos en tu bucket MinIO/S3 configurado
- **Autenticación de Usuario**: La interfaz de chat requiere autenticación de usuario
- **Limitación de Tasa**: Considera implementar limitación de tasa para endpoints API

## Contribuir

Al extender la integración de Mastra:

1. Seguir los patrones existentes en `src/mastra/`
2. Agregar tipos TypeScript apropiados
3. Incluir manejo de errores completo
4. Actualizar esta documentación
5. Probar con varios tipos y tamaños de archivos

## Recursos

- [Documentación de Mastra](https://mastra.ai/docs)
- [Documentación de Assistant UI](https://assistant-ui.com/docs)
- [Referencia de API de OpenAI](https://platform.openai.com/docs/api-reference)
- [Funciones del Servidor TanStack Start](https://tanstack.com/start/latest/docs/framework/server-functions)
