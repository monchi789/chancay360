# Usa una versión estable de Node.js con Alpine
FROM node:20-alpine

# Define el directorio de trabajo
WORKDIR /app

# Instala pnpm de forma global
RUN npm install -g pnpm 

# Copia los archivos de dependencias antes del código fuente
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias sin modificar el lockfile y asegurando ejecución de scripts
RUN pnpm install --no-frozen-lockfile --config.auto-install-peers=true --config.enable-scripts=true

# Copia el código fuente después de instalar las dependencias
COPY . .

# Da permisos de ejecución al script de espera de la base de datos
RUN chmod +x ./wait_for_db.sh

# Construye la aplicación y verifica que dist/ se genere correctamente
RUN pnpm run build && ls -l /app/dist

# Expone el puerto 8000
EXPOSE 8000

# Comando de inicio en producción
CMD sh /app/wait_for_db.sh && pnpm run start:prod
