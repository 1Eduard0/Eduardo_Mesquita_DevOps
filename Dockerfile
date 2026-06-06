FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV PUBLIC_DIR=dist

EXPOSE 3000

CMD ["node", "server.js"]
