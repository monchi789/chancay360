# Etapa 1: Construcción
FROM node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia solo los archivos esenciales para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instala todas las dependencias, incluidas las de desarrollo
RUN pnpm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación Next.js
RUN pnpm run build

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["pnpm", "run", "start"]
