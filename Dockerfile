# Use Node.js official image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app source code
COPY . .

# Expose the port that the app listens on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
