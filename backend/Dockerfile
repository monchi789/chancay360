# Usa una imagen base de Node.js con Alpine
FROM node:current-alpine3.20

# Define el directorio de trabajo
WORKDIR /app

# Instala dependencias del sistema para compilar paquetes
RUN apk add --no-cache python3 make g++

# Instala pnpm y NestJS CLI de manera global
RUN npm install -g pnpm && \
    pnpm setup && \
    pnpm install -g @nestjs/cli

# Agrega pnpm al PATH
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Copia los archivos de dependencias antes del código fuente
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias sin modificar el lockfile
RUN pnpm install --frozen-lockfile

# Instala `@types/node` para evitar errores con `process.env`
RUN pnpm add -D @types/node

# Copia el script de espera de la base de datos
COPY wait_for_db.sh ./
RUN chmod +x ./wait_for_db.sh

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN pnpm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio
ENTRYPOINT ["sh", "./wait_for_db.sh"]
CMD ["pnpm", "run", "start"]
