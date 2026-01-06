# Stage 1: Build the React app
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy .env file if it exists, otherwise it will be ignored
COPY .env* ./

# Set API URL for build
ARG VITE_BACKEND_API=/api/v1
ENV VITE_BACKEND_API=$VITE_BACKEND_API

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
