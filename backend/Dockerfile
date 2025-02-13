FROM node:20-slim

# Define el directorio de trabajo
WORKDIR /app

# Instala pnpm de forma global
RUN npm install -g pnpm

# Copia los archivos de dependencias para aprovechar la caché
COPY package.json pnpm-lock.yaml ./

# Instala todas las dependencias (incluyendo devDependencies, necesarias para el build)
RUN pnpm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN pnpm run build

# (Opcional) Lista el contenido de la carpeta dist para depurar
RUN ls -la /app/dist

# Expone el puerto (ajusta si es necesario)
EXPOSE 8000

# Comando de inicio en producción (invoca directamente el archivo correcto)
CMD ["node", "dist/main.js"]
