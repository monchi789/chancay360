# Select the image to use
FROM node:current-alpine3.20

# Set the workdir
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install the dependencies
RUN pnpm install

# Copy the script for database connection
COPY wait_for_db.sh  /app/

# Make the script executable
RUN chmod +x /app/wait_for_db.sh

# Copy the rest of the files
COPY . .

# Expose the port
EXPOSE 3000

# Compile the typescript
RUN pnpm run build

# Start the server
CMD sh /app/wait_for_db.sh && pnpm run start