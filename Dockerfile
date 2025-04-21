# Use Node.js LTS version as the base image
FROM node:23-slim

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port your app runs on (you may need to adjust this)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]