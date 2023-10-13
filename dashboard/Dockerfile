# Use an official Node.js image as your base image
FROM node:16-alpine

# Install Python and other build dependencies
RUN apk add --no-cache python3 make g++

# Install simple http server for serving static content
RUN npm install -g http-server

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the container
COPY . .

# Build the app for production with minification
RUN npm run build

# Expose the port your application will listen on
EXPOSE 8080

# Start your application
CMD ["http-server", "dist"]