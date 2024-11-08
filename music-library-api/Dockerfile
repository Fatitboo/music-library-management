# Use Node 18 image
FROM node:18-alpine

# Create and set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Run the application
CMD ["npm", "run", "start:dev"]
