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

# Expose the port that Vite preview will listen on
EXPOSE 3000

# Start the preview server binding to 0.0.0.0 so it's reachable from outside the container
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
