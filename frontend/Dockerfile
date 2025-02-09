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

# Etapa 2: Producción
FROM node:20-alpine AS production

# Establece el directorio de trabajo
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia solo lo necesario desde la imagen de compilación
COPY --from=build /app/package.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Reinstalar solo dependencias de producción para asegurar que Next.js esté disponible
RUN pnpm install --prod

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["pnpm", "run", "start"]
