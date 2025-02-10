# Usa una imagen base de Node.js con Alpine
FROM node:current-alpine3.20

# Define el directorio de trabajo
WORKDIR /app

# Instala pnpm 
RUN npm install -g pnpm 

# Copia los archivos de dependencias antes del código fuente
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias sin modificar el lockfile
RUN pnpm install 

# Copia el script de espera de la base de datos
COPY wait_for_db.sh ./
RUN chmod +x ./wait_for_db.sh

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN pnpm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio produccion
CMD sh /app/wait_for_db.sh && pnpm run start:prod
