FROM node:10-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "run", "start:docker"]
EXPOSE 30080
