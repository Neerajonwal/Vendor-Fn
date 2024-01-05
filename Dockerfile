# Use an official Node.js runtime as a base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the entire project to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
