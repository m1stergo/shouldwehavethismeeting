# Multi-stage Dockerfile for Vite (React + TS)
# 1) Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Build
COPY . .
RUN npm run build

# 2) Run stage (serve static files via nginx)
FROM nginx:1.27-alpine AS runner

# Copy nginx config for SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Healthcheck (simple)
HEALTHCHECK CMD wget -qO- http://127.0.0.1/ > /dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
