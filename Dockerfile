# Use the official Node.js 20 image
FROM node:20
# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the app files
COPY . ./
# Expose port 3000
EXPOSE 3000
# Command to run the app
CMD ["node", "index.js"]