# Stage 1: Build TypeScript code
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

# Stage 2: Create production image
FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/index.js" ]
