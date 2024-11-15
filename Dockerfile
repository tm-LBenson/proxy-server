# Use the ARM-compatible Node.js base image for Raspberry Pi
FROM arm32v7/node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (default is 3000)
EXPOSE 4242

# Command to run the application
CMD ["node", "index.js"]
