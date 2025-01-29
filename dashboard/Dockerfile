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

# Stage 2: Serve the React application
FROM node:current-alpine3.20

# Install serve to serve the build directory
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist /app/dist

# Copy the wait_for_backend.sh script
COPY wait_for_backend.sh /app/

# Make the script executable
RUN chmod +x /app/wait_for_backend.sh

# Set the working directory
WORKDIR /app

# Expose the port the app runs on
EXPOSE 5173

# Serve the application after waiting for the backend
CMD sh /app/wait_for_backend.sh && serve -s dist -l 5173
