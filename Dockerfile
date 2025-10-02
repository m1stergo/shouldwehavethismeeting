# Dockerfile for Vite (React + TS) running on EasyPanel
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install dependencies including devDependencies (vite needed for build/preview)
COPY package.json ./
ENV NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
RUN npm install --include=dev --registry=https://registry.npmjs.org/

# Copy source and build
COPY . .
RUN npm run build

# Install a static server and serve on port 80 for EasyPanel
RUN npm install -g serve --registry=https://registry.npmjs.org/
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
