# Use Node.js Alpine as base image
FROM node:current-alpine3.20

# Set working directory
WORKDIR /app

# Set shell and environment variables for Alpine
ENV SHELL=/bin/sh
ENV ENV=/etc/profile

# Install pnpm and configure global directory
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Create profile file for shell configuration
RUN echo "export SHELL=/bin/sh" >> /etc/profile && \
    echo "export PNPM_HOME=/root/.local/share/pnpm" >> /etc/profile && \
    echo "export PATH=$PNPM_HOME:$PATH" >> /etc/profile

# Install pnpm and NestJS CLI
RUN npm install -g pnpm && \
    . /etc/profile && \
    pnpm setup && \
    pnpm install -g @nestjs/cli

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN . /etc/profile && pnpm install --frozen-lockfile

# Copy wait for database script
COPY wait_for_db.sh ./
RUN chmod +x ./wait_for_db.sh

# Copy source code
COPY . .

# Build application
RUN . /etc/profile && pnpm run build

# Expose port
EXPOSE 3000

# Start the application
CMD . /etc/profile && sh ./wait_for_db.sh && pnpm run start