# 1. Instalar dependencias solo cuando sea necesario
FROM node:18-alpine AS deps
# Registrar libc6-compat para compatibilidad con ciertas dependencias nativas en Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm ci

# 2. Reconstruir el código fuente solo cuando sea necesario
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desactivar la telemetría de Next.js durante la compilación
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# 3. Imagen de producción, copiar todos los archivos y ejecutar next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario y grupo de sistema sin privilegios
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Configurar el directorio de caché con los permisos correctos
RUN mkdir .next && chown nextjs:nodejs .next

# Copiar el build standalone y recursos estáticos con el propietario correcto
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambiar al usuario sin privilegios
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Ejecutar el servidor standalone de producción de Next.js
CMD ["node", "server.js"]
