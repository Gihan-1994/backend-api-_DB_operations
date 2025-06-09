# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies (including devDependencies for TypeScript compilation)
RUN yarn global add typescript && \
    yarn install --frozen-lockfile

# Copy source files
COPY . .

# Build app
RUN yarn run build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]