# Usa una imagen base de Node.js con Alpine para mantener el tamaño reducido
FROM node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia solo los archivos esenciales para instalar dependencias
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias sin modificar el lockfile
RUN pnpm install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN pnpm run build

# Imagen final para producción
FROM node:20-alpine AS production

# Establece el directorio de trabajo
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia solo lo necesario desde la imagen de compilación
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando de inicio
CMD ["pnpm", "run", "start"]
