# Stage 1: Build the React application
FROM node:current-alpine3.20 AS build

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install the dependencies
RUN pnpm install

# Copy the rest of the files
COPY . .

# Build the application
RUN pnpm run build

# Verificar la existencia de la carpeta 'dist' después del build
RUN ls -l /app/dist

# Stage 2: Serve the React application using Nginx
FROM nginx:alpine

# Copy the built React application from the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Verify the contents of the 'html' folder
RUN ls -l /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 5173
