# 1. Etapa de compilación (builder)
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Instalar dependencias necesarias para compilar en Go
RUN apk add --no-cache git gcc musl-dev

# Copiar configuración del módulo
COPY go.mod ./

# Copiar el código fuente
COPY . .

# Descargar y verificar dependencias
RUN go mod tidy

# Compilar un binario estático y optimizado (sin información de depuración -ldflags="-w -s")
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o main .

# 2. Etapa de ejecución (runtime)
FROM alpine:latest

# Instalar certificados CA para conexiones HTTPS seguras
RUN apk --no-cache add ca-certificates

# Crear un usuario y grupo de sistema sin privilegios de manera segura
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copiar el binario compilado desde la etapa anterior con los permisos adecuados
COPY --from=builder --chown=appuser:appgroup /app/main .

# Quitar permisos de escritura sobre el binario para mayor seguridad
RUN chmod 555 main

# Cambiar al usuario sin privilegios
USER appuser

# Exponer el puerto interno de la API
EXPOSE 8080

ENV GIN_MODE=release

# Ejecutar el binario
CMD ["./main"]
