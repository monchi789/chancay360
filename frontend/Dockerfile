# Usa una versión estable de Node.js con Alpine
FROM node:20-alpine

# Define el directorio de trabajo
WORKDIR /app

# Instala pnpm globalmente
RUN npm install -g pnpm

# Copia los archivos de dependencias antes del código fuente
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias sin modificar el lockfile
RUN pnpm install --frozen-lockfile

# Copia el código fuente después de instalar las dependencias
COPY . .

# Construye la aplicación Next.js
RUN pnpm build

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio en producción
CMD ["pnpm", "start"]
